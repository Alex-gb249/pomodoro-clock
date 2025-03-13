import { useEffect, useState } from "react"
import './Clock.css'

const DEFAULT_SECONDS = 10 * 60
const DEFAULT_TIME = "10:00"

var seconds:number = DEFAULT_SECONDS

export function Clock() {
    const [time, setTime] = useState<string>(DEFAULT_TIME)
    const [isRunning, setIsRunning] = useState<boolean>(false)

    const updateTimer = () => {
        seconds = seconds - 1
        const date = new Date(0)
        date.setSeconds(seconds)
        setTime(date.toTimeString().slice(3, 8))
    }

    const stopTimer = () => {
        console.log("Time's up!")
        setIsRunning(false)
    }

    const startTimer = () => {
        setIsRunning(true)
        setTime(DEFAULT_TIME)
        seconds = DEFAULT_SECONDS
    }

    const resumeTimer = () => {
        updateTimer()
        setIsRunning(true)
    }

    useEffect(() => {
        if(!isRunning) {
            stopTimer()
            return
        }
        
        const interval = setInterval(() => {
            updateTimer()
        }, 1000)

        return () => clearInterval(interval)
    })

    return (
        <div>
            <h1 className="text-center fs-1">{time}</h1>
            <div className="d-flex justify-content-center">
                {
                    isRunning ?
                    <button onClick={stopTimer} className="btn btn-sm btn-danger">Stop</button> :
                    <button onClick={startTimer} className="btn btn-sm btn-success">{ seconds !== DEFAULT_SECONDS ? 'Reset' : 'Play'}</button>
                }
                {!isRunning && seconds < DEFAULT_SECONDS ? <button onClick={resumeTimer} className="btn btn-sm btn-primary ms-2">Resume</button> : null}
            </div>
        </div>
    )
}