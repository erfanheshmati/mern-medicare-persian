import mongoose from "mongoose";

// const appointmentSchema = new mongoose.Schema({
//   day: { type: "String" },
//   startingTime: { type: "String" },
//   endingTime: { type: "String" },
// });

const bookingSchema = new mongoose.Schema(
  {
    doctor: { type: mongoose.Types.ObjectId, ref: "Doctor", required: true },
    user: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    amount: { type: Number, required: true },
    authority: { type: String, required: true },
    appointment: { type: Array },
    status: {
      type: String,
      enum: ["pending", "approved", "cancelled"],
      default: "pending",
    },
    isPaid: { type: Boolean },
    refId: { type: Number },
  },
  { timestamps: true }
);

bookingSchema.pre(/^find/, function (next) {
  this.populate("user").populate({
    path: "doctor",
    select: "name",
  });
  next();
});

export default mongoose.model("Booking", bookingSchema);
