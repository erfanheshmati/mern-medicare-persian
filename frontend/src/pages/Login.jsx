import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { BASE_URL } from "../config"
import { toast } from "react-toastify"
import { AuthContext } from "../context/AuthContext.jsx"
import { HashLoader } from "react-spinners"
import { BiShow, BiHide } from "react-icons/bi"

export default function Login() {
    const [formData, setFormData] = useState({ email: "", password: "", rememberMe: false })
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const { dispatch } = useContext(AuthContext)

    const navigate = useNavigate()

    const togglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    }

    const handleInputChange = (e) => {
        // setFormData({ ...formData, [e.target.name]: e.target.value })
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        dispatch({ type: "LOGIN_START" });
        try {
            const res = await fetch(`${BASE_URL}/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            })
            const result = await res.json()
            if (!res.ok) throw new Error(result.message)
            dispatch({
                type: "LOGIN_SUCCESS",
                payload: {
                    user: result.data,
                    role: result.role,
                    token: result.token,
                }
            })
            setLoading(false)
            navigate("/home")
            window.location.reload()
        } catch (error) {
            setLoading(false)
            toast.error(error.message)
        }
    }

    return (
        <section className="px-4 lg:px-0 h-screen-mobile md:h-screen-desktop flex flex-col justify-center">
            <div className="w-full max-w-[470px] mx-auto rounded-xl shadow-2xl p-4 md:p-10 dark:bg-slate-600">
                <h3 className="text-headingColor text-[22px] text-center leading-9 font-bold dark:text-slate-300">
                    <span className="text-primaryColor dark:text-blue-500"> ورود </span>
                    به حساب کاربری
                </h3>
                {/* <div className="flex justify-center mt-8">
                    <img src={loginImg} alt="" className="w-1/3 xl:w-1/4 2xl:w-1/2" />
                </div> */}
                <form className="py-4 md:py-0 mt-5" onSubmit={handleSubmit}>
                    <div className="my-3">
                        <label className="text-[16px] text-slate-700 dark:text-slate-300">ایمیل</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full px-2 py-[10px] mt-1 border border-solid border-[#0066ff40] focus:outline-none focus:border-primaryColor rounded-lg text-[16px] leading-7 text-headingColor placeholder:text-textColor dark:bg-slate-500 dark:text-slate-200 dark:placeholder:text-slate-200 dark:focus:border-blue-200"
                            required
                        />
                    </div>
                    <div className="my-3 relative">
                        <div className="flex items-center justify-between">
                            <label className="text-[16px] text-slate-700 dark:text-slate-300">رمز عبور</label>
                            <Link to="/forget-password">
                                <span className="text-sm text-primaryColor hover:text-blue-700 hover:underline dark:text-blue-400 dark:hover:text-blue-300">
                                    فراموش کرده اید؟
                                </span>
                            </Link>
                        </div>
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            className="w-full px-2 py-[10px] mt-1 border border-solid border-[#0066ff40] focus:outline-none focus:border-primaryColor rounded-lg text-[16px] leading-7 text-headingColor placeholder:text-textColor dark:bg-slate-500 dark:text-slate-200 dark:placeholder:text-slate-200 dark:focus:border-blue-200"
                            required
                        />
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute left-3 top-[42px] text-2xl text-gray-600 hover:text-black dark:text-slate-300 dark:hover:text-slate-50"
                        >
                            {showPassword ? <BiShow /> : <BiHide />}
                        </button>
                    </div>
                    <div className="mt-5 flex items-center gap-1 px-1">
                        <input
                            type="checkbox"
                            name="rememberMe"
                            id="re-me"
                            checked={formData.rememberMe}
                            onChange={handleInputChange}
                            className="cursor-pointer size-4"
                        />
                        <label htmlFor="re-me" className="text-sm cursor-pointer dark:text-slate-400">مرا به خاطر بسپار</label>
                    </div>
                    <div>
                        <button type="submit" className="btn w-full text-[18px] mt-6">
                            {loading ? <HashLoader size={17} color="#fff" /> : "ورود"}
                        </button>
                    </div>
                    <p className="flex items-center justify-center gap-1 mt-4 text-textColor text-center dark:text-slate-300">
                        حساب کاربری ندارید؟
                        <Link to="/register" className="text-primaryColor font-medium ml-1 hover:text-blue-700 hover:underline dark:text-blue-400 dark:hover:text-blue-300">
                            ثبت نام کنید
                        </Link>
                    </p>
                </form>
            </div>
        </section>
    )
}
