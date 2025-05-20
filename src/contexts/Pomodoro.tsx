import { createContext, SetStateAction, useState } from 'react'
import { initialIsAutoRun, initialIsBreak, initialSeconds } from '../utilities/ClockUtils'

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
  isAutoRun: false,
  setIsAutoRun: () => {},
}

export const PomodoroContext = createContext<PomodoroContextType>(DEFAULT_CONTEXT)

export interface PomodoroContextType {
  seconds: number
  setSeconds: (value: SetStateAction<number>) => void
  isRunning: boolean
  setIsRunning: (isRunning: boolean) => void
  isCustomizing: boolean
  setIsCustomizing: (isCustomizing: boolean) => void
  customSeconds: number
  setCustomSeconds: (customSeconds: number) => void
  isBreak: boolean
  setIsBreak: (isBreak: boolean) => void
  isAutoRun: boolean
  setIsAutoRun: (isAutoRun: boolean) => void
}

export function PomodoroProvider({ children }: { children: React.ReactNode }) {
  const [seconds, setSeconds] = useState<number>(initialSeconds())
  const [isRunning, setIsRunning] = useState<boolean>(false)
  const [isCustomizing, setIsCustomizing] = useState<boolean>(false)
  const [customSeconds, setCustomSeconds] = useState<number>(initialSeconds())
  const [isBreak, setIsBreak] = useState<boolean>(initialIsBreak())
  const [isAutoRun, setIsAutoRun] = useState<boolean>(initialIsAutoRun())

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
        isAutoRun,
        setIsAutoRun,
      }}
    >
      {children}
    </PomodoroContext.Provider>
  )
}
