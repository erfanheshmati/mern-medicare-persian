import { formateDate } from "../../../utils/formateDate"
import defaultAvatar from "/images/default-avatar.jpg"

export default function DoctorAppointments({ appointments }) {
    return (
        <div className="overflow-x-scroll md:overflow-x-visible pt-2">
            {appointments.length !== 0 && (
                <table className="w-full text-right text-sm text-slate-600">
                    <thead className="text-sm text-gray-800 bg-gray-200 dark:bg-slate-500">
                        <tr>
                            <th scope="col" className="px-4 py-3">
                                مراجعه کننده
                            </th>
                            <th scope="col" className="px-4 py-3">
                                جنسیت
                            </th>
                            <th scope="col" className="px-4 py-3">
                                وضعیت پرداختی
                            </th>
                            <th scope="col" className="px-4 py-3">
                                مبلغ (هزار تومان)
                            </th>
                            <th scope="col" className="px-4 py-3">
                                تاریخ رزرو
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments?.map((item) => (
                            <tr key={item._id}>
                                <th scope="row" className="flex items-center px-4 py-3 text-gray-900 whitespace-nowrap">
                                    <div className="flex items-center gap-2">
                                        <figure>
                                            <img src={item.user?.photo || defaultAvatar} alt="" className="w-8 h-8 rounded-full" />
                                        </figure>
                                        <div>
                                            {item.user.name}
                                        </div>
                                    </div>
                                </th>
                                <td className="px-4 py-3">
                                    {item.user.gender == "male" ? "مرد" : "زن"}
                                </td>
                                <td className="px-4 py-3">
                                    {item.isPaid && (
                                        <div className="flex items-center">
                                            <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2">Paid</div>
                                        </div>
                                    )}
                                    {!item.isPaid && (
                                        <div className="flex items-center">
                                            <div className="h-2.5 w-2.5 rounded-full bg-red-500 mr-2">Unpaid</div>
                                        </div>
                                    )}
                                </td>
                                <td className="px-4 py-3">
                                    {item.ticketPrice}
                                </td>
                                <td className="px-4 py-3">
                                    {formateDate(item.createdAt)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            
            {appointments.length === 0 && (
                <h2 className="mt-2 md:mt-0 text-center leading-7 text-[20px] font-semibold text-primaryColor dark:text-blue-100">
                    هیچ ویزیتی ثبت نشده است
                </h2>
            )}
        </div>
    )
}
