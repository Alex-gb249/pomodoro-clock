import './App.css'
import { Header } from './components/header/Header'
import { Clock } from './components/clock/Clock'
import { Footer } from './components/footer/Footer'
import { TaskManager } from './components/task-manager/TaskManager'
import { useContext } from 'react'
import { PomodoroContext } from './contexts/Pomodoro'

function App() {
  const { isSelectingTask } = useContext(PomodoroContext)

  return (
    <>
      <div className='all'>
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
