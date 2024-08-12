import { useContext, useEffect, useState } from "react"
import { BASE_URL, token } from "../../../config.js"
import { HashLoader } from "react-spinners"
import { toast } from 'react-toastify'
import defaultAvatar from "/images/default-avatar.jpg"
import { AuthContext } from "../../../context/AuthContext.jsx"

export default function UserSettings({ user }) {
    const [selectedFile, setSelectedFile] = useState(null)
    const [previewURL, setPreviewURL] = useState("")
    const [avatarLoading, setAvatarLoading] = useState(false)
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({ name: "", email: "", password: "", confirmPassword: "", bloodType: "", gender: "", photo: selectedFile })

    const { user: userData, dispatch } = useContext(AuthContext)

    useEffect(() => {
        setFormData({ name: userData.name, email: userData.email, photo: userData.photo, gender: userData.gender, bloodType: userData.bloodType })
    }, [userData])

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleImageChange = async (e) => {
        const file = e.target.files[0]
        if (file.size > 1024 * 1024) {
            return toast.error("حجم فایل نباید بیشتر از یک مگابایت باشد")
        }
        if (!file.size) {
            return toast.error("لطفا تصویر خود را آپلود کنید")
        }
        setAvatarLoading(true)
        // Upload Image
        try {
            const uploadData = new FormData();
            uploadData.append("photo", file)
            const res = await fetch(`${BASE_URL}/upload/avatar`, {
                method: "POST",
                body: uploadData,
            });
            const data = await res.json();
            setSelectedFile(data.filePath)
            setPreviewURL(data.filePath)
            setFormData({ ...formData, photo: data?.filePath })
            setAvatarLoading(false)
        } catch (error) {
            toast.error(error.message)
            setAvatarLoading(false)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (formData.password !== formData.confirmPassword) {
            return toast.error("پسوردها یکسان نیستند")
        }
        setLoading(true)
        try {
            const res = await fetch(`${BASE_URL}/users/${user._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            })
            const result = await res.json()
            if (!res.ok) throw new Error(result.message)
            dispatch({
                type: "USER_UPDATE",
                payload: { user: result.data }
            })
            setLoading(false)
            toast.success(result.message)
        } catch (error) {
            setLoading(false)
            toast.error(error.message)
        }
    }

    return (
        <div>
            <h2 className="text-headingColor text-[22px] leading-9 font-bold dark:text-slate-300">
                به روزرسانی <span className="text-primaryColor dark:text-blue-500">اطلاعات</span>
            </h2>
            <div className="mt-4">
                <form onSubmit={handleSubmit}>
                    <div className="mb-5">
                        <label className="form__label">نام و نام خانوادگی *</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="form__input mt-1"
                            autoComplete="off"
                            required
                        />
                    </div>
                    <div className="mb-5">
                        <label className="form__label">آدرس ایمیل (قابل تغییر نیست)</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="form__input mt-1"
                            aria-readonly
                            readOnly
                            disabled="true"
                        />
                    </div>
                    <div className="mb-5 px-1 flex flex-col justify-center sm:flex-row sm:items-center sm:justify-between">
                        <label className="text-headingColor font-semibold text-[16px] leading-7 dark:text-slate-300">
                            گروه خونی *
                            <select
                                name="bloodType"
                                value={formData.bloodType}
                                onChange={handleInputChange}
                                className="text-textColor font-semibold text-[15px] leading-7 px-2 py-3 focus:outline-none cursor-pointer hover:opacity-70 dark:bg-slate-700 dark:text-slate-400 dark:hover:text-slate-100"
                                required
                            >
                                <option value="">انتخاب کنید</option>
                                <option value="A+">+A</option>
                                <option value="A-">-A</option>
                                <option value="B+">+B</option>
                                <option value="B-">-B</option>
                                <option value="AB+">+AB</option>
                                <option value="AB-">-AB</option>
                                <option value="O+">+O</option>
                                <option value="O-">-O</option>
                            </select>
                        </label>
                        <label className="text-headingColor font-semibold text-[16px] leading-7 dark:text-slate-300">
                            جنسیت *
                            <select
                                name="gender"
                                value={formData.gender}
                                onChange={handleInputChange}
                                className="text-textColor font-semibold text-[15px] leading-7 px-2 py-3 focus:outline-none cursor-pointer hover:opacity-70 dark:bg-slate-700 dark:text-slate-400 dark:hover:text-slate-100"
                                required
                            >
                                <option value="">انتخاب کنید</option>
                                <option value="male">مرد</option>
                                <option value="female">زن</option>
                            </select>
                        </label>
                    </div>
                    <div className="flex px-1 items-center gap-3">
                        <figure className="w-[70px] h-[70px] rounded-full border-2 border-solid border-primaryColor flex items-center justify-center">
                            <img
                                src={selectedFile ? previewURL : user.photo || defaultAvatar}
                                alt=""
                                className="w-[66px] h-[66px] rounded-full object-cover"
                            />
                        </figure>
                        <div className="relative w-[130px] h-[50px]">
                            <input
                                type="file"
                                name="photo"
                                id="customFile"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                            />
                            <label
                                htmlFor="customFile"
                                className="absolute top-0 left-0 w-full h-full flex items-center px-5 py-[0.375rem] text-[15px] leading-6 overflow-hidden bg-[#0066ff46] text-headingColor font-semibold rounded-lg truncate cursor-pointer hover:bg-[#0066ff66] dark:bg-blue-500 dark:text-slate-100 dark:hover:bg-blue-600">
                                {avatarLoading ? "در حال ارسال ..." : "تصویر پروفایل"}
                            </label>
                        </div>
                    </div>
                    <div>
                        <button type="submit" className="btn w-full rounded-lg text-[18px]" disabled={loading && true}>
                            {loading ? <HashLoader size={17} color="#fff" /> : "به روزرسانی"}
                        </button>
                    </div>
                </form>
            </div >
        </div >
    )
}
