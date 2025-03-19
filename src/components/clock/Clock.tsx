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
    const [isCustomizing, setIsCutomizing] = useState<boolean>(false)
    const [customSeconds, setCustomSeconds] = useState<number>(DEFAULT_SECONDS)

    const updateTimer = (sec: number): string => {
        const minutes = Math.floor(sec / 60).toString().padStart(2, '0')
        const seconds = (sec % 60).toString().padStart(2, '0')
        return `${minutes}:${seconds}`
    }

    const stopTimer = () => {
        setIsRunning(false)
        localStorage.setItem('currentSeconds', seconds.toString())
    }

    const startTimer = () => {
        setIsRunning(true)
        setSeconds(customSeconds)
    }

    const resetTimer = () => {
        setSeconds(customSeconds)
        localStorage.setItem('currentSeconds', customSeconds.toString())
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

    const handleCustomize = () => {
        setIsCutomizing(!isCustomizing)
    }

    const handleChangeTime = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key !== 'Enter') return
        
        const newSeconds = parseInt(e.currentTarget.value) * 60
        setCustomSeconds(newSeconds)
        setSeconds(newSeconds)
        setIsCutomizing(false)
    }

    return (
        <div>
            <div className="d-flex justify-content-center">
                {
                    isCustomizing ?
                    <>
                        <input autoFocus={true} className="fs-1 mb-2" type="number" defaultValue="10" onKeyUp={(e) => handleChangeTime(e)}/>
                    </> :
                    <h1 className="text-light text-center fs-1 mb-2" onClick={handleCustomize}>{updateTimer(seconds)}</h1>
                }
            </div>

            <div className="d-flex justify-content-center">
                {
                    !isRunning && seconds === customSeconds ?
                    <button onClick={startTimer} className="btn btn-sm btn-outline-success fw-bold border-3">Play</button> :
                    null
                }
                {
                    isRunning ?
                    <button onClick={stopTimer} className="btn btn-sm btn-outline-danger fw-bold border-3">Stop</button> :
                    null
                }
                {
                    !isRunning && seconds < customSeconds ?
                    <button onClick={resetTimer} className="btn btn-sm btn-outline-success fw-bold border-3">Reset</button> :
                    null
                }
                {
                    !isRunning && seconds < customSeconds && seconds > 0 ?
                    <button onClick={resumeTimer} className="btn btn-sm btn-outline-primary fw-bold border-3 ms-2">Resume</button> :
                    null
                }
            </div>
        </div>
    )
}