import { useState } from "react"
import starIcon from "/images/Star.png"
import DoctorAbout from "./DoctorAbout"
import DoctorFeedback from "./DoctorFeedback"
import SidePanel from "./SidePanel"
import useFetchData from "../../hooks/useFetchData"
import { BASE_URL } from "../../config"
import { useParams } from "react-router-dom"
import Loading from "../Loading"
import Error from "../Error"

export default function DoctorDetails() {

    const [tab, setTab] = useState("about")

    const { id } = useParams()

    const { data: doctor, loading, error } = useFetchData(`${BASE_URL}/doctors/${id}`)

    const { name, bio, about, qualifications, experiences, timeSlots, reviews, averageRating, totalRating, specialization, ticketPrice, photo } = doctor

    return (
        <section className="min-h-screen">
            <div className="max-w-[1170px] px-4 mx-auto">
                {loading && !error && <Loading />}

                {error && !loading && <Error error={error} />}

                {!error && !loading && (
                    <div className="grid md:grid-cols-3 gap-[50px]">
                        <div className="md:col-span-2">
                            <div className="flex items-center gap-5">
                                <figure>
                                    <img src={photo} alt="" className="rounded max-w-[150px] max-h-[180px] md:h-[200px] object-cover" />
                                </figure>
                                <div className="flex flex-col gap-2">
                                    <span className="bg-[#ccf0f3] text-irisBlueColor max-w-fit py-2 px-4 text-[13px] leading-5 lg:text-[16px] lg:leading-6 font-semibold rounded text-center">
                                        {specialization}
                                    </span>
                                    <h3 className="text-headingColor text-[20px] leading-7 mt-3 font-bold dark:text-slate-300">
                                        {name}
                                    </h3>
                                    <div className="flex items-center gap-[6px]">
                                        <span className="flex items-center gap-[6px] text-[14px] leading-5 lg:text-[16px] lg:leading-7 font-semibold text-headingColor dark:text-slate-400">
                                            <img src={starIcon} alt="" width={18} className="-mt-2" />
                                            {averageRating?.toFixed(1)}
                                        </span>
                                        <span className="text-[14px] leading-5 lg:text-[16px] lg:leading-7 font-[400] text-textColor dark:text-slate-400">
                                            ({totalRating})
                                        </span>
                                    </div>
                                    <p className="text__para text-[14px] leading-6 md:text-[15px] lg:max-w-[390px]">
                                        {bio}
                                    </p>
                                </div>
                            </div>
                            <div className="mt-[20px] md:mt-[40px] border-b border-solid border-[#0066ff34] dark:border-slate-600">
                                <button
                                    className={`${tab === "about" && "border-b-2 border-solid border-primaryColor"} py-2 px-5 text-[16px] leading-7 text-headingColor font-semibold dark:text-slate-300`}
                                    onClick={() => setTab("about")}
                                >
                                    جزییات
                                </button>
                                <button
                                    className={`${tab === "feedback" && "border-b-2 border-solid border-primaryColor"} py-2 px-5 text-[16px] leading-7 text-headingColor font-semibold dark:text-slate-300`}
                                    onClick={() => setTab("feedback")}
                                >
                                    نظرات
                                </button>
                            </div>
                            <div className="mt-[30px]">
                                {tab === "about" && <DoctorAbout name={name} about={about} qualifications={qualifications} experiences={experiences} />}
                                {tab === "feedback" && <DoctorFeedback reviews={reviews} totalRating={totalRating} />}
                            </div>
                        </div>
                        <div>
                            <SidePanel doctorId={doctor._id} ticketPrice={ticketPrice} timeSlots={timeSlots} />
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}
