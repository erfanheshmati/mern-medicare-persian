import User from "../models/userModel.js";
import Booking from "../models/bookingModel.js";
import Doctor from "../models/doctorModel.js";
import bcrypt from "bcryptjs";

export const updateUser = async (req, res) => {
  const id = req.params.id;
  try {
    const updateedUser = await User.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "اطلاعات شما به روزرسانی شد.",
      data: updateedUser,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "خطای سرور! دوباره تلاش کنید." });
  }
};

export const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    await User.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "حساب شما از سیستم حذف شد.",
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "خطای سرور! دوباره تلاش کنید." });
  }
};

export const getSingleUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id).select("-password");
    res.status(200).json({
      success: true,
      message: "در حال دریافت اطلاعات",
      data: user,
    });
  } catch (error) {
    res.status(404).json({ success: false, message: "اطلاعات یافت نشد." });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select("-password");
    res.status(200).json({
      success: true,
      message: "در حال دریافت اطلاعات",
      data: users,
    });
  } catch (error) {
    res.status(404).json({ success: false, message: "اطلاعات یافت نشد." });
  }
};

export const getUserProfile = async (req, res) => {
  const userId = req.userId;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "اطلاعات یافت نشد." });
    }
    const { password, ...rest } = user._doc;
    res.status(200).json({
      success: true,
      message: "در حال دریافت اطلاعات",
      data: { ...rest },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "خطای سرور! دوباره تلاش کنید.",
    });
  }
};

export const getUserAppointments = async (req, res) => {
  try {
    /* step 1: retrieve appointments from booking for specific user */
    const bookings = await Booking.find({ user: req.userId });
    /* step 2: extract doctor ids from appointment bookings */
    const doctorIds = bookings.map((el) => el.doctor.id);
    /* step 3: retrieve doctors by doctor ids */
    const doctors = await Doctor.find({ _id: { $in: doctorIds } }).select(
      "-password"
    );
    res.status(200).json({
      success: true,
      message: "در حال دریافت اطلاعات",
      data: doctors,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "خطای سرور! دوباره تلاش کنید.",
    });
  }
};

export const changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const id = req.params.id;
  try {
    const user = await User.findById(id);
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "رمز عبور فعلی اشتباه است!" });
    }
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    res.status(200).json({ message: "رمز عبور شما تغییر کرد." });
  } catch (error) {
    res.status(500).json({ message: "خطای سرور! دوباره تلاش کنید." });
  }
};
