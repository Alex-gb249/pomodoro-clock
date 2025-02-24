import { useEffect, useState } from "react"

const DEFAULT_TIME = 10 * 60

var seconds:number = 0

export function Clock() {
    const [time, setTime] = useState<string>("10:00")
    const [isRunning, setIsRunning] = useState<boolean>(false)

    const updateTimer = () => {
        seconds = seconds - 1
        const date = new Date(0)
        date.setSeconds(seconds)
        setTime(date.toTimeString().slice(3, 8))
    }

    const stopTimer = () => {
        console.log("Time's up!")
        seconds = 0
        setIsRunning(false)
    }

    const startTimer = () => {
        setIsRunning(true)
        setTime("10:00")
        seconds = DEFAULT_TIME
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
        <>
            <h1>{time}</h1>
            {isRunning ? <button onClick={stopTimer}>Stop</button> : <button onClick={startTimer}>Play</button>}
        </>
    )
}