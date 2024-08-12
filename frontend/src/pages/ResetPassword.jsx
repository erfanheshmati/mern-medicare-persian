import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { BASE_URL } from "../config"
import { useLocation } from "react-router-dom"
import { HashLoader } from "react-spinners"
import { BiShow, BiHide } from "react-icons/bi"

export default function ResetPassword() {
    const [formData, setFormData] = useState({ newPassword: "", confirmPassword: "" })
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [passwordValidationMessage, setPasswordValidationMessage] = useState("")

    const location = useLocation();

    const query = new URLSearchParams(location.search);
    const token = query.get('token');
    const userId = query.get('id');

    useEffect(() => {
        if (!token || !userId) {
            toast.error("Invalid or expired token.")
        }
    }, [token, userId]);

    const togglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    }

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword((prevShowConfirmPassword) => !prevShowConfirmPassword);
    }

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
        if (e.target.name === "newPassword") {
            validatePassword(e.target.value)
        }
    }

    const validatePassword = (password) => {
        const criteria = [
            // { regex: /[A-Z]/, message: "* At least one uppercase letter is required" },
            // { regex: /[a-z]/, message: "* At least one lowercase letter is required" },
            // { regex: /[0-9]/, message: "* At least one number is required" },
            // { regex: /[^A-Za-z0-9]/, message: "* At least one special character is required" },
            { regex: /.{8,}/, message: "* حداقل ۸ کاراکتر الزامی است" }
        ];
        const failedCriteria = criteria.filter(criterion => !criterion.regex.test(password))
        if (failedCriteria.length > 0) {
            setPasswordValidationMessage(`${failedCriteria.map(c => c.message).join("\n")}`)
        } else {
            setPasswordValidationMessage("")
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (formData.newPassword !== formData.confirmPassword) {
            return toast.error("پسوردها یکسان نیستند")
        }
        if (passwordValidationMessage) {
            return toast.error("پسورد را صحیح وارد کنید");
        }
        setLoading(true)
        try {
            const res = await fetch(`${BASE_URL}/auth/reset-password/${userId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `${token}`
                },
                body: JSON.stringify(formData)
            })
            const result = await res.json()
            if (!res.ok) throw new Error(result.message)
            toast.success(result.message)
            setLoading(false)
        } catch (error) {
            toast.error(error.message)
            setLoading(false)
        }
    }

    return (
        <section className="px-4 lg:px-0 h-screen-mobile md:h-screen-desktop flex flex-col justify-center">
            <div className="w-full max-w-[470px] mx-auto rounded-xl shadow-2xl p-4 md:p-10 dark:bg-slate-600">
                <h3 className="text-headingColor text-[22px] text-center leading-9 font-bold dark:text-slate-300">
                    تغییر
                    <span className="text-primaryColor dark:text-blue-500"> رمز عبور</span>
                </h3>
                <form className="py-4 md:py-0 mt-5" onSubmit={handleSubmit}>
                    <div className="mb-5 relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="newPassword"
                            placeholder="رمز عبور جدید *"
                            value={formData.newPassword}
                            onChange={handleInputChange}
                            className={`${passwordValidationMessage !== "" && "border-red-500 focus:border-red-500 dark:border-red-400 dark:focus:border-red-400"} w-full px-2 py-[10px] border border-solid border-[#0066ff40] focus:outline-none focus:border-primaryColor rounded-lg text-[16px] leading-7 text-headingColor placeholder:text-textColor dark:bg-slate-500 dark:text-slate-200 dark:placeholder:text-slate-200 dark:focus:border-blue-200`}
                            required
                            autoComplete="off"
                        />
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute left-3 top-[14px] text-2xl text-gray-600 hover:text-black dark:text-slate-300 dark:hover:text-slate-50"
                        >
                            {showPassword ? <BiShow /> : <BiHide />}
                        </button>
                        {passwordValidationMessage && (
                            <div className="mt-2 text-sm text-red-500 dark:text-red-400 transition-all ease-in-out delay-500">
                                {passwordValidationMessage.split('\n').map((msg, index) => (
                                    <div key={index}>{msg}</div>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="relative">
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            placeholder="تکرار رمز عبور *"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            className="w-full px-2 py-[10px] border border-solid border-[#0066ff40] focus:outline-none focus:border-primaryColor rounded-lg text-[16px] leading-7 text-headingColor placeholder:text-textColor dark:bg-slate-500 dark:text-slate-200 dark:placeholder:text-slate-200 dark:focus:border-blue-200"
                            required
                            autoComplete="off"
                        />
                        <button
                            type="button"
                            onClick={toggleConfirmPasswordVisibility}
                            className="absolute left-3 top-[14px] text-2xl text-gray-600 hover:text-black dark:text-slate-300 dark:hover:text-slate-50"
                        >
                            {showConfirmPassword ? <BiShow /> : <BiHide />}
                        </button>
                    </div>
                    <div>
                        <button type="submit" className="btn w-full text-[18px]">
                            {loading ? <HashLoader size={17} color="#fff" /> : "ثبت"}
                        </button>
                    </div>
                </form>
            </div>
        </section>
    )
}
