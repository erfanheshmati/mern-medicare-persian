// import { BsArrowRight } from "react-icons/bs"
import starIcon from "/images/Star.png"
import { Link } from "react-router-dom"

export default function DoctorCard({ doctor }) {

    const { _id, name, averageRating, totalRating, photo, specialization, experiences } = doctor

    return (
        <Link to={`/docs/${_id}`}>
            <div className="border rounded-md shadow hover:cursor-pointer hover:shadow-2xl transition-all ease-in-out dark:border-slate-600">
                <div>
                    <img src={photo} alt="" className="w-full h-[220px] object-cover rounded-t-md" />
                </div>
                <div className="px-4 pb-4 mt-2">
                    <h2 className="text-[20px] leading-[30px] lg:text-[22px] lg:leading-9 text-headingColor font-[700] dark:text-slate-300">
                        {name}
                    </h2>
                    <div className="mt-2 flex items-center justify-between">
                        <span className="bg-[#ccf0f3] text-irisBlueColor px-3 py-2 lg:py-0 text-[14px] leading-4 lg:leading-7 font-semibold rounded">
                            {specialization?.charAt(0).toUpperCase() + specialization?.slice(1) || "Empty"}
                        </span>
                        <div className="flex items-center gap-[6px]">
                            <span className="flex items-center gap-[6px] text-[14px] leading-6 lg:text-[16px] lg:leading-7 font-semibold text-headingColor dark:text-slate-400">
                                <img src={starIcon} alt="" /> {averageRating?.toFixed(1)}
                            </span>
                            <span className="text-[14px] leading-6 lg:text-[16px] lg:leading-7 font-semibold text-textColor dark:text-slate-400">
                                ({totalRating})
                            </span>
                        </div>
                    </div>
                    <div className="mt-[18px] lg:mt-5 flex items-center justify-between">
                        <div>
                            {/* <h3 className="text-[16px] leading-7 lg:text-[18px] lg:leading-[30px] font-semibold text-headingColor">
                        +{totalPatients} patients
                    </h3> */}
                            <p className="text-[14px] leading-3 font-[400] text-textColor px-1 dark:text-slate-400">
                                {experiences && experiences[0]?.hospital}
                            </p>
                        </div>
                        {/* <Link
                        to={`/docs/${_id}`}
                        className="w-[44px] h-[44px] rounded-full border border-solid border-[#181a1e] flex items-center justify-center group hover:bg-primaryColor hover:border-none"
                    >
                        <BsArrowRight className="group-hover:text-white w-6 h-5" />
                    </Link> */}
                    </div>
                </div>
            </div>
        </Link>
    )
}
