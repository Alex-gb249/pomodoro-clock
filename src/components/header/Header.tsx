import { useContext } from 'react'
import './Header.css'
import { PomodoroContext } from '../../contexts/Pomodoro'
import { TasksContext } from '../../contexts/Tasks'
import Check from '../../assets/Check'

export function Header() {
  const { isSelectingTask, setIsSelectingTask } = useContext(PomodoroContext)
  const { currentTask } = useContext(TasksContext)

  const handleClick = () => {
    const newIsSelectingTask = !isSelectingTask
    setIsSelectingTask(newIsSelectingTask)
  }

  return (
    <nav className='navbar navbar-expand-lg bg-body-tertiary'>
      <div className='container-fluid'>
        <div className='navbar-brand d-flex align-items-center prevent-select'>
          <img className='logo me-2' src='/clock.png' alt='Pomodoro logo' />
          <h1>Pomodoro</h1>
        </div>
        {!isSelectingTask && (
          <div className='d-flex align-items-center'>
            {currentTask && <h3 className='me-2'>{currentTask.getName()}</h3>}
            <a className='clickable' onClick={handleClick}>
              <Check />
            </a>
          </div>
        )}
        {/* <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    Navbat content
                </div> */}
      </div>
    </nav>
  )
}
