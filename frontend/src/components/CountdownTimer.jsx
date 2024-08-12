import { useEffect, useState } from "react"

export default function CountdownTimer({ initialSeconds }) {
    const [timeLeft, setTimeLeft] = useState(initialSeconds)

    useEffect(() => {
        if (timeLeft <= 0) return
        const timer = setInterval(() => {
            setTimeLeft(prevTime => {
                if (prevTime <= 1) {
                    clearInterval(timer)
                    return 0
                }
                return prevTime - 1
            })
        }, 1000)
        return () => clearInterval(timer)
    }, [timeLeft])

    const formatTime = (seconds) => {
        return String(seconds).padStart(2, '0')
    }

    return (
        <>
            {formatTime(timeLeft)}
        </>
    )
}
