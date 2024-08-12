import mongoose from "mongoose";

const resetPasswordTokenSchema = mongoose.Schema({
  owner: {
    type: mongoose.Types.ObjectId,
    ref: "User" || "Doctor",
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 120,
  },
});

export default mongoose.model("ResetPasswordToken", resetPasswordTokenSchema);
