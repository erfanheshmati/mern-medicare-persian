import faqImg from "/images/faq-img.png"
import FaqList from "./FaqList"

export default function Faq() {
    return (
        <section>
            <div className="container">
                <div className="flex items-center gap-[50px] lg:gap-0">
                    <div className="w-1/2 hidden md:block">
                        <img src={faqImg} alt="" />
                    </div>
                    <div className="w-full md:w-1/2 md:mt-20 lg:mt-16">
                        <h2 className="heading">
                            سوالات متداول
                        </h2>
                        <FaqList />
                    </div>
                </div>
            </div>
        </section>
    )
}
