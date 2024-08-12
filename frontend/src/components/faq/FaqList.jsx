import { useState } from "react";
import { faqs } from "../../data/faqs"
import FaqItem from "./FaqItem"

export default function FaqList() {

    const [isOpen, setIsOpen] = useState(false)
    const [openIndex, setOpenIndex] = useState(null);

    const toggleAccordion = (index) => {
        setOpenIndex(openIndex === index ? null : index);
        setIsOpen(!isOpen)
    };

    return (
        <ul className="mt-8 md:mt-16 md:h-[500px]">
            {faqs.map((item, index) => (
                <FaqItem key={index} item={item} isOpen={openIndex === index} toggleAccordion={() => toggleAccordion(index)} />
            ))}
        </ul>
    )
}
