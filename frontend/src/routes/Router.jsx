import { Routes, Route } from "react-router-dom"
import Home from "../pages/Home"
import Services from "../components/services/Services"
import Login from "../pages/Login"
import Signup from "../pages/Signup"
import Contact from "../components/Contact"
import DoctorDetails from "../components/doctors/DoctorDetails"
import FindDoctor from "../components/doctors/FindDoctor"
import PageNotFound from "../components/PageNotFound"
import UserAccount from "../pages/dashboard/user/UserAccount"
import DoctorAccount from "../pages/dashboard/doctor/DoctorAccount"
import ProtectedRouter from "./ProtectedRouter"
import ForgetPassword from "../pages/ForgetPassword"
import ResetPassword from "../pages/ResetPassword"
import CheckoutVerify from "../components/doctors/CheckoutVerify"

export default function Router() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/docs" element={<FindDoctor />} />
            <Route path="/docs/:id" element={<DoctorDetails />} />
            <Route path="/register" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forget-password" element={<ForgetPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/services" element={<Services />} />
            <Route path="/users/profile/me" element={<ProtectedRouter allowedRoles={["patient"]}><UserAccount /></ProtectedRouter>} />
            <Route path="/doctors/profile/me" element={<ProtectedRouter allowedRoles={["doctor"]}><DoctorAccount /></ProtectedRouter>} />
            <Route path="/checkout-verify" element={<CheckoutVerify />} />
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    )
}
