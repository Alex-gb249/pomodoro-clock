import { useEffect, useState } from "react"

export function Clock() {
    
    const [seconds, setSeconds] = useState<number>(0)
    const [minutes, setMinutes] = useState<number>(0)

    const plusMinute = () => {
        setSeconds(0)
        setMinutes((minutes) => minutes + 1)
    }

    useEffect(() => {
        const interval = setInterval(() => {
            seconds == 59 
            ? plusMinute() :
            setSeconds((seconds) => seconds + 1)
        }, 1000)

        return () => clearInterval(interval)
    })

    return (
        <h1>
            {minutes}:{seconds}
        </h1>
    )
}