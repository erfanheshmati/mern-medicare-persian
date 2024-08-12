import Doctor from "../models/doctorModel.js";
import Booking from "../models/bookingModel.js";
import bcrypt from "bcryptjs";

export const updateDoctor = async (req, res) => {
  const id = req.params.id;
  try {
    const updateedDoctor = await Doctor.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "اطلاعات با موفقیت تغییر کرد.",
      data: updateedDoctor,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "خطای سرور! دوباره تلاش کنید." });
  }
};

export const deleteDoctor = async (req, res) => {
  const id = req.params.id;
  try {
    await Doctor.findByIdAndDelete(id);
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

export const getSingleDoctor = async (req, res) => {
  const id = req.params.id;
  try {
    const doctor = await Doctor.findById(id)
      .populate("reviews")
      .select("-password");
    res.status(200).json({
      success: true,
      message: "در حال دریافت اطلاعات",
      data: doctor,
    });
  } catch (error) {
    res.status(404).json({ success: false, message: "اطلاعات یافت نشد." });
  }
};

export const getAllDoctors = async (req, res) => {
  try {
    // Get filtered doctors (based on search params)
    const { query } = req.query;
    let doctors;
    if (query) {
      doctors = await Doctor.find({
        isApproved: "approved",
        $or: [
          { name: { $regex: query, $options: "i" } },
          { specialization: { $regex: query, $options: "i" } },
        ],
      }).select("-password");
    } else {
      doctors = await Doctor.find({ isApproved: "approved" }).select(
        "-password"
      );
    }
    res.status(200).json({
      success: true,
      message: "در حال دریافت اطلاعات",
      data: doctors,
    });
  } catch (error) {
    res.status(404).json({ success: false, message: "اطلاعات یافت نشد." });
  }
};

export const getDoctorProfile = async (req, res) => {
  const doctorId = req.userId;
  try {
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res
        .status(404)
        .json({ success: false, message: "اطلاعات یافت نشد." });
    }
    const { password, ...rest } = doctor._doc;
    const appointments = await Booking.find({ doctor: doctorId });
    res.status(200).json({
      success: true,
      message: "در حال دریافت اطلاعات",
      data: { ...rest, appointments },
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
    const doctor = await Doctor.findById(id);
    const isMatch = await bcrypt.compare(oldPassword, doctor.password);
    if (!isMatch) {
      return res.status(400).json({ message: "رمز عبور فعلی اشتباه است!" });
    }
    doctor.password = await bcrypt.hash(newPassword, 10);
    await doctor.save();
    res.status(200).json({ message: "رمز عبور شما تغییر کرد." });
  } catch (error) {
    res.status(500).json({ message: "خطای سرور! دوباره تلاش کنید." });
  }
};
