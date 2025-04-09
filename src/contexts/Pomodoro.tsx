import { createContext, useState } from 'react'
import { initialIsBreak, initialSeconds } from '../utilities/ClockUtils'

const DEFAULT_CONTEXT = {
  seconds: initialSeconds(),
  setSeconds: () => {},
  isRunning: false,
  setIsRunning: () => {},
  isCustomizing: false,
  setIsCustomizing: () => {},
  customSeconds: initialSeconds(),
  setCustomSeconds: () => {},
  isBreak: initialIsBreak(),
  setIsBreak: () => {},
}

export const PomodoroContext = createContext<PomodoroContextType>(DEFAULT_CONTEXT)

export interface PomodoroContextType {
  seconds: number
  setSeconds: (seconds: number) => void
  isRunning: boolean
  setIsRunning: (isRunning: boolean) => void
  isCustomizing: boolean
  setIsCustomizing: (isCustomizing: boolean) => void
  customSeconds: number
  setCustomSeconds: (customSeconds: number) => void
  isBreak: boolean
  setIsBreak: (isBreak: boolean) => void
}

export function PomodoroProvider({ children }: { children: React.ReactNode }) {
  const [seconds, setSeconds] = useState<number>(initialSeconds())
  const [isRunning, setIsRunning] = useState<boolean>(false)
  const [isCustomizing, setIsCustomizing] = useState<boolean>(false)
  const [customSeconds, setCustomSeconds] = useState<number>(initialSeconds())
  const [isBreak, setIsBreak] = useState<boolean>(initialIsBreak())

  return (
    <PomodoroContext.Provider
      value={{
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
      }}
    >
      {children}
    </PomodoroContext.Provider>
  )
}
