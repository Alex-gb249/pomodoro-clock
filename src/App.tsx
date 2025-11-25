import './App.css'
import { Header } from './components/header/Header'
import { Footer } from './components/footer/Footer'
import { TaskManager } from './components/task-manager/TaskManager'
import { useContext, useEffect } from 'react'
import { turnNewTheme } from './utilities/ThemeUtils'
import { ThemeContext } from './contexts/Theme'
import { PomodoroContext } from './contexts/Pomodoro'
import { TasksContext } from './contexts/Tasks'
import { Clock } from './components/clock/Clock'

function App() {
  const { themeMode } = useContext(ThemeContext)
  const { isBreak } = useContext(PomodoroContext)
  const { isSelectingTask } = useContext(TasksContext)

  useEffect(() => {
    turnNewTheme(themeMode, isBreak)
  }, [])

  useEffect(() => {
    const requestNotificationPermission = async () => {
      try {
        if ('Notification' in window && Notification.permission === 'default') {
          await Notification.requestPermission()
        }
      } catch (error) {
        console.warn('Error al solicitar permiso de notificaciones:', error)
      }
    }

    requestNotificationPermission()
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
