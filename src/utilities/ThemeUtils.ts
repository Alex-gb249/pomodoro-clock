import { Theme } from '../models/Themes'

export const turnNewTheme = (themeMode: Theme, isBreak: boolean) => {
  const newTheme = themeMode === Theme.DYNAMIC ? (isBreak ? Theme.DARK : Theme.LIGHT) : themeMode
  document.getElementById('body')?.setAttribute('data-bs-theme', newTheme)
}

export const getColorClass = (themeMode: Theme, isBreak: boolean) => {
  return themeMode === Theme.DYNAMIC
    ? isBreak
      ? 'secondary-text'
      : 'primary-dark-text'
    : themeMode === Theme.DARK
      ? 'secondary-text'
      : 'primary-dark-text'
}
