import aboutImg from "/images/about.png"
import { Link } from "react-router-dom"

export default function About() {
    return (
        <section>
            <div className="container">
                <div className="flex items-center justify-between gap-[50px] lg:gap-[130px] xl:gap-0 flex-col lg:flex-row">
                    {/* Image */}
                    <div className="relative w-full lg:w-1/2 xl:w-[770px] z-10 order-2 lg:order-1">
                        <img src={aboutImg} alt="" />
                    </div>
                    {/* Content */}
                    <div className="w-full lg:w-1/2 xl:w-[670px] order-1 lg:order-2">
                        <h2 className="heading">
                            در مسیر سلامتی گام بردارید!
                        </h2>
                        <p className="text__para mt-6 text-justify">
                            در زندگی پر مشغله امروز اکثر ما زمان زیادی برای رسیدگی به سلامتی و سبک زندگی سالم نداریم
                            حتی وقتی بیمار میشویم باید ساعت ها برای پیدا کردن دکتر مناسب و نوبت گیری زمان صرف کنیم
                            این وب سایت برای شما امکانی فراهم میکند که به خدمات پزشکی در کمترین زمان دسترسی داشته باشید.
                            خدماتی که در این سامانه ارائه می شود عبارتند از: صدور نسخه الکترونیکی و نوبت دهی پزشکی.
                        </p>
                        <Link to="/">
                            <button className="btn mt-8">مطالعه بیشتر</button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}
