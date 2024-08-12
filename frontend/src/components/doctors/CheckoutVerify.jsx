import { useEffect } from "react"
import { Link } from "react-router-dom"
import { useSearchParams } from 'react-router-dom'
import CountdownTimer from "../CountdownTimer"
import { BASE_URL, token } from "../../config"

export default function CheckoutVerify() {
    const [queryString] = useSearchParams()

    const doctorId = queryString.get('DoctorId');
    const userId = queryString.get('UserId');
    const amount = queryString.get('Amount');
    const appointmentParam = queryString.get('Appointment');
    const appointment = JSON.parse(decodeURIComponent(appointmentParam))
    const authority = queryString.get('Authority');
    const status = queryString.get('Status');

    useEffect(() => {
        const verifyPayment = async () => {
            const res = await fetch(`${BASE_URL}/bookings/checkout-verify`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ doctorId, userId, amount, appointment, authority, status })
            })
            const data = await res.json()
        }
        verifyPayment()
        // setTimeout(() => { window.location.href = "http://localhost:5173/home" }, 10000)
    }, [])

    return (
        <section className="min-h-screen">
            <div>
                <div className="text-center">
                    {status === "OK" && (
                        <h3 className="md:text-2xl text-base text-green-500 font-semibold text-center">
                            درخواست شما با موفقیت ثبت شد
                        </h3>
                    )}
                    {status === "NOK" && (
                        <h3 className="md:text-2xl text-base text-red-500 font-semibold text-center">
                            درخواست شما با خطا مواجه شد
                        </h3>
                    )}
                    <div className="py-10 text-center">
                        <Link
                            to="/home"
                            className="btn"
                        >
                            بازگشت به صفحه اصلی (<CountdownTimer initialSeconds={10} />)
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}
