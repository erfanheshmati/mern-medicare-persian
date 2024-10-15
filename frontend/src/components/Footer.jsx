import { Link } from "react-router-dom"
import logo from "/images/logo.png"
import { RiLinkedinFill } from "react-icons/ri"
import { AiFillYoutube, AiFillGithub, AiOutlineInstagram } from "react-icons/ai"

const socialLinks = [
    { path: "/", icon: <AiFillYoutube className="group-hover:text-white w-4 h-5" /> },
    { path: "/", icon: <AiFillGithub className="group-hover:text-white w-4 h-5" /> },
    { path: "/", icon: <AiOutlineInstagram className="group-hover:text-white w-4 h-5" /> },
    { path: "/", icon: <RiLinkedinFill className="group-hover:text-white w-4 h-5" /> },
]

const quickLinks1 = [
    { path: "/home", display: "خانه" },
    { path: "/", display: "درباره ما" },
    { path: "/services", display: "سرویس ها" },
    { path: "/", display: "بلاگ" },
]

const quickLinks2 = [
    { path: "/doctors", display: "نزدیک ترین پزشک" },
    { path: "/", display: "درخواست ویزیت" },
    { path: "/", display: "یافتن مکان" },
    { path: "/", display: "نظرسنجی" },
]

const quickLinks3 = [
    { path: "/", display: "خیریه" },
    { path: "/contact", display: "تماس با ما" },
]

export default function Footer() {
    // const year = new Date().getFullYear()

    return (
        <footer className="py-16 footer">
            <div className="container">
                <div className="flex justify-between flex-col md:flex-row flex-wrap gap-[30px]">

                    <div>
                        <img src={logo} alt="" className="w-14 md:w-16" />
                        <p className="text-[14px] md:text-[16px] leading-7 font-[400] text-textColor mt-4 dark:text-slate-400">
                            طراحی و توسعه توسط&nbsp;
                            <Link to="https://erfanweb.vercel.app/" className="underline text-blue-500 hover:text-blue-700 dark:hover:text-blue-300">عرفان حشمتی</Link>
                        </p>
                        <div className="flex items-center gap-3 mt-4">
                            {socialLinks.map((link, index) => (
                                <Link
                                    to={link.path}
                                    key={index}
                                    className="w-9 h-9 border border-solid border-[#181a1e] rounded-full flex items-center justify-center hover:bg-primaryColor hover:border-none hover:text-white dark:text-slate-300 dark:border-slate-300 dark:hover:text-slate-50 dark:hover:bg-blue-500"
                                >
                                    {link.icon}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h2 className="text-[20px] leading-[30px] font-[700] mb-6 text-headingColor dark:text-slate-300">
                            صفحات
                        </h2>
                        <ul>
                            {quickLinks1.map((item, index) => (
                                <li key={index} className="mb-4">
                                    <Link to={item.path} className="text-[16px] leading-7 font-[400] text-textColor hover:text-primaryColor dark:text-slate-400 dark:hover:text-blue-400">
                                        {item.display}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-[20px] leading-[30px] font-[700] mb-6 text-headingColor dark:text-slate-300">
                            خدمات
                        </h2>
                        <ul>
                            {quickLinks2.map((item, index) => (
                                <li key={index} className="mb-4">
                                    <Link to={item.path} className="text-[16px] leading-7 font-[400] text-textColor hover:text-primaryColor dark:text-slate-400 dark:hover:text-blue-400">
                                        {item.display}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-[20px] leading-[30px] font-[700] mb-6 text-headingColor dark:text-slate-300">
                            حمایت
                        </h2>
                        <ul>
                            {quickLinks3.map((item, index) => (
                                <li key={index} className="mb-4">
                                    <Link to={item.path} className="text-[16px] leading-7 font-[400] text-textColor hover:text-primaryColor dark:text-slate-400 dark:hover:text-blue-400">
                                        {item.display}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>
            </div>
        </footer>
    )
}
