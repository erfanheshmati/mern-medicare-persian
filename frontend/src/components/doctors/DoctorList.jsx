import { useState } from "react"
import DoctorCard from "./DoctorCard"
import { Pagination } from "flowbite-react"

export default function DoctorList({ doctors }) {
    const [currentPage, setCurrentPage] = useState(1);
    const doctorsPerPage = 10;

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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]">
                {currentDoctors.map((doctor) =>
                    <DoctorCard key={doctor._id} doctor={doctor} />
                )}
            </div>
            <div className="flex overflow-x-auto justify-center mt-8 pagination">
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} previousLabel="قبلی" nextLabel="بعدی" />
            </div>
        </>
    )
}
