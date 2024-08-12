import { useContext, useState } from "react"
import { AuthContext } from "../../../context/AuthContext.jsx"
import { BASE_URL } from "../../../config.js"
import useFetchData from "../../../hooks/useFetchData.js"
import defaultAvatar from "/images/default-avatar.jpg"
import UserBookings from "./UserBookings"
import UserSettings from "./UserSettings.jsx"
import UserChangePassword from "./UserChangePassword.jsx"
import { useNavigate } from "react-router-dom"
import { CgProfile } from "react-icons/cg"
import { SiQuickbooks } from "react-icons/si"
import { RiLockPasswordLine } from "react-icons/ri"

export default function UserAccount() {
    const { user: userData, dispatch } = useContext(AuthContext)

    const [tab, setTab] = useState("bookings")

    const navigate = useNavigate()

    const { loading, error } = useFetchData(`${BASE_URL}/users/profile/me`)

    const handleExpiredToken = () => {
        dispatch({ type: "LOGOUT" })
        navigate("/login", { replace: true })
    }

    return (
        <section className="min-h-screen relative">
            <div className="max-w-[1440px] px-4 mx-auto">
                {error && !loading && handleExpiredToken()}

                {!loading && !error && (
                    <div className="flex flex-col md:flex-row gap-20">
                        {/* Desktop Panel Side */}
                        <div className="hidden md:flex md:flex-col items-center justify-around md:w-1/3 lg:w-1/4 h-[490px] px-[30px] rounded-lg shadow-lg profile__gradient1 dark:profile__gradient2">
                            <div>
                                <div className="flex items-center justify-center">
                                    <figure className="w-[100px] h-[100px] rounded-full border-2 border-solid border-primaryColor">
                                        <img src={userData.photo || defaultAvatar} alt="" className="w-full h-full rounded-full object-cover" />
                                    </figure>
                                </div>
                                <div className="text-center mt-2">
                                    <h3 className="text-[18px] leading-[30px] text-headingColor font-bold dark:text-slate-300">
                                        {userData.name}
                                    </h3>
                                    <p className="text-textColor text-[15px] leading-6 font-medium dark:text-slate-400">
                                        {userData.email}
                                    </p>
                                    <p className="text-textColor text-[15px] leading-6 font-medium dark:text-slate-400 flex items-center justify-center gap-1">
                                        گروه خونی:
                                        <span className="text-red-500 text-[15px] leading-6 mt-1" dir="ltr">
                                            {userData.bloodType}
                                        </span>
                                    </p>
                                </div>
                            </div>
                            <div>
                                <button
                                    onClick={() => setTab("bookings")}
                                    className="btn w-full my-1 rounded-md"
                                >
                                    تاریخچه ویزیت ها
                                </button>
                                <button
                                    onClick={() => setTab("settings")}
                                    className="btn w-full my-1 rounded-md"
                                >
                                    اطلاعات پروفایل
                                </button>
                                <button
                                    onClick={() => setTab("changePassword")}
                                    className="btn w-full my-1 rounded-md"
                                >
                                    تغییر رمز عبور
                                </button>
                            </div>
                        </div>
                        {/* Content Side */}
                        <div className="md:w-2/3 lg:w-3/4 mb-14 md:mb-0">
                            {tab === "bookings" && <UserBookings />}
                            {tab === "settings" && <UserSettings user={userData} />}
                            {tab === "changePassword" && <UserChangePassword user={userData} />}
                        </div>
                    </div>
                )}
            </div>

            {/* Mobile Panel Side */}
            <div className="fixed bottom-0 flex items-center md:hidden w-full justify-around text-sm shadow-[0_-3px_30px_-18px_rgba(0,0,0,0.43)] bg-cyan-100 text-slate-400 dark:text-slate-500 dark:bg-slate-800">
                <button
                    onClick={() => setTab("bookings")}
                    className={`${tab === "bookings" ? "font-semibold text-slate-950 dark:text-slate-300" : ""} p-3`}
                >
                    <div className="flex flex-col items-center">
                        <div><SiQuickbooks size={20} /></div>
                        <div>تاریخچه ویزیت ها</div>
                    </div>
                </button>
                <button
                    onClick={() => setTab("settings")}
                    className={`${tab === "settings" ? "font-semibold text-slate-950 dark:text-slate-300" : ""} p-3`}
                >
                    <div className="flex flex-col items-center">
                        <div><CgProfile size={20} /></div>
                        <div>اطلاعات پروفایل</div>
                    </div>
                </button>
                <button
                    onClick={() => setTab("changePassword")}
                    className={`${tab === "changePassword" ? "font-semibold text-slate-950 dark:text-slate-300" : ""} p-3`}
                >
                    <div className="flex flex-col items-center">
                        <div><RiLockPasswordLine size={20} /></div>
                        <div>تغییر رمز عبور</div>
                    </div>
                </button>
            </div>
        </section>
    )
}
