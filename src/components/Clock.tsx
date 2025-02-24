import { useEffect, useState } from "react"

var seconds:number = 10 * 60

export function Clock() {
    const [time, setTime] = useState<string>("10:00")

    const updateTimer = () => {
        seconds = seconds - 1;
        const date = new Date(0)
        date.setSeconds(seconds)
        setTime(date.toTimeString().slice(3, 8))
    }

    const stopTimer = () => {
        console.log("Time's up!")
    }

    useEffect(() => {
        if(seconds == 0) {
            stopTimer()
            return
        }
        const interval = setInterval(() => {
            updateTimer()
        }, 1000)

        return () => clearInterval(interval)
    })

    return (
        <h1>{time}</h1>
    )
}