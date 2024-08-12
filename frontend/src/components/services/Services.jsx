import ServiceList from "./ServiceList";

export default function Services() {
    return (
        <section>
            <div className="container">
                <div className="xl:w-[470px] mx-auto">
                    <h2 className="heading text-center">
                        خدمات درمانی با کیفیت
                    </h2>
                    <p className="text__para text-center">
                        همکاران ما قصد دارند مطالب بسیار مفیدی را در این حوزه و همچنین انواع خدمات پزشکی برای افزایش سطح اطلاعات و آگاهی شما ارائه دهند.
                    </p>
                </div>
                <ServiceList />
            </div>
        </section>
    )
}
