export const DEFAULT_SECONDS = 25 * 60
export const DEFAULT_BREAK_SECONDS = 5 * 60

export const secondsToClock = (sec: number): string => {
  const minutes = Math.floor(sec / 60)
    .toString()
    .padStart(2, '0')
  const seconds = (sec % 60).toString().padStart(2, '0')
  return `${minutes}:${seconds}`
}

export const initialSeconds = () => {
  const savedSeconds = parseInt(localStorage.getItem('savedSeconds') || '0')
  if (savedSeconds) return savedSeconds
  return DEFAULT_SECONDS
}

export const initialIsBreak = () => {
  const savedIsBreak = localStorage.getItem('isBreak') === 'true'
  return savedIsBreak
}

export const initialIsAutoRun = () => {
  const savedIsAutoRun = localStorage.getItem('isAutoRun') === 'true'
  return savedIsAutoRun
}
