import DoctorList from "./DoctorList";
import { BASE_URL } from "../../config.js"
import useFetchData from "../../hooks/useFetchData.js"
import Loading from "../Loading.jsx"
import Error from "../Error.jsx"

export default function Doctors() {

    const { data: doctors, loading, error } = useFetchData(`${BASE_URL}/doctors`)

    return (
        <section>
            <div className="container">
                <div className="xl:w-[470px] mx-auto">
                    <h2 className="heading text-center">
                        برترین پزشکان متخصص
                    </h2>
                    <p className="text__para text-center">
                        از این طریق در سریع‌ترین زمان ممکن پزشک مدنظر خود را دیدار کرده و بیماری خود را درمان کنید.                    </p>
                </div>

                {loading && !error && <Loading />}

                {error && !loading && <Error error={error} />}

                {!loading && !error && <DoctorList doctors={doctors} />}
            </div>
        </section>
    )
}
