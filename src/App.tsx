import './App.css'
import { Header } from './components/header/Header'
import { Clock } from './components/clock/Clock'
import { Footer } from './components/footer/Footer'
import { TaskManager } from './components/task-manager/TaskManager'
import { useState } from 'react'
import { PomodoroProvider } from './contexts/Pomodoro'

function App() {
  const [isSelectingTask] = useState(false)

  return (
    <>
      <div className='all'>
        <PomodoroProvider>
          <Header />
          <div className='d-flex justify-content-center align-items-center'>
            {isSelectingTask ? <TaskManager /> : <Clock />}
          </div>
          <Footer />
        </PomodoroProvider>
      </div>
    </>
  )
}

export default App
