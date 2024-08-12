import { useState } from "react"
import { BiShow, BiHide } from "react-icons/bi"
import { toast } from "react-toastify"
import { BASE_URL, token } from "../../../config"
import { HashLoader } from "react-spinners"

export default function UserChangePassword({ user }) {
    const [loading, setLoading] = useState(false)
    const [showOldPassword, setShowOldPassword] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [passwordValidationMessage, setPasswordValidationMessage] = useState("")
    const [formData, setFormData] = useState({ oldPassword: "", newPassword: "", confirmPassword: "" })

    const toggleOldPasswordVisibility = () => setShowOldPassword(prev => !prev)
    const toggleNewPasswordVisibility = () => setShowNewPassword(prev => !prev)
    const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(prev => !prev)

    const validatePassword = (newPassword) => {
        const criteria = [{ regex: /.{8,}/, message: "* حداقل ۸ کاراکتر الزامی است" }]
        const failedCriteria = criteria.filter(criterion => !criterion.regex.test(newPassword))
        if (failedCriteria.length > 0) {
            setPasswordValidationMessage(`${failedCriteria.map(c => c.message).join("\n")}`)
        } else {
            setPasswordValidationMessage("")
        }
    }

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
        if (e.target.name === "newPassword") {
            validatePassword(e.target.value)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (formData.newPassword !== formData.confirmPassword) {
            return toast.error("پسوردها یکسان نیستند.")
        }
        if (passwordValidationMessage) {
            return toast.error("پسورد را صحیح وارد کنید.")
        }
        setLoading(true)
        try {
            const res = await fetch(`${BASE_URL}/users/${user._id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
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
        <div>
            <h2 className="text-headingColor text-[22px] leading-9 font-bold dark:text-slate-300">
                تغییر <span className="text-primaryColor dark:text-blue-500">رمز عبور</span>
            </h2>
            <div className="mt-4">
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col md:flex-row items-center md:gap-5">
                        <div className="w-full space-y-3">
                            <div className="relative w-full">
                                <input
                                    type={showOldPassword ? "text" : "password"}
                                    name="oldPassword"
                                    placeholder="رمز عبور فعلی *"
                                    value={formData.oldPassword}
                                    onChange={handleInputChange}
                                    className="w-full px-2 py-[10px] border border-solid border-[#0066ff40] focus:outline-none focus:border-primaryColor rounded-lg text-[16px] leading-7 text-headingColor placeholder:text-textColor dark:bg-slate-500 dark:text-slate-200 dark:placeholder:text-slate-200 dark:focus:border-blue-200"
                                    required
                                    autoComplete="off"
                                />
                                <button
                                    type="button"
                                    onClick={toggleOldPasswordVisibility}
                                    className="absolute left-3 top-[14px] text-2xl text-gray-600 hover:text-black dark:text-slate-300 dark:hover:text-slate-50"
                                >
                                    {showOldPassword ? <BiShow /> : <BiHide />}
                                </button>
                            </div>
                            <div className="flex flex-col md:flex-row md:gap-5 space-y-3 md:space-y-0">
                                <div className="relative w-full">
                                    <input
                                        type={showNewPassword ? "text" : "password"}
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
                                        onClick={toggleNewPasswordVisibility}
                                        className="absolute left-3 top-[14px] text-2xl text-gray-600 hover:text-black dark:text-slate-300 dark:hover:text-slate-50"
                                    >
                                        {showNewPassword ? <BiShow /> : <BiHide />}
                                    </button>
                                    {passwordValidationMessage && (
                                        <div className="mt-2 text-sm text-red-500 dark:text-red-400 transition-all ease-in-out delay-500">
                                            {passwordValidationMessage.split('\n').map((msg, index) => (
                                                <div key={index}>{msg}</div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <div className="relative w-full">
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
                            </div>
                            <div>
                                <button type="submit" className="btn w-full text-[18px] mt-1" disabled={loading && true}>
                                    {loading ? <HashLoader size={17} color="#fff" /> : "ثبت"}
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
