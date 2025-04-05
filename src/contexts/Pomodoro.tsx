import { createContext, useState } from 'react'
import { getInitialIsBreak, initialSeconds } from '../utilities/ClockUtils'

const DEFAULT_CONTEXT = {
  isSelectingTask: false,
  setIsSelectingTask: () => {},
  seconds: initialSeconds(),
  setSeconds: () => {},
  isRunning: false,
  setIsRunning: () => {},
  isCustomizing: false,
  setIsCustomizing: () => {},
  customSeconds: initialSeconds(),
  setCustomSeconds: () => {},
  isBreak: getInitialIsBreak(),
  setIsBreak: () => {},
}

export const PomodoroContext = createContext<PomodoroContextType>(DEFAULT_CONTEXT)

export interface PomodoroContextType {
  isSelectingTask: boolean
  setIsSelectingTask: (isSelectingTask: boolean) => void
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
  const [isSelectingTask, setIsSelectingTask] = useState(false)
  const [seconds, setSeconds] = useState<number>(initialSeconds())
  const [isRunning, setIsRunning] = useState<boolean>(false)
  const [isCustomizing, setIsCustomizing] = useState<boolean>(false)
  const [customSeconds, setCustomSeconds] = useState<number>(initialSeconds())
  const [isBreak, setIsBreak] = useState<boolean>(getInitialIsBreak())

  return (
    <PomodoroContext.Provider
      value={{
        isSelectingTask,
        setIsSelectingTask,
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
