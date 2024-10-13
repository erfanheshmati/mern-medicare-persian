/* eslint-disable react/prop-types */
import { convertTime } from "../../utils/convertTime"
import { BASE_URL, token } from "../../config.js"
import { toast } from "react-toastify"
import { useContext, useState } from "react"
import { AuthContext } from "../../context/AuthContext"

export default function SidePanel({ doctorId, ticketPrice, timeSlots }) {
    const [loading, setLoading] = useState(false)
    const [selectedSlotIndex, setSelectedSlotIndex] = useState(null)

    const { user } = useContext(AuthContext)

    const handleSlotChange = (event) => {
        setSelectedSlotIndex(Number(event.target.value))
    }

    const bookingHandler = async () => {
        if (selectedSlotIndex === null) {
            return toast.error("برای رزرو نوبت، روز و ساعت را مشخص کنید.")
        }
        setLoading(true)
        try {
            const res = await fetch(`${BASE_URL}/bookings/checkout-request/${doctorId}/${user._id}`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ timeSlotIndex: selectedSlotIndex })
            })
            const data = await res.json()
            if (!res.ok) throw new Error(data.message)
            if (data.url) window.location.href = data.url
        } catch (error) {
            toast.error(error.message)
            setLoading(false)
        }
    }

    return (
        <div className="p-4 lg:p-5 rounded-md shadow-2xl dark:bg-slate-600">
            <div>
                <p className="text__para font-semibold text-headingColor dark:text-slate-300">
                    زمان نوبت دهی:
                </p>
                <ul className="mt-3">
                    {timeSlots?.map((item, index) => (
                        <li key={index} className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="timeSlot"
                                    value={index}
                                    onChange={handleSlotChange}
                                    checked={selectedSlotIndex === index}
                                    className="cursor-pointer size-4"
                                />
                                <span className="text-[15px] leading-6 text-textColor font-semibold dark:text-slate-400">
                                    {item.day}
                                </span>
                            </div>
                            <div>
                                <span className="text-[15px] leading-6 text-textColor font-semibold dark:text-slate-400">
                                    {convertTime(item.startingTime)} - {convertTime(item.endingTime)}
                                </span>
                            </div>
                        </li>
                    ))}
                    {timeSlots?.length === 0 && (
                        <p className="text__para text-[16px]">موردی برای نمایش وجود ندارد.</p>
                    )}
                </ul>
            </div>
            <div className="flex items-center justify-between mt-4">
                <p className="text__para mt-0 font-semibold text-headingColor dark:text-slate-300">
                    هزینه ویزیت:
                </p>
                {ticketPrice && (
                    <span className="text-[18px] mt-3 md:mt-0 lg:text-[20px] lg:leading-8 text-textColor font-bold dark:text-slate-400">
                        {ticketPrice} هزار تومان
                    </span>
                )}
            </div>
            <button
                className="btn w-full"
                disabled={loading && true}
                onClick={bookingHandler}
            >
                {loading ? "انتقال به درگاه پرداخت..." : "درخواست رزرو"}
            </button>
        </div>
    )
}
