import { formateDate } from "../../utils/formateDate"

export default function DoctorAbout({ name, qualifications, experiences, about }) {
    return (
        <div>
            <div className="mt-8">
                <h3 className="text-[20px] text-headingColor font-semibold flex items-center gap-2 dark:text-slate-300">
                    درباره
                    <span className="text-irisBlueColor font-bold text-[20px]">
                        {name}
                    </span>
                </h3>
                <p className="text__para">
                    {about || "خالی"}
                </p>
            </div>
            <div className="mt-8">
                <h3 className="text-[20px] text-headingColor font-semibold dark:text-slate-300">
                    تحصیلات
                </h3>
                <ul className="grid sm:grid-cols-2 gap-[20px] pt-4">
                    {qualifications?.map((item, index) => (
                        <li key={index} className="p-4 rounded bg-irisBlueColor/10">
                            <div className="flex items-center justify-between">
                                <span className="text-[16px] font-medium text-textColor dark:text-slate-400">
                                    {item.degree}
                                </span>
                                <span className="text-irisBlueColor text-[14px]">
                                    {item.startingDate} - {item.endingDate}
                                </span>
                            </div>
                            <p className="text-[14px] font-medium text-textColor dark:text-slate-400">
                                {item.university}
                            </p>
                        </li>
                    ))}
                    {qualifications == 0 && (
                        <p className="text__para">خالی</p>
                    )}
                </ul>
            </div>
            <div className="mt-8">
                <h3 className="text-[20px] leading-[30px] text-headingColor font-semibold dark:text-slate-300">
                    تجربیات
                </h3>
                <ul className="grid sm:grid-cols-2 gap-[20px] pt-4">
                    {experiences?.map((item, index) => (
                        <li key={index} className="p-4 rounded bg-[#fff9ea]">
                            <div className="flex items-center justify-between">
                                <p className="text-[16px] leading-5 font-medium text-textColor">
                                    {item.position}
                                </p>
                                <span className="text-yellowColor text-[14px] leading-6">
                                    {formateDate(item.startingDate)} - {formateDate(item.endingDate)}
                                </span>
                            </div>
                            <p className="text-[14px] leading-5 font-medium text-textColor">
                                {item.hospital}
                            </p>
                        </li>
                    ))}
                    {experiences == 0 && (
                        <p className="text__para">خالی</p>
                    )}
                </ul>
            </div>
        </div>
    )
}
