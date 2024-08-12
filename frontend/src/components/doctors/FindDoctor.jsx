import DoctorCard from "./DoctorCard"
import Testimonial from "../Testimonial"
import { BASE_URL } from "../../config.js"
import useFetchData from "../../hooks/useFetchData.js"
import Loading from "../Loading.jsx"
import Error from "../Error.jsx"
import { useEffect, useState } from "react"
import { Pagination } from "flowbite-react"
import { ImSearch } from "react-icons/im"

export default function FindDoctor() {
    const [query, setQuery] = useState("")
    const [debounceQuery, setDebounceQuery] = useState("")

    const [currentPage, setCurrentPage] = useState(1);
    const doctorsPerPage = 10;

    const { data: doctors, loading, error } = useFetchData(`${BASE_URL}/doctors?query=${debounceQuery}`)

    // Handle search
    const handleSearch = () => {
        setQuery(query.trim())
    }

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebounceQuery(query)
        }, 700)
        return () => clearTimeout(timeout)
    }, [query])

    // Calculate the total number of pages
    const totalPages = Math.ceil(doctors.length / doctorsPerPage);

    // Get current page doctors
    const indexOfLastDoctor = currentPage * doctorsPerPage;
    const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
    const currentDoctors = doctors.slice(indexOfFirstDoctor, indexOfLastDoctor);

    // Handle page change
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <>
            <section className="pb-10">
                <div className="container text-center">
                    <h2 className="heading">
                        جستجوی پزشک
                    </h2>
                    <div className="max-w-[570px] mt-[30px] mx-auto bg-[#0066ff2c] rounded-lg flex items-center justify-between">
                        <input
                            type="search"
                            placeholder="جستجو بر اساس نام یا تخصص ..."
                            value={query}
                            onChange={e => setQuery(e.target.value)}
                            className="py-4 pl-4 pr-2 bg-transparent w-full rounded-r-lg focus:outline-none placeholder:text-textColor dark:bg-blue-300/50 dark:placeholder:text-slate-300 dark:text-slate-100"
                        />
                        <button
                            onClick={handleSearch}
                            className="btn mt-0 rounded-[0px] rounded-l-lg h-14"
                        >
                            <ImSearch size={22} />
                        </button>
                    </div>
                </div>
            </section>

            <section className="pt-5 pb-16">
                {loading && !error && <Loading />}
                {error && !loading && <Error error={error} />}
                {!error && !loading && (
                    <div className="container">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 lg:gap-[30px]">
                            {currentDoctors.map((doctor) => (
                                <DoctorCard key={doctor._id} doctor={doctor} />
                            ))}
                        </div>
                        <div className="flex overflow-x-auto justify-center mt-8 pagination">
                            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} previousLabel="قبلی" nextLabel="بعدی" />
                        </div>
                    </div>
                )}
            </section>

            <Testimonial />
        </>
    )
}
