import { Link } from "react-router-dom"
import pageNotFound from "/images/404.svg"

export default function PageNotFound() {
    return (
        <section className="h-screen-mobile md:h-screen-desktop flex flex-col justify-center">
            <div className="flex flex-col items-center justify-center px-4">
                <img src={pageNotFound} alt="" className="w-[90%] md:w-[75%] lg:w-[55%] xl:w-[40%]" />
                <h1 className="mt-8 font-[800] text-[35px] md:text-[50px] text-primaryColor/80 text-center dark:text-blue-500">
                    چنین صفحه ای یافت نشد!
                </h1>
                <p className="mt-4 text-textColor text-lg text-center dark:text-slate-400">
                    صفحه ای که به دنبال آن هستید، وجود ندارد.
                </p>
                <button className="btn 2xl:mt-14">
                    <Link to="/home">صفحه اصلی</Link>
                </button>
            </div>
        </section>
    )
}
