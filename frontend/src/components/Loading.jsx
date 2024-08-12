import { HashLoader } from "react-spinners"

export default function Loading() {
    return (
        <div className="flex items-center justify-center w-full h-[500px] md:h-[700px] lg:h-[500px] xl:h-[400px] 2xl:h-[600px]">
            <HashLoader color="#0067ff" />
        </div>
    )
}
