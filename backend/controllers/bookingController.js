import User from "../models/userModel.js";
import Doctor from "../models/doctorModel.js";
import Booking from "../models/bookingModel.js";
import ZarinpalCheckout from "zarinpal-checkout";

// export const getCheckoutSession = async (req, res) => {
//   const { timeSlotIndex } = req.body;
//   try {
//     // Get currently booked doctor
//     const doctor = await Doctor.findById(req.params.doctorId);
//     const user = await User.findById(req.params.userId);
//     // Access the selected time slot by index
//     const selectedTimeSlot = doctor.timeSlots[timeSlotIndex];
//     if (!selectedTimeSlot)
//       return res
//         .status(404)
//         .json({ message: "زمان خالی برای نوبت دهی وجود ندارد." });
//     // Prepare payment request data
//     const requestData = {
//       merchant_id: process.env.ZARINPAL_MERCHANT_ID,
//       amount: doctor.ticketPrice * 10000, // Currency (Rials)
//       description: `بابت هزینه ویزیت دکتر ${doctor.name}`,
//       callback_url: `${process.env.CLIENT_URL}/checkout-success`,
//     };
//     // Send request to Zarinpal API
//     const response = await fetch(process.env.ZARINPAL_API_URL, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(requestData),
//     });
//     const data = await response.json();
//     if (data.code === 100) {
//       // Create new booking
//       const booking = new Booking({
//         doctor: doctor._id,
//         user: user._id,
//         ticketPrice: doctor.ticketPrice,
//         timeSlot: selectedTimeSlot,
//         session: data.authority, // Store Zarinpal authority ID for verification
//       });
//       await booking.save();
//       // Redirect to Zarinpal payment page
//       res
//         .redirect(`https://sandbox.zarinpal.com/pg/StartPay/${data.authority}`)
//         .catch((err) => res.json({ message: err }));
//     } else {
//       res.status(500).json({ message: "تراکنش ناموفق!" });
//     }
//   } catch (error) {
//     res.status(500).json({ message: "خطای سرور! دوباره تلاش کنید." });
//   }
// };

const zarinpal = ZarinpalCheckout.create(
  "3363943e-73a6-11e9-87da-000c29344814",
  true // Sandbox mode
);

export const checkoutRequest = async (req, res) => {
  const { timeSlotIndex } = req.body;
  // Get currently booked doctor
  const doctor = await Doctor.findById(req.params.doctorId);
  const user = await User.findById(req.params.userId);
  if (!doctor || !user) {
    return res.status(404).json({ message: "کاربر یافت نشد." });
  }
  // Access the selected time slot by index
  const selectedTimeSlot = doctor.timeSlots[timeSlotIndex];
  if (!selectedTimeSlot)
    return res
      .status(404)
      .json({ message: "زمان خالی برای نوبت دهی وجود ندارد." });
  // Prepare selectedTimeSlot for CallbackURL
  const encodedTimeSlot = encodeURIComponent(JSON.stringify(selectedTimeSlot));
  // Prepare payment request data
  const requestData = {
    Amount: doctor.ticketPrice * 1000, // Currency (Tomans)
    Description: `ویزیت دکتر ${doctor.name}`,
    CallbackURL: `${process.env.CLIENT_URL}/checkout-verify?DoctorId=${doctor._id}&UserId=${user._id}&Amount=${doctor.ticketPrice}&Appointment=${encodedTimeSlot}`,
    Email: user.email,
  };
  // Send request to Zarinpal API
  zarinpal
    .PaymentRequest(requestData)
    .then(async (response) => {
      if (response.status === 100) {
        res.status(200).json({ url: response.url });
      }
    })
    .catch((error) =>
      res.status(500).json({ message: "درخواست نامعتبر!", error: error })
    );
};

export const checkoutVerify = async (req, res) => {
  const { doctorId, userId, amount, appointment, authority, status } = req.body;
  try {
    if (status == "OK") {
      // Create new booking
      const booking = new Booking({
        doctor: doctorId,
        user: userId,
        amount,
        appointment,
        authority,
        isPaid: true,
        refId: response.RefID,
      });
      await booking.save();
    }
  } catch (error) {
    res.status(500).json({ message: "درخواست نامعتبر!", error: error });
  }
};
