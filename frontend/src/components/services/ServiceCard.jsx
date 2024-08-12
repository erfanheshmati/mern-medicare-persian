import { BsArrowRight } from 'react-icons/bs'
import { Link } from 'react-router-dom'

export default function ServiceCard({ item, index }) {

    const { name, desc, bgColor, textColor } = item

    return (
        <div className='py-[20px] px-4 lg:px-5 rounded-md hover:shadow-lg dark:hover:bg-slate-600'>
            <h2 className='text-[26px] leading-9 text-headingColor font-[700] dark:text-slate-300'>
                {name}
            </h2>
            <p className='text-[16px] leading-7 font-[400] text-textColor mt-4 dark:text-slate-400'>
                {desc}
            </p>
            <div className='flex items-center justify-between mt-[30px]'>
                <Link
                    to="/docs"
                    className="w-[44px] h-[44px] rounded-full border border-solid border-[#181a1e] flex items-center justify-center group hover:bg-primaryColor hover:border-none dark:border-slate-500 dark:text-slate-400 dark:hover:bg-blue-500"
                >
                    <BsArrowRight className="group-hover:text-white w-6 h-5" />
                </Link>
                <span
                    className='w-[44px] h-[44px] flex items-center justify-center text-[18px] leading-[30px] font-[600]'
                    style={{ background: `${bgColor}`, color: `${textColor}`, borderRadius: "6px 0 0 6px" }}
                >
                    {index + 1}
                </span>
            </div>
        </div>
    )
}
