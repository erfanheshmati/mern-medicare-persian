import { Link } from "react-router-dom";
import featureImg from "/images/feature-img.png"

export default function Feature() {
    return (
        <section>
            <div className="container">
                <div className="flex items-center justify-between flex-col lg:flex-row">
                    {/* Content */}
                    <div className="xl:w-[670px]">
                        <h2 className="heading">
                            از پزشک خود مشاوره بگیرید
                        </h2>
                        <ul className="pl-4 mt-6">
                            <li className="text__para">
                                ۱. درخواست ویزیت خود را ثبت کنید.
                            </li>
                            <li className="text__para">
                                ۲. پزشک مد نظر خود را انتخاب نمایید.
                            </li>
                            <li className="text__para">
                                ۳. به صورت آنلاین مشاوره بگیرید.
                            </li>
                        </ul>
                        <Link to="/">
                            <button className="btn">درخواست ویزیت</button>
                        </Link>
                    </div>
                    {/* Image */}
                    <div className="relative z-10 xl:w-[770px] flex justify-end mt-[50px] lg:mt-0">
                        <img src={featureImg} alt="" className="w-full md:w-3/4" />
                    </div>
                </div>
            </div>
        </section>
    )
}
