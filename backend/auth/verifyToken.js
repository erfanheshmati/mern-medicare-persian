import jwt from "jsonwebtoken";
import Doctor from "../models/doctorModel.js";
import User from "../models/userModel.js";
import ResetPasswordToken from "../models/resetPasswordTokenModel.js";
import { isValidObjectId } from "mongoose";
import bcrypt from "bcryptjs";

export const authenticate = async (req, res, next) => {
  // Get token from headers
  const authToken = req.headers.authorization;
  // Check token
  if (!authToken || !authToken.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "ابتدا وارد شوید",
    });
  }
  try {
    const token = authToken.split(" ")[1];
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    // Attach user information to request object
    req.userId = decoded.id;
    req.role = decoded.role;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ success: false, message: "توکن منقضی شده است! دوباره وارد شوید." });
    }
    return res.status(401).json({ success: false, message: "ابتدا وارد شوید" });
  }
};

export const restrict = (roles) => async (req, res, next) => {
  try {
    // Access user information from the request object set by authenticate middleware
    const userId = req.userId;
    let user = (await User.findById(userId)) || (await Doctor.findById(userId));
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "کاربر یافت نشد" });
    }
    if (!roles.includes(user.role)) {
      return res.status(403).json({
        success: false,
        message: "شما اجازه دسترسی ندارید",
      });
    }
    next();
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "خطای سرور! دوباره تلاش کنید" });
  }
};

export const isValidResetPasswordToken = async (req, res, next) => {
  const userId = req.params.id;
  const token = req.headers.authorization;
  try {
    // Check token & user
    if (!token || !isValidObjectId(userId))
      return res
        .status(401)
        .json({ message: "درخواست نامعتبر! لینک جدید دریافت کنید" });
    // Check reset password token
    const resetPasswordToken = await ResetPasswordToken.findOne({
      owner: userId,
    });
    if (!resetPasswordToken)
      return res.status(401).json({ message: "دسترسی غیرمجاز" });
    // Verify access token
    const isMatched = await bcrypt.compare(token, resetPasswordToken.token);
    if (!isMatched) return res.status(401).json({ message: "ابتدا وارد شوید" });
    req.resetPasswordToken = resetPasswordToken;
    next();
  } catch (error) {
    res.status(500).json({ message: "خطای سرور! دوباره تلاش کنید" });
  }
};
