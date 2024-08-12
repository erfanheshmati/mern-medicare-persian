import User from "../models/userModel.js";
import Doctor from "../models/doctorModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import ResetPasswordToken from "../models/resetPasswordTokenModel.js";
import { generateRandomByte } from "../utils/helper.js";
import { generateMailTransporter } from "../utils/mail.js";

export const register = async (req, res) => {
  const { name, email, password, role, gender, photo } = req.body;
  try {
    let user = null;
    if (role === "patient") user = await User.findOne({ email });
    if (role === "doctor") user = await Doctor.findOne({ email });
    if (user)
      return res.status(400).json({ message: "قبلا ثبت نام کرده اید." });
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    if (role === "patient") {
      user = new User({
        name,
        email,
        password: hashedPassword,
        role,
        gender,
        photo,
      });
    }
    if (role === "doctor") {
      user = new Doctor({
        name,
        email,
        password: hashedPassword,
        role,
        gender,
        photo,
      });
    }
    await user.save();
    res
      .status(200)
      .json({ success: true, message: "حساب شما با موفقیت ایجاد شد." });
  } catch (error) {
    console.error("Register error:", error); // Log the error for debugging purposes
    res
      .status(500)
      .json({ success: false, message: "خطای سرور! دوباره تلاش کنید." });
  }
};

export const login = async (req, res) => {
  const { email, rememberMe } = req.body;
  try {
    let user =
      (await User.findOne({ email })) || (await Doctor.findOne({ email }));
    // Authenticate user
    if (!user) return res.status(404).json({ message: "کاربر یافت نشد." });
    // Compare password
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ status: false, message: "رمز عبور اشتباه است." });
    }
    // Create token
    const payload = { id: user._id, role: user.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: rememberMe ? "7d" : "1h",
    });
    // Remember me
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: rememberMe ? 7 * 24 * 60 * 60 * 1000 : 60 * 60 * 1000,
    });
    const { password, role, appointments, ...rest } = user._doc;
    res.status(200).json({
      status: true,
      message: "وارد شده اید.",
      token,
      data: { ...rest },
      role,
    });
  } catch (error) {
    console.error("Login error:", error); // Log the error for debugging purposes
    res
      .status(500)
      .json({ status: false, message: "خطای سرور! دوباره تلاش کنید." });
  }
};

export const forgetPassword = async (req, res) => {
  const { email } = req.body;
  try {
    let user =
      (await User.findOne({ email })) || (await Doctor.findOne({ email }));
    // Authenticate user
    if (!user)
      return res.status(404).json({
        status: false,
        message: "کاربر با این ایمیل وجود ندارد.",
      });
    // Check token
    const alreadyHasToken = await ResetPasswordToken.findOne({
      owner: user._id,
    });
    if (alreadyHasToken)
      return res.status(401).json({
        status: false,
        message: "بعد از دو دقیقه می توانید درخواست مجدد دهید.",
      });
    // Generate random token
    const token = generateRandomByte();
    // Hash token
    const hashedToken = bcrypt.hashSync(token, 10);
    // Create new reset password token
    const newResetPasswordToken = new ResetPasswordToken({
      owner: user._id,
      token: hashedToken,
    });
    await newResetPasswordToken.save();
    // Reset password url
    const resetPasswordURL = `${process.env.CLIENT_URL}/reset-password?token=${token}&id=${user._id}`;
    // Email transporter config
    const transport = generateMailTransporter();
    // Send email to user
    transport.sendMail({
      from: "security@medicare.com",
      to: user.email,
      subject: "تغییر رمز عبور",
      html: `
       <h2>سلام ${user.name}</h2>
       <h3>:برای تغییر رمز عبور خود روی لینک زیر کلیک کنید</h3>
       <a href="${resetPasswordURL}">لینک تغییر رمز عبور</a>
       `,
    });
    res.status(200).json({ message: "لینک به ایمیل شما ارسال شد." });
  } catch (error) {
    res.status(500).json({ message: "خطای سرور! دوباره تلاش کنید." });
  }
};

// export const sendResetPasswordTokenStatus = (req, res) => {
//   res.json({ valid: true });
// };

export const resetPassword = async (req, res) => {
  const { newPassword } = req.body;
  const userId = req.params.id;
  try {
    let user = (await User.findById(userId)) || (await Doctor.findById(userId));
    // Compare new password with old password
    const isMatched = bcrypt.compareSync(newPassword, user.password);
    if (isMatched)
      return res
        .status(401)
        .json({ message: "رمز عبور جدید باید با قبلی متفاوت باشد." });
    // Hash new password and save it in the database
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    // Clear password token
    await ResetPasswordToken.findByIdAndDelete(req.resetPasswordToken._id);
    // Generate email transporter
    const transport = generateMailTransporter();
    // Send email to user
    transport.sendMail({
      from: "security@medicare.com",
      to: user.email,
      subject: "تغییر رمز عبور",
      html: `
         <h2>سلام ${user.name}</h2>
         <h3>رمز عبور شما تغییر کرد</h3>
         `,
    });
    res.status(200).json({ message: "رمز عبور شما تغییر کرد." });
  } catch (error) {
    res.status(500).json({ message: "خطای سرور! دوباره تلاش کنید." });
  }
};
