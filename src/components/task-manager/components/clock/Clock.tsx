import { useContext, useEffect } from 'react'
import './Clock.css'
import {
  DEFAULT_BREAK_SECONDS,
  DEFAULT_SECONDS,
  secondsToClock,
} from '../../../../utilities/ClockUtils'
import { PomodoroContext } from '../../../../contexts/Pomodoro'
import Skip from '../../../../assets/Skip'
import { ThemeContext } from '../../../../contexts/Theme'
import { turnNewTheme } from '../../../../utilities/ThemeUtils'
import Infinity from '../../../../assets/Infinity'
import InfinityOff from '../../../../assets/InfinityOff'
import useSound from '../../../../hooks/useSound'

export function Clock() {
  const {
    seconds,
    setSeconds,
    isRunning,
    setIsRunning,
    isCustomizing,
    setIsCustomizing,
    customSeconds,
    setCustomSeconds,
    isBreak,
    setIsBreak,
    isAutoRun,
    setIsAutoRun,
  } = useContext(PomodoroContext)

  const { themeMode } = useContext(ThemeContext)

  const { play } = useSound('notification')

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

    const newIsBreak = !isBreak
    setIsBreak(newIsBreak)

    const newSeconds = newIsBreak ? DEFAULT_BREAK_SECONDS : DEFAULT_SECONDS
    setSeconds(newSeconds)
    setCustomSeconds(newSeconds)

    turnNewTheme(themeMode, newIsBreak)
    play()

    if (isAutoRun) {
      setIsRunning(true)
    }

    localStorage.setItem('isBreak', newIsBreak.toString())
    localStorage.setItem('savedSeconds', newSeconds.toString())
  }

  useEffect(() => {
    if (!isRunning) return

    const interval = setInterval(() => {
      const newSeconds = seconds - 1
      if (newSeconds <= 0) {
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
    if (e.key !== 'Enter') return

    customize(Number(e.currentTarget.value))
  }

  const customize = (value: number) => {
    if (isNaN(value) || value <= 0 || value > 1440) return
    const newSeconds = value * 60
    setCustomSeconds(newSeconds)
    setSeconds(newSeconds)
    setIsCustomizing(false)
    localStorage.setItem('savedSeconds', newSeconds.toString())
  }

  const verifyInput = (e: React.FormEvent<HTMLInputElement>) => {
    e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, '')
  }

  const handleSkip = () => {
    setIsRunning(false)
    setSeconds(0)
    turnPomodoro()
  }

  const handleAutoRun = (value: boolean) => {
    setIsAutoRun(value)
    localStorage.setItem('isAutoRun', value.toString())
  }

  return (
    <div>
      <div className='d-flex justify-content-center'>
        {isBreak ? (
          <span className='badge text-bg-primary'>Break</span>
        ) : (
          <span className='badge text-bg-success'>Pomodoro</span>
        )}
      </div>

      <div className='d-flex justify-content-center my-2'>
        {isCustomizing ? (
          <>
            <input
              autoFocus={true}
              className='fs-1 clock-input'
              type='number'
              defaultValue={customSeconds / 60}
              onInput={verifyInput}
              onKeyUp={(e) => handleEnter(e)}
              onBlur={(e) => customize(Number(e.currentTarget.value))}
            />
          </>
        ) : (
          <h1 className='text-center clickable fs-1' onClick={handleCustomize}>
            {secondsToClock(seconds)}
          </h1>
        )}
      </div>

      <div className='d-flex justify-content-center align-items-center'>
        {!isCustomizing && isAutoRun && (
          <a className='clickable text-secondary me-2' onClick={() => handleAutoRun(false)}>
            <Infinity />
          </a>
        )}
        {!isCustomizing && !isAutoRun && (
          <a className='clickable text-secondary me-2' onClick={() => handleAutoRun(true)}>
            <InfinityOff />
          </a>
        )}
        {!isRunning && !isCustomizing && seconds == customSeconds && (
          <button onClick={startTimer} className='btn btn-sm btn-outline-success fw-bold border-3'>
            Play
          </button>
        )}
        {isRunning && !isCustomizing && (
          <button onClick={stopTimer} className='btn btn-sm btn-outline-danger fw-bold border-3'>
            Stop
          </button>
        )}
        {!isRunning && !isCustomizing && seconds < customSeconds && (
          <button onClick={resetTimer} className='btn btn-sm btn-outline-success fw-bold border-3'>
            Reset
          </button>
        )}
        {!isRunning && !isCustomizing && seconds < customSeconds && seconds > 0 && (
          <button
            onClick={resumeTimer}
            className='btn btn-sm btn-outline-primary fw-bold border-3 ms-2'
          >
            Resume
          </button>
        )}
        {!isCustomizing && (
          <a className='clickable text-secondary ms-2' onClick={handleSkip}>
            <Skip />
          </a>
        )}
      </div>
    </div>
  )
}
