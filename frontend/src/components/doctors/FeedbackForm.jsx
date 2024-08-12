import { useState } from 'react'
import { AiFillStar } from 'react-icons/ai'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { BASE_URL, token } from '../../config'
import { HashLoader } from 'react-spinners'

export default function FeedbackForm() {
    const [rating, setRating] = useState(0)
    const [hover, setHover] = useState(0)

    const [reviewText, setReviewText] = useState("")
    const [loading, setLoading] = useState(false)

    const { id } = useParams()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            if (!rating || !reviewText) {
                setLoading(false)
                return toast.error("فیلدهای ستاره دار الزامی هستند")
            }
            const res = await fetch(`${BASE_URL}/doctors/${id}/reviews`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ rating, reviewText })
            })
            const result = await res.json()
            if (!res.ok) {
                throw new Error(result.message)
            }
            setLoading(false)
            toast.success(result.message)
        } catch (error) {
            setLoading(false)
            toast.error("ابتدا وارد شوید")
        }
    }

    return (
        <form className='mt-4'>
            <h3 className='text-headingColor text-[16px] leading-6 font-semibold mb-4 mt-0 dark:text-slate-300'>
                <span className='text-red-500'>*</span> به پزشک خود چه امتیازی می دهید؟
            </h3>
            <div>
                {[...Array(5).keys()].map((_, index) => {
                    index + 1
                    // index += 1
                    return (
                        <button
                            type='button'
                            key={index}
                            onClick={() => setRating(index)}
                            onMouseEnter={() => setHover(index)}
                            onMouseLeave={() => setHover(rating)}
                            onDoubleClick={() => { setHover(0); setRating(0) }}
                            className={`${index <= ((rating && hover) || hover) ? "text-yellowColor" : "text-gray-400"} bg-transparent border-none outline-none text-[22px] cursor-pointer`}
                        >
                            <AiFillStar />
                        </button>
                    )
                })}
            </div>
            <div className='mt-[20px]'>
                <h3 className='text-headingColor text-[16px] leading-6 font-semibold mb-4 mt-0 dark:text-slate-300'>
                    <span className='text-red-500'>*</span> نظر خود را بنویسید
                </h3>
                <textarea
                    rows={5}
                    className='border border-solid border-[#0066ff34] focus:outline outline-primaryColor w-full px-4 py-3 rounded-md dark:bg-slate-500 dark:text-slate-200 dark:placeholder:text-slate-200'
                    onChange={(e) => setReviewText(e.target.value)}
                    required
                />
            </div>
            <button type='submit' className='btn' onClick={handleSubmit}>
                {loading ? <HashLoader size={17} color="#fff" /> : "ارسال"}
            </button>
        </form >
    )
}
