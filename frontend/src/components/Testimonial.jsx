import { Pagination, Autoplay } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/pagination"

import defaultAvatar from "/images/default-avatar.jpg"
import { HiStar } from "react-icons/hi"
import useFetchData from "../hooks/useFetchData"
import { BASE_URL } from "../config"
import { formateDate } from "../utils/formateDate"

export default function Testimonial() {
    const { data: testimonials, loading, error } = useFetchData(`${BASE_URL}/reviews`)

    // Get the last 5 testimonials
    const lastFiveTestimonials = testimonials.slice(-10);

    return (
        <section>
            <div className="container">
                <div className="xl:w-[470px] mx-auto">
                    <h2 className="heading text-center mt-10">
                        رضایت مراجعه کنندگان
                    </h2>
                </div>
                <div>
                    <Swiper
                        modules={[Pagination, Autoplay]}
                        spaceBetween={30}
                        slidesPerView={1}
                        loop={true}
                        pagination={{ clickable: true }}
                        autoplay={{
                            delay: 2500,
                            disableOnInteraction: false,
                        }}
                        breakpoints={{
                            640: {
                                slidesPerView: 1,
                                spaceBetween: 0
                            },
                            768: {
                                slidesPerView: 2,
                                spaceBetween: 20
                            },
                            1024: {
                                slidesPerView: 3,
                                spaceBetween: 30
                            }
                        }}
                    >
                        {lastFiveTestimonials.map((testimonial) => (
                            <SwiperSlide key={testimonial._id}>
                                <div className="px-5 py-[20px] hover:cursor-pointer">
                                    <div className="flex items-center gap-[13px]">
                                        <figure>
                                            <img src={testimonial?.user?.photo || defaultAvatar} alt="" className="w-12 h-12 rounded-full object-cover" />
                                        </figure>
                                        <div className="flex flex-col w-full">
                                            <div className="flex items-center justify-between">
                                                <h4 className="text-[18px] leading-[30px] font-semibold text-headingColor dark:text-slate-300">
                                                    {testimonial?.user?.name}
                                                </h4>
                                                <div className="flex items-center">
                                                    {[...Array(testimonial?.rating)].map((_, index) => (
                                                        <HiStar key={index} className="text-yellowColor w-4 h-4" />
                                                    ))}
                                                </div>
                                            </div>
                                            <h4 className="text-xs font-[300] dark:text-slate-400">
                                                {formateDate(testimonial?.createdAt)}
                                            </h4>
                                        </div>
                                    </div>
                                    <p className="text-[16px] leading-6 mt-4 text-textColor font-[400] dark:text-slate-300">
                                        "{testimonial?.reviewText}"
                                    </p>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </section>
    )
}
