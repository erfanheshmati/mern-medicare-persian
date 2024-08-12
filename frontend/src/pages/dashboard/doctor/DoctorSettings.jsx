import { useContext, useEffect, useState } from "react"
import { BASE_URL, token } from "../../../config.js"
import { HashLoader } from "react-spinners"
import { toast } from 'react-toastify'
import { AiOutlineDelete } from "react-icons/ai"
import defaultAvatar from "/images/default-avatar.jpg"
import { AuthContext } from "../../../context/AuthContext.jsx"

export default function DoctorSettings({ doctor }) {
    const { user: doctorData, dispatch } = useContext(AuthContext)
    const [selectedFile, setSelectedFile] = useState(null)
    const [previewURL, setPreviewURL] = useState("")
    const [avatarLoading, setAvatarLoading] = useState(false)
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
        bio: "",
        gender: "",
        specialization: "",
        ticketPrice: null,
        qualifications: [],
        experiences: [],
        timeSlots: [],
        about: "",
        photo: selectedFile
    })

    useEffect(() => {
        setFormData({
            name: doctorData?.name,
            email: doctorData?.email,
            phone: doctorData?.phone,
            bio: doctorData?.bio,
            gender: doctorData?.gender,
            specialization: doctorData?.specialization,
            ticketPrice: doctorData?.ticketPrice,
            qualifications: doctorData?.qualifications,
            experiences: doctorData?.experiences,
            timeSlots: doctorData?.timeSlots,
            about: doctorData?.about,
            photo: doctorData?.photo
        })
    }, [doctorData])

    // Convert English numerals to Persian numerals
    const convertToPersianNumbers = (input) => {
        const persianNumbers = '۰۱۲۳۴۵۶۷۸۹'
        const englishNumbers = '0123456789'
        return input.replace(/\d/g, (match) => persianNumbers[englishNumbers.indexOf(match)])
    }
    // Filter out non-Persian numerals
    const filterToPersianNumbersOnly = (input) => {
        const persianNumberRegex = /^[۰-۹]*$/;
        return [...input].filter(char => persianNumberRegex.test(char)).join('');
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const persianNumbers = convertToPersianNumbers(value);
        const filteredValue =
            name === 'phone' ? filterToPersianNumbersOnly(persianNumbers)
                // : name === "ticketPrice" ? filterToPersianNumbersOnly(persianNumbers)
                : value
        setFormData({ ...formData, [name]: filteredValue })
    }

    const handleImageChange = async (e) => {
        const file = e.target.files[0]
        if (!file) {
            return toast.error("لطفا تصویر خود را آپلود کنید")
        }
        if (file.size > 1024 * 1024) {
            return toast.error("حجم فایل نباید بیشتر از یک مگابایت باشد")
        }
        setAvatarLoading(true)
        /* Upload Image */
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
            const res = await fetch(`${BASE_URL}/doctors/${doctor._id}`, {
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
            toast.success(result.message)
            setLoading(false)
        } catch (error) {
            toast.error(error.message)
            setLoading(false)
        }
    }

    // Reusable function for adding item
    const addItem = (key, item) => setFormData(prev => ({ ...prev, [key]: [...prev[key], item] }))
    // Reusable function for deleting item
    const deleteItem = (key, index) => setFormData(prev => ({ ...prev, [key]: prev[key].filter((_, i) => i !== index) }))
    // Reusable function for input change 
    const handleReusableInputChange = (key, index, event) => {
        const { name, value } = event.target
        setFormData(prev => {
            const updateItems = [...prev[key]]
            updateItems[index][name] = value
            return { ...prev, [key]: updateItems }
        })
    }


    // Qualification functions
    const addQualification = (e) => {
        e.preventDefault()
        addItem("qualifications", { startingDate: "", endingDate: "", degree: "", university: "" })
    }
    const handleQualificationChange = (event, index) => {
        handleReusableInputChange("qualifications", index, event)
    }
    const deleteQualification = (e, index) => {
        e.preventDefault()
        deleteItem("qualifications", index)
    }

    // Experience functions
    const addExperience = (e) => {
        e.preventDefault()
        addItem("experiences", { startingDate: "", endingDate: "", position: "", hospital: "" })
    }
    const handleExperienceChange = (event, index) => {
        handleReusableInputChange("experiences", index, event)
    }
    const deleteExperience = (e, index) => {
        e.preventDefault()
        deleteItem("experiences", index)
    }

    // TimeSlot functions
    const addTimeSlot = (e) => {
        e.preventDefault()
        addItem("timeSlots", { day: "", startingTime: "", endingTime: "" })
    }
    const handleTimeSlotChange = (event, index) => {
        handleReusableInputChange("timeSlots", index, event)
    }
    const deleteTimeSlot = (e, index) => {
        e.preventDefault()
        deleteItem("timeSlots", index)
    }

    return (
        <div>
            <h2 className="text-headingColor text-[22px] leading-9 font-bold dark:text-slate-300">
                به روزرسانی <span className="text-primaryColor dark:text-blue-500">اطلاعات</span>
            </h2>
            <div className="mt-4">
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col md:flex-row items-center md:gap-10">
                        <div className="w-full md:w-1/2 mb-5 space-y-1">
                            <label className="form__label">نام و نام خانوادگی *</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="form__input"
                                autoComplete="off"
                                required
                            />
                        </div>
                        <div className="w-full md:w-1/2 mb-5 space-y-1">
                            <label className="form__label">آدرس ایمیل (قابل تغییر نیست)</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="form__input"
                                style={{ direction: "ltr" }}
                                aria-readonly
                                readOnly
                                disabled="true"
                            />
                        </div>
                    </div>
                    {/* <div className="flex flex-col md:flex-row items-center md:gap-10">
                        <div className="w-full md:w-1/2 mb-5 space-y-1 relative">
                            <label className="form__label">رمز عبور جدید</label>
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                className="form__input"
                                autoComplete="off"
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="absolute left-3 top-10 text-2xl text-gray-600 hover:text-black dark:text-slate-300 dark:hover:text-slate-50"
                            >
                                {showPassword ? <BiShow /> : <BiHide />}
                            </button>
                        </div>
                        <div className="w-full md:w-1/2 mb-5 space-y-1 relative">
                            <label className="form__label">تکرار رمز عبور</label>
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                className="form__input"
                                autoComplete="off"
                            />
                            <button
                                type="button"
                                onClick={toggleConfirmPasswordVisibility}
                                className="absolute left-3 top-10 text-2xl text-gray-600 hover:text-black dark:text-slate-300 dark:hover:text-slate-50"
                            >
                                {showConfirmPassword ? <BiShow /> : <BiHide />}
                            </button>
                        </div>
                    </div> */}
                    <div className="flex flex-col md:flex-row items-center md:gap-10">
                        <div className="w-full md:w-1/2 mb-5 space-y-1">
                            <label className="form__label">بیوگرافی *</label>
                            <input
                                type="text"
                                name="bio"
                                value={formData.bio}
                                onChange={handleInputChange}
                                className="form__input"
                                maxLength={50}
                                autoComplete="off"
                                required
                            />
                        </div>
                        <div className="w-full md:w-1/2 mb-5 space-y-1">
                            <label className="form__label">شماره تلفن *</label>
                            <input
                                type="tel"
                                name="phone"
                                placeholder="۰۹xxxxxxxxx"
                                value={formData.phone}
                                onChange={handleInputChange}
                                className="form__input"
                                pattern="[۰۱۲۳۴۵۶۷۸۹]{11}"
                                minLength={11}
                                maxLength={11}
                                autoComplete="off"
                                required
                            />
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row items-center md:gap-10">
                        <div className="w-full md:w-1/3 mb-5 space-y-1">
                            <label className="form__label">جنسیت *</label>
                            <select
                                name="gender"
                                value={formData.gender}
                                onChange={handleInputChange}
                                className="form__input cursor-pointer"
                                required
                            >
                                <option value="">انتخاب کنید</option>
                                <option value="male">مرد</option>
                                <option value="female">زن</option>
                            </select>
                        </div>
                        <div className="w-full md:w-1/3 mb-5 space-y-1">
                            <label className="form__label">تخصص *</label>
                            <select
                                name="specialization"
                                value={formData.specialization}
                                onChange={handleInputChange}
                                className="form__input cursor-pointer"
                                required
                            >
                                <option value="">انتخاب کنید</option>
                                <option value="درماتولوژیست">درماتولوژیست</option>
                                <option value="نورولوژیست">نورولوژیست</option>
                                <option value="اورولوژیست">اورولوژیست</option>
                                <option value="آنکولوژیست">آنکولوژیست</option>
                                <option value="کاردیولوژیست">کاردیولوژیست</option>
                                <option value="رادیولوژیست">رادیولوژیست</option>
                                <option value="پاتولوژیست">پاتولوژیست</option>
                                <option value="هماتولوژیست">هماتولوژیست</option>
                                <option value="گوش، حلق و بینی">گوش، حلق و بینی</option>
                                <option value="طب اورژانس">طب اورژانس</option>
                                <option value="زنان و زایمان">زنان و زایمان</option>
                                <option value="جراحی">جراحی</option>
                                <option value="داخلی">داخلی</option>
                                <option value="عمومی">عمومی</option>
                                <option value="اطفال">اطفال</option>
                                <option value="خانواده">خانواده</option>
                            </select>
                        </div>
                        <div className="w-full md:w-1/3 mb-5 space-y-1">
                            <label className="form__label">هزینه ویزیت *</label>
                            <div className="relative">
                                <input
                                    type="number"
                                    name="ticketPrice"
                                    value={formData.ticketPrice}
                                    onChange={handleInputChange}
                                    className="form__input pl-20 no-spinner"
                                    style={{ direction: "ltr" }}
                                    max={999}
                                    autoComplete="off"
                                    required
                                />
                                <span className="absolute left-3 top-[14px] text-textColor dark:text-slate-300">
                                    هزار تومان
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="mb-5 mt-1">
                        <label className="form__label font-bold text-lg">تحصیلات *</label>
                        {formData.qualifications?.map((item, index) => (
                            <div key={index} className="mt-1">
                                <div className="grid grid-cols-2 gap-x-2 md:gap-x-10 mb-1">
                                    <div className="space-y-1">
                                        <label className="form__label">شروع</label>
                                        <input
                                            type="date"
                                            name="startingDate"
                                            value={item.startingDate}
                                            onChange={e => handleQualificationChange(e, index)}
                                            className="form__input"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="form__label">پایان</label>
                                        <input
                                            type="date"
                                            name="endingDate"
                                            value={item.endingDate}
                                            onChange={e => handleQualificationChange(e, index)}
                                            className="form__input"
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-x-2 md:gap-x-10">
                                    <div className="mt-1">
                                        <label className="form__label">مدرک</label>
                                        <input
                                            type="text"
                                            name="degree"
                                            value={item.degree}
                                            onChange={e => handleQualificationChange(e, index)}
                                            className="form__input"
                                        />
                                    </div>
                                    <div className="mt-1">
                                        <label className="form__label">دانشگاه</label>
                                        <input
                                            type="text"
                                            name="university"
                                            value={item.university}
                                            onChange={e => handleQualificationChange(e, index)}
                                            className="form__input"
                                        />
                                    </div>
                                </div>
                                <button
                                    onClick={e => deleteQualification(e, index)}
                                    className="bg-red-600 p-3 rounded-md text-white text-[18px] my-2 cursor-pointer hover:bg-red-700"
                                >
                                    <AiOutlineDelete />
                                </button>
                            </div>
                        ))}
                        <div className="flex mt-1">
                            <button
                                onClick={addQualification}
                                className="bg-slate-800 py-2 px-4 rounded-md text-white h-fit cursor-pointer hover:bg-slate-950 dark:bg-slate-900 dark:hover:bg-black"
                            >
                                افزودن
                            </button>
                        </div>
                    </div>
                    <div className="mb-5">
                        <label className="form__label font-bold text-lg">تجربیات *</label>
                        {formData.experiences?.map((item, index) => (
                            <div key={index} className="mt-1">
                                <div className="grid grid-cols-2 gap-x-2 md:gap-x-10 mb-1">
                                    <div className="space-y-1">
                                        <label className="form__label">شروع</label>
                                        <input
                                            type="date"
                                            name="startingDate"
                                            value={item.startingDate}
                                            onChange={e => handleExperienceChange(e, index)}
                                            className="form__input"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="form__label">پایان</label>
                                        <input
                                            type="date"
                                            name="endingDate"
                                            value={item.endingDate}
                                            onChange={e => handleExperienceChange(e, index)}
                                            className="form__input"
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-x-2 md:gap-x-10">
                                    <div className="mt-1">
                                        <label className="form__label">سمت</label>
                                        <input
                                            type="text"
                                            name="position"
                                            value={item.position}
                                            onChange={e => handleExperienceChange(e, index)}
                                            className="form__input"
                                        />
                                    </div>
                                    <div className="mt-1">
                                        <label className="form__label">بیمارستان</label>
                                        <input
                                            type="text"
                                            name="hospital"
                                            value={item.hospital}
                                            onChange={e => handleExperienceChange(e, index)}
                                            className="form__input"
                                        />
                                    </div>
                                </div>
                                <button
                                    onClick={e => deleteExperience(e, index)}
                                    className="bg-red-600 p-3 rounded-md text-white text-[18px] my-2 cursor-pointer hover:bg-red-700"
                                >
                                    <AiOutlineDelete />
                                </button>
                            </div>
                        ))}
                        <div className="flex mt-1">
                            <button
                                onClick={addExperience}
                                className="bg-slate-800 py-2 px-4 rounded-md text-white h-fit cursor-pointer hover:bg-slate-950 dark:bg-slate-900 dark:hover:bg-black"
                            >
                                افزودن
                            </button>
                        </div>
                    </div>
                    <div className="mb-5">
                        <label className="form__label font-bold text-lg">نوبت دهی *</label>
                        {formData.timeSlots?.map((item, index) => (
                            <div key={index} className="mt-1">
                                <div className="grid grid-cols-3 lg:grid-cols-3 gap-x-2 md:gap-x-10">
                                    <div className="space-y-1">
                                        <label className="form__label">روز</label>
                                        <select
                                            name="day"
                                            value={item.day}
                                            onChange={e => handleTimeSlotChange(e, index)}
                                            className="form__input py-[15px]"
                                        >
                                            <option value="">انتخاب کنید</option>
                                            <option value="شنبه">شنبه</option>
                                            <option value="یکشنبه">یکشنبه</option>
                                            <option value="دوشنبه">دوشنبه</option>
                                            <option value="سه شنبه">سه شنبه</option>
                                            <option value="چهارشنبه">چهارشنبه</option>
                                            <option value="پنجشنبه">پنجشنبه</option>
                                            <option value="جمعه">جمعه</option>
                                        </select>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="form__label">شروع</label>
                                        <input
                                            type="time"
                                            name="startingTime"
                                            value={item.startingTime}
                                            onChange={e => handleTimeSlotChange(e, index)}
                                            className="form__input"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="form__label">پایان</label>
                                        <input
                                            type="time"
                                            name="endingTime"
                                            value={item.endingTime}
                                            onChange={e => handleTimeSlotChange(e, index)}
                                            className="form__input"
                                        />
                                    </div>
                                </div>
                                <button
                                    onClick={e => deleteTimeSlot(e, index)}
                                    className="bg-red-600 p-3 rounded-md text-white text-[18px] my-2 cursor-pointer hover:bg-red-700"
                                >
                                    <AiOutlineDelete />
                                </button>
                            </div>
                        ))}
                        <div className="flex mt-1">
                            <button
                                onClick={addTimeSlot}
                                className="bg-slate-800 py-2 px-4 rounded-md text-white h-fit cursor-pointer hover:bg-slate-950 dark:bg-slate-900 dark:hover:bg-black"
                            >
                                افزودن
                            </button>
                        </div>
                    </div>
                    <div className="mb-5 space-y-1">
                        <label className="form__label">درباره من *</label>
                        <textarea
                            name="about"
                            rows={5}
                            value={formData.about}
                            onChange={handleInputChange}
                            className="form__input"
                        />
                    </div>
                    <div className="flex items-center gap-3">
                        <figure className="w-[70px] h-[70px] rounded-full border-2 border-solid border-primaryColor flex items-center justify-center">
                            <img
                                src={selectedFile ? previewURL : doctor.photo || defaultAvatar}
                                alt="Profile Avatar"
                                className="w-[66px] h-[66px] rounded-full object-cover"
                            />
                        </figure>
                        <div className="relative w-[130px] h-[50px]">
                            <input
                                type="file"
                                name="photo"
                                id="customFile"
                                // accept=".jpg, .jpeg, .png"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                            // required
                            />
                            <label
                                htmlFor="customFile"
                                className="absolute top-0 left-0 w-full h-full flex items-center px-5 py-[0.375rem] text-[15px] leading-6 overflow-hidden bg-[#0066ff46] text-headingColor font-semibold rounded-lg truncate cursor-pointer hover:bg-[#0066ff66] dark:bg-blue-500 dark:text-slate-100 dark:hover:bg-blue-600">
                                {avatarLoading ? "در حال ارسال ..." : "تصویر پروفایل"}
                            </label>
                        </div>
                    </div>
                    <div>
                        <button type="submit" className="btn w-full text-[18px]" disabled={loading && true}>
                            {loading ? <HashLoader size={17} color="#fff" /> : "به روزرسانی"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
