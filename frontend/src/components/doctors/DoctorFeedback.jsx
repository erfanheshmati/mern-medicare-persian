import { useState } from "react"
import avatar from "/images/avatar-icon.png"
import { formateDate } from "../../utils/formateDate"
import { AiFillStar } from "react-icons/ai"
import FeedbackForm from "./FeedbackForm"

export default function DoctorFeedback({ totalRating, reviews }) {

    const [showFeedbackForm, setShowFeedbackForm] = useState(false)

    return (
        <div className="px-5">
            <div className="mb-[10px]">
                <h4 className="text-[18px] leading-[30px] font-bold text-headingColor dark:text-slate-300">
                    همه نظرات ({totalRating})
                </h4>
                {reviews?.map((review, index) => (
                    <div key={index} className="flex justify-between gap-10 my-[20px]">
                        <div className="flex gap-4">
                            <figure className="w-12 md:w-14">
                                <img src={review?.user?.photo || avatar} alt="" className="w-full rounded-full object-cover" />
                            </figure>
                            <div>
                                <h5 className="text-[16px] leading-6 text-pretty font-bold dark:text-slate-300">
                                    {review?.user?.name}
                                </h5>
                                <p className="text-[14px] leading-6 text-textColor dark:text-slate-400">
                                    {formateDate(review?.createdAt)}
                                </p>
                                <p className="text__para mt-1 font-medium text-[15px]">
                                    "{review?.reviewText}"
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-1">
                            {[...Array(review?.rating).keys()].map((_, index) => <AiFillStar keys={index} color="orange" />)}
                        </div>
                    </div>
                ))}
            </div>
            {!showFeedbackForm && (
                <button className="btn" onClick={() => setShowFeedbackForm(true)}>
                    ثبت نظر
                </button>
            )}
            {showFeedbackForm && <FeedbackForm />}
        </div>
    )
}
