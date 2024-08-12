import express from "express";
import { authenticate } from "../auth/verifyToken.js";
import {
  checkoutRequest,
  checkoutVerify,
} from "../controllers/bookingController.js";

const router = express.Router();

router.post(
  "/checkout-request/:doctorId/:userId",
  authenticate,
  checkoutRequest
);
router.post("/checkout-verify", authenticate, checkoutVerify);

export default router;
