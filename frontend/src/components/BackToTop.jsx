import { useEffect, useState } from 'react'
import { PiArrowFatLineUpBold } from "react-icons/pi"

export default function BackToTop() {
    const [isFixed, setIsFixed] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 200) {
                setIsFixed(true)
            }
            else {
                setIsFixed(false)
            }
        }
        window.addEventListener("scroll", handleScroll)
        // Clean up event listener on unmount
        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    }, [])

    const backToTop = () => {
        const duration = 800;
        const start = document.documentElement.scrollTop || document.body.scrollTop;
        const startTime = performance.now();
        const scroll = (currentTime) => {
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            const easing = (t) => t * (2 - t);
            const easedProgress = easing(progress);
            window.scrollTo(0, start * (1 - easedProgress));
            if (timeElapsed < duration) {
                requestAnimationFrame(scroll);
            }
        };
        requestAnimationFrame(scroll);
    }

    return (
        <PiArrowFatLineUpBold
            onClick={backToTop}
            className={`${isFixed ? "fixed" : ""} left-5 bottom-4 md:left-6 2xl:left-8 size-9 md:size-10 md:hover:scale-110 z-50 cursor-pointer text-blue-300 hover:text-blue-600 dark:text-blue-500/70 dark:hover:text-blue-400`}
        />
    )
}