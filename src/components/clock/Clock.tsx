import { useEffect, useState } from "react"
import './Clock.css'

const DEFAULT_SECONDS = 10 * 60

export function Clock() {
    const [seconds, setSeconds] = useState<number>(() => {
        const currentSeconds = parseInt(localStorage.getItem('currentSeconds') || '0')
        if(currentSeconds > 0) return currentSeconds
        return DEFAULT_SECONDS
    })
    const [isRunning, setIsRunning] = useState<boolean>(false)

    const updateTimer = (sec: number): string => {
        const date = new Date(0)
        date.setSeconds(sec)
        return date.toTimeString().slice(3, 8)
    }

    const stopTimer = () => {
        setIsRunning(false)
        localStorage.setItem('currentSeconds', seconds.toString())
    }

    const startTimer = () => {
        setIsRunning(true)
        setSeconds(DEFAULT_SECONDS)
    }

    const resumeTimer = () => {
        setIsRunning(true)
    }

    useEffect(() => {
        if(!isRunning) {
            stopTimer()
            return
        }
        
        const interval = setInterval(() => {
            const newSeconds = seconds - 1
            setSeconds(newSeconds)
        }, 1000)

        return () => clearInterval(interval)
    })

    return (
        <div>
            <h1 className="text-center fs-1">{updateTimer(seconds)}</h1>
            <div className="d-flex justify-content-center">
                {
                    isRunning ?
                    <button onClick={stopTimer} className="btn btn-sm btn-outline-danger fw-bold border-3">Stop</button> :
                    <button onClick={startTimer} className="btn btn-sm btn-outline-success fw-bold border-3">{ seconds !== DEFAULT_SECONDS ? 'Reset' : 'Play'}</button>
                }
                {!isRunning && seconds < DEFAULT_SECONDS ? <button onClick={resumeTimer} className="btn btn-sm btn-outline-primary fw-bold border-3 ms-2">Resume</button> : null}
            </div>
        </div>
    )
}