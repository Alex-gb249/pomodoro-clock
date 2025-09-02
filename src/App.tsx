import './App.css'
import { Header } from './components/header/Header'
import { Footer } from './components/footer/Footer'
import { TaskManager } from './components/task-manager/TaskManager'
import { useContext, useEffect } from 'react'
import { turnNewTheme } from './utilities/ThemeUtils'
import { ThemeContext } from './contexts/Theme'
import { PomodoroContext } from './contexts/Pomodoro'
import { TasksContext } from './contexts/Tasks'
import { Clock } from './components/task-manager/components/clock/Clock'

function App() {
  const { themeMode } = useContext(ThemeContext)
  const { isBreak } = useContext(PomodoroContext)
  const { isSelectingTask } = useContext(TasksContext)

  useEffect(() => {
    turnNewTheme(themeMode, isBreak)
  }, [])

  useEffect(() => {
    if (Notification.permission === 'default') {
      Notification.requestPermission()
    }
  }, [])

  return (
    <>
      <div className='all prevent-select'>
        <Header />
        <div className='d-flex justify-content-center align-items-center'>
          {isSelectingTask ? <TaskManager /> : <Clock />}
        </div>
        <Footer />
      </div>
    </>
  )
}

export default App
