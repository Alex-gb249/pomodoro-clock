import { useEffect, useState } from "react"

var seconds:number = 10 * 60
export function Clock() {
    const [time, setTime] = useState<string>("10:00")

    const updateTime = () => {
        seconds = seconds - 1
        const date = new Date(0)
        date.setSeconds(seconds)
        setTime(date.toTimeString().slice(3, 8))
    }

    useEffect(() => {
        const interval = setInterval(() => {
            updateTime()
        }, 1000)

        return () => clearInterval(interval)
    })

    return (
        <h1>
            {time}
        </h1>
    )
}