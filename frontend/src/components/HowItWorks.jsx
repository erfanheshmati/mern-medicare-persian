import icon1 from "/images/icon01.png"
import icon2 from "/images/icon02.png"
import icon3 from "/images/icon03.png"

export default function HowItWorks() {
    return (
        <section>
            <div className="container">
                <div className="lg:w-[470px] mx-auto">
                    <h2 className="heading text-center">
                        بهترین خدمات درمانی
                    </h2>
                    <p className="text__para text-center">
                        همکاران ما قصد دارند مطالب بسیار مفیدی را در این حوزه و همچنین انواع خدمات پزشکی برای افزایش سطح اطلاعات و آگاهی شما ارائه دهند.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]">
                    <div className="py-[30px] px-5">
                        <div className="flex items-center justify-center">
                            <img src={icon1} alt="" />
                        </div>
                        <div className="mt-[30px]">
                            <h2 className="text-[26px] leading-9 text-headingColor font-[700] text-center dark:text-slate-300">
                                یافتن نزدیک ترین پزشک
                            </h2>
                            <p className="text-[16px] leading-7 text-headingColor font-[400px] mt-4 text-center dark:text-slate-400">
                                از این طریق در سریع‌ترین زمان ممکن پزشک مدنظر خود را دیدار کرده و بیماری خود را درمان کنید.
                            </p>
                        </div>
                    </div>
                    <div className="py-[30px] px-5">
                        <div className="flex items-center justify-center">
                            <img src={icon2} alt="" />
                        </div>
                        <div className="mt-[30px]">
                            <h2 className="text-[26px] leading-9 text-headingColor font-[700] text-center dark:text-slate-300">
                                کلینیک های تخصصی
                            </h2>
                            <p className="text-[16px] leading-7 text-headingColor font-[400px] mt-4 text-center dark:text-slate-400">
                                این کلینیک ها برای تشخیص و درمان بیماران تاسیس شده اند همچنین از امکانات بهداشتی بسیار مناسبی برخوردار می باشند.
                            </p>
                        </div>
                    </div>
                    <div className="py-[30px] px-5">
                        <div className="flex items-center justify-center">
                            <img src={icon3} alt="" />
                        </div>
                        <div className="mt-[30px]">
                            <h2 className="text-[26px] leading-9 text-headingColor font-[700] text-center dark:text-slate-300">
                                نوبت دهی آنلاین
                            </h2>
                            <p className="text-[16px] leading-7 text-headingColor font-[400px] mt-4 text-center dark:text-slate-400">
                                ارائه ساده‌ترین و کاربردی‌ترین سیستم جستجو، معرفی و تماس جهت رزرو وقت ملاقات پزشکان، بیمارستانها و سایر مراکز درمانی.
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    )
}
