import express from "express";
import {
  register,
  login,
  forgetPassword,
  resetPassword,
} from "../controllers/authController.js";
import { isValidResetPasswordToken } from "../auth/verifyToken.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/forget-password", forgetPassword);
router.post("/reset-password/:id", isValidResetPasswordToken, resetPassword);

export default router;
