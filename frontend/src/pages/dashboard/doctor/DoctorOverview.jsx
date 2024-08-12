import defaultAvatar from "/images/default-avatar.jpg"
import starIcon from "/images/Star.png"
import DoctorAbout from "../../../components/doctors/DoctorAbout"
import { useContext } from "react"
import { AuthContext } from "../../../context/AuthContext"

export default function DoctorOverview() {
    const { user: doctor } = useContext(AuthContext)
    return (
        <>
            <div className="flex items-center gap-4">
                <div>
                    <figure className="w-[140px] md:w-[160px]">
                        <img src={doctor?.photo || defaultAvatar} alt="" className="w-full rounded-lg" />
                    </figure>
                </div>
                <div className="flex flex-col md:gap-1">
                    <span className="max-w-fit bg-[#ccf0f3] text-irisBlueColor py-2 px-4 rounded text-[14px] leading-4 lg:text-[16px] lg:leading-6 font-semibold">
                        {doctor?.specialization?.charAt(0).toUpperCase() + doctor?.specialization?.slice(1) || "Empty"}
                    </span>
                    <h3 className="text-[22px] leading-9 font-bold text-headingColor mt-3 dark:text-slate-300">
                        {doctor?.name}
                    </h3>
                    <div className="flex items-center gap-[6px]">
                        <span className="flex items-center gap-[6px] text-headingColor text-[14px] leading-5 lg:text-[16px] lg:leading-6 font-semibold dark:text-slate-400">
                            <img src={starIcon} alt="" className="-mt-2" />
                            {doctor?.averageRating?.toFixed(1)}
                        </span>
                        <span className="text-textColor text-[14px] leading-5 lg:text-[16px] lg:leading-6 font-semibold dark:text-slate-400">
                            ({doctor?.totalRating})
                        </span>
                    </div>
                    <p className="text__para font-[15px] lg:max-w-[390px] leading-6">
                        {doctor?.bio}
                    </p>
                </div>
            </div>
            <DoctorAbout
                name={doctor.name}
                qualifications={doctor.qualifications}
                experiences={doctor.experiences}
                about={doctor.about}
            />
        </>
    )
}
