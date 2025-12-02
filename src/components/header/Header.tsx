import { useContext } from 'react'
import './Header.css'
import { TasksContext } from '../../contexts/Tasks'
import Checklist from '../../assets/Checklist'
import { ThemeContext } from '../../contexts/Theme'
import { PomodoroContext } from '../../contexts/Pomodoro'
import { getColorClass } from '../../utilities/ThemeUtils'

export function Header() {
  const { isSelectingTask, setIsSelectingTask, currentTask } = useContext(TasksContext)
  const { themeMode } = useContext(ThemeContext)
  const { isBreak } = useContext(PomodoroContext)

  const colorClass = getColorClass(themeMode, isBreak)

  const handleClick = () => {
    const newIsSelectingTask = !isSelectingTask
    setIsSelectingTask(newIsSelectingTask)
  }

  return (
    <nav className='navbar navbar-expand-lg bg-body-tertiary animated-theme'>
      <div className='container-fluid'>
        <div className='navbar-brand d-flex align-items-center prevent-select'>
          <img className='logo me-2' src='/pomodoro-logo.png' alt='Pomodoro logo' />
          <h1 className={`${colorClass} animated-theme`}>Pomodoro</h1>
        </div>
        {!isSelectingTask && (
          <div className='d-flex align-items-center animated-theme'>
            {currentTask && <h3 className={`${colorClass} me-2`}>{currentTask.getName()}</h3>}
            <a className={`${colorClass} clickable`} onClick={handleClick}>
              <Checklist />
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
