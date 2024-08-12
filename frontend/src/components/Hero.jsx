import { Link } from "react-router-dom"
import heroImg1 from "/images/hero-img01.png"
import heroImg2 from "/images/hero-img02.png"
import heroImg3 from "/images/hero-img03.png"

export default function Hero() {
    return (
        <section className="hero__section pt-[20px] md:pt-[40px] 2xl:pt-[60px] 2xl:h-[800px]">
            <div className="container">
                <div className="flex flex-col-reverse lg:flex-row gap-[50px] items-center justify-between">
                    {/* ===== Content ===== */}
                    <div>
                        <div className="lg:w-[570px]">
                            <h1 className="text-[36px] leading-[46px] text-headingColor font-[800] md:text-[60px] md:leading-[80px] dark:text-slate-300">
                                مراقبت های نوآورانه
                                <br />
                                برای آینده ای سالم تر
                            </h1>
                            <p className="text__para md:mt-6 dark:text-slate-400 text-justify">
                                این سامانه ساده‌ترین راه نوبت‌ دهی اینترنتی و مشاوره آنلاین پزشکان است. پزشکان از این طریق می‌توانند امکان نوبت دهی اینترنتی و مشاوره تلفنی خود را فعال کنند. به این ترتیب بیمار برای نوبت گیری از دکتر نیاز به روش‌های سنتی مثل تلفن زدن یا مراجعه حضوری ندارد. برای گرفتن نوبت ویزیت حضوری یا تلفنی از بهترین پزشکان ایران کافی است به وب سایت ما مراجعه کنید و از لیست پزشکان متخصص و فوق تخصص در زمان مورد نظر خود نوبت ویزیت بگیرید.
                            </p>
                            <Link to="/docs">
                                <button className="btn">
                                    درخواست ویزیت
                                </button>
                            </Link>
                        </div>
                        {/* ===== Counter ===== */}
                        <div className="mt-[30px] lg:mt-[50px] flex flex-col lg:flex-row lg:items-center gap-5 lg:gap-[30px]">
                            <div>
                                <h2 className="text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[700] text-headingColor dark:text-slate-300">
                                    ۱۵+
                                </h2>
                                <span className="w-[80px] h-2 bg-purpleColor rounded-full block mt-[-14px]"></span>
                                <p className="text__para">کلینیک درمانی</p>
                            </div>
                            <div>
                                <h2 className="text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[700] text-headingColor dark:text-slate-300">
                                    ۳۰+
                                </h2>
                                <span className="w-[100px] h-2 bg-yellowColor rounded-full block mt-[-14px]"></span>
                                <p className="text__para">سال تجربه موفق</p>
                            </div>
                            <div>
                                <h2 className="text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[700] text-headingColor dark:text-slate-300">
                                    ٪۱۰۰
                                </h2>
                                <span className="w-[120px] h-2 bg-irisBlueColor rounded-full block mt-[-14px]"></span>
                                <p className="text__para">رضایت مراجعه کننده</p>
                            </div>
                        </div>
                    </div>
                    {/* ===== Image ===== */}
                    <div className="flex gap-[30px] justify-end">
                        <div className="mt-12">
                            <img src={heroImg1} alt="" className="w-full" />
                        </div>
                        <div className="mt-7">
                            <img src={heroImg2} alt="" className="w-full mb-[30px]" />
                            <img src={heroImg3} alt="" className="w-full" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
