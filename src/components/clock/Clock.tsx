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

    const resetTimer = () => {
        setSeconds(DEFAULT_SECONDS)
        localStorage.setItem('currentSeconds', DEFAULT_SECONDS.toString())
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
            if(newSeconds === 0) {
                setIsRunning(false)
                localStorage.removeItem('currentSeconds')
            }
            setSeconds(newSeconds)
        }, 1000)

        return () => clearInterval(interval)
    })

    return (
        <div>
            <h1 className="text-center fs-1">{updateTimer(seconds)}</h1>
            <div className="d-flex justify-content-center">
                {
                    !isRunning && seconds === DEFAULT_SECONDS ?
                    <button onClick={startTimer} className="btn btn-sm btn-outline-success fw-bold border-3">Play</button> :
                    null
                }
                {
                    isRunning ?
                    <button onClick={stopTimer} className="btn btn-sm btn-outline-danger fw-bold border-3">Stop</button> :
                    null
                }
                {
                    !isRunning && seconds < DEFAULT_SECONDS ?
                    <button onClick={resetTimer} className="btn btn-sm btn-outline-success fw-bold border-3">Reset</button> :
                    null
                }
                {
                    !isRunning && seconds < DEFAULT_SECONDS && seconds > 0 ?
                    <button onClick={resumeTimer} className="btn btn-sm btn-outline-primary fw-bold border-3 ms-2">Resume</button> :
                    null
                }
            </div>
        </div>
    )
}