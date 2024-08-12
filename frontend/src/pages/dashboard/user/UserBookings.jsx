import useFetchData from "../../../hooks/useFetchData.js"
import { BASE_URL } from "../../../config"
import DoctorCard from "../../../components/doctors/DoctorCard"
import Loading from "../../../components/Loading.jsx"
import Error from "../../../components/Error.jsx"

export default function UserBookings() {
    const { data: appointments, loading, error } = useFetchData(`${BASE_URL}/users/appointments/me`)

    return (
        <div className="pt-1">
            {loading && !error && <Loading />}

            {error && !loading && <Error error={error} />}

            {!loading && !error && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5">
                    {appointments.map((doctor) => (
                        <DoctorCard doctor={doctor} key={doctor._id} />
                    ))}
                </div>
            )}

            {!loading && !error && appointments.length === 0 && (
                <h2 className="text-center leading-7 text-[20px] font-semibold text-primaryColor dark:text-blue-100">
                    هیچ وقت ملاقاتی ثبت نشده است
                </h2>
            )}
        </div>
    )
}
