import { services } from "../../data/services"
import ServiceCard from "./ServiceCard"

export default function ServiceList() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]">
            {services.map((item, index) => (
                <ServiceCard key={index} index={index} item={item} />
            ))}
        </div>
    )
}
