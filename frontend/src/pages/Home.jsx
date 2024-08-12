import About from "../components/About";
import Doctors from "../components/doctors/Doctors";
import Faq from "../components/faq/Faq";
import Feature from "../components/Feature";
import Hero from "../components/Hero";
import HowItWorks from "../components/HowItWorks";
import Services from "../components/services/Services";
import Testimonial from "../components/Testimonial";

export default function Home() {
    return (
        <>
            <Hero />
            <HowItWorks />
            <About />
            <Services />
            <Feature />
            <Doctors />
            <Faq />
            <Testimonial />
        </>
    )
}
