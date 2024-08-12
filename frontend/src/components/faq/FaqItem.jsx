import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai"

export default function FaqItem({ item, isOpen, toggleAccordion }) {
    return (
        <div className="p-3 lg:p-5 rounded-[12px] border border-solid border-[#d9dce2] mb-5 cursor-pointer hover:border hover:border-solid hover:border-blue-500 dark:border-slate-500 dark:hover:border-blue-500">
            <div className="flex items-center justify-between gap-5" onClick={toggleAccordion}>
                <h4 className="text-[16px] leading-7 lg:text-[22px] lg:leading-8 text-headingColor dark:text-slate-300">
                    {item.question}
                </h4>
                <div className="w-7 h-7 lg:w-8 lg:h-8 border border-solid border-[#141f21] rounded flex items-center justify-center hover:bg-primaryColor hover:text-white hover:border-white dark:border-slate-400 dark:text-slate-400 dark:hover:text-slate-100">
                    {isOpen ? <AiOutlineMinus /> : <AiOutlinePlus />}
                </div>
            </div>
            {isOpen && (
                <div className="mt-4">
                    <p className="text-[14px] leading-6 lg:text-[16px] lg:leading-7 font-[400] text-textColor dark:text-slate-400 text-justify">
                        {item.content}
                    </p>
                </div>
            )}
        </div>
    )
}
