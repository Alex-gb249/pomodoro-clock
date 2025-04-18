import { useContext } from 'react'
import Moon from '../../assets/Moon'
import Sun from '../../assets/Sun'
import SunMoon from '../../assets/SunMoon'
import './Footer.css'
import { ThemeContext } from '../../contexts/Theme'
import { turnNewTheme } from '../../utilities/ThemeUtils'
import { Theme } from '../../models/Themes'
import { PomodoroContext } from '../../contexts/Pomodoro'

export function Footer() {
  const { isCustomizing, isBreak } = useContext(PomodoroContext)

  const { themeMode, setThemeMode } = useContext(ThemeContext)

  const handleThemeMode = (newThemeMode: Theme) => {
    turnNewTheme(newThemeMode, isBreak)
    setThemeMode(newThemeMode)
  }

  return (
    <div className='d-flex justify-content-center align-items-center p-3'>
      <a
        href='https://github.com/Alex-gb249/pomodoro-clock'
        target='_blank'
        className='source-link text-body-tertiary fst-italic'
      >
        Alex Bermúdez - Pomodoro App
      </a>

      <div className='position-absolute bottom-0 end-0 p-3'>
        {!isCustomizing && themeMode === Theme.DARK && (
          <a className='clickable text-secondary me-2' onClick={() => handleThemeMode(Theme.LIGHT)}>
            <Moon />
          </a>
        )}
        {!isCustomizing && themeMode === Theme.LIGHT && (
          <a
            className='clickable text-secondary me-2'
            onClick={() => handleThemeMode(Theme.DYNAMIC)}
          >
            <Sun />
          </a>
        )}
        {!isCustomizing && themeMode === Theme.DYNAMIC && (
          <a className='clickable text-secondary me-2' onClick={() => handleThemeMode(Theme.DARK)}>
            <SunMoon />
          </a>
        )}
      </div>
    </div>
  )
}
