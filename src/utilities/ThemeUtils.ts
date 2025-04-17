import { Theme } from '../models/Themes'

export const turnNewTheme = (themeMode: Theme, isBreak: boolean) => {
  const newTheme = themeMode === Theme.DYNAMIC ? (isBreak ? Theme.DARK : Theme.LIGHT) : themeMode
  document.getElementById('body')?.setAttribute('data-bs-theme', newTheme)
}
