import { useEffect, useState } from "react"
import './Clock.css'
import { DEFAULT_BREAK_SECONDS, DEFAULT_SECONDS, getInitialIsBreak, initialSeconds, secondsToClock } from "../../utilities/ClockUtils"

export function Clock() {

    const [seconds, setSeconds] = useState<number>(initialSeconds())
    const [isRunning, setIsRunning] = useState<boolean>(false)
    const [isCustomizing, setIsCustomizing] = useState<boolean>(false)
    const [customSeconds, setCustomSeconds] = useState<number>(initialSeconds())
    const [isBreak, setIsBreak] = useState<boolean>(getInitialIsBreak())

    const stopTimer = () => {
        setIsRunning(false)
        localStorage.setItem('savedSeconds', seconds.toString())
    }

    const startTimer = () => {
        setIsRunning(true)
        setSeconds(customSeconds)
    }

    const resetTimer = () => {
        setSeconds(customSeconds)
        localStorage.setItem('savedSeconds', customSeconds.toString())
    }

    const resumeTimer = () => {
        setIsRunning(true)
    }

    const turnPomodoro = () => {
        setIsRunning(false)

        const newSetIsBreak = !isBreak
        setIsBreak(newSetIsBreak)

        const newSeconds = newSetIsBreak ? DEFAULT_BREAK_SECONDS : DEFAULT_SECONDS
        setSeconds(newSeconds)
        setCustomSeconds(newSeconds)

        localStorage.setItem('isBreak', newSetIsBreak.toString())
        localStorage.setItem('savedSeconds', newSeconds.toString())
    }

    useEffect(() => {
        if(!isRunning) return

        const interval = setInterval(() => {
            const newSeconds = seconds - 1
            if(newSeconds === 0) {
                turnPomodoro()
            } else {
                setSeconds(newSeconds)
            }
        }, 1000)

        return () => clearInterval(interval)
    })

    const handleCustomize = () => {
        setIsRunning(false)
        setIsCustomizing(true)
    }

    const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key !== 'Enter' || e.currentTarget.valueAsNumber <= 0) return

        const newSeconds = e.currentTarget.valueAsNumber * 60
        setCustomSeconds(newSeconds)
        setSeconds(newSeconds)
        setIsCustomizing(false)
        localStorage.setItem('savedSeconds', newSeconds.toString())
    }

    return (
        <div>
            <div className="d-flex justify-content-center">
                {
                    isBreak ?
                    <span className="badge text-bg-info">Break</span> :
                    <span className="badge text-bg-success">Pomodoro</span>
                }
            </div>

            <div className="d-flex justify-content-center">
                {
                    isCustomizing ?
                    <>
                        <input autoFocus={true} className="fs-1 mb-2" type="number" defaultValue={customSeconds / 60} onKeyUp={(e) => handleEnter(e)} onChange={(e) => setCustomSeconds(e.currentTarget.valueAsNumber * 60)}/>
                    </> :
                    <h1 className="text-light text-center fs-1 mb-2" onClick={handleCustomize}>{secondsToClock(seconds)}</h1>
                }
            </div>

            <div className="d-flex justify-content-center">
                {
                    !isRunning && !isCustomizing && seconds == customSeconds ?
                    <button onClick={startTimer} className="btn btn-sm btn-outline-success fw-bold border-3">Play</button> :
                    null
                }
                {
                    isRunning && !isCustomizing ?
                    <button onClick={stopTimer} className="btn btn-sm btn-outline-danger fw-bold border-3">Stop</button> :
                    null
                }
                {
                    !isRunning && !isCustomizing && seconds < customSeconds ?
                    <button onClick={resetTimer} className="btn btn-sm btn-outline-success fw-bold border-3">Reset</button> :
                    null
                }
                {
                    !isRunning && !isCustomizing && seconds < customSeconds && seconds > 0 ?
                    <button onClick={resumeTimer} className="btn btn-sm btn-outline-primary fw-bold border-3 ms-2">Resume</button> :
                    null
                }
            </div>
        </div>
    )
}