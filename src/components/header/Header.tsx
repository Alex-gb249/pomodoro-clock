import { useContext } from 'react'
import './Header.css'
import { PomodoroContext } from '../../contexts/Pomodoro'

export function Header() {
  const { isSelectingTask, setIsSelectingTask } = useContext(PomodoroContext)

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
        <div className='d-flex align-items-center'>
          <h3 className='me-2'>Dummy current task name</h3>
          <a className='clickable' onClick={handleClick}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              stroke-width='2'
              stroke-linecap='round'
              stroke-linejoin='round'
            >
              <path stroke='none' d='M0 0h24v24H0z' fill='none' />
              <path d='M3.5 5.5l1.5 1.5l2.5 -2.5' />
              <path d='M3.5 11.5l1.5 1.5l2.5 -2.5' />
              <path d='M3.5 17.5l1.5 1.5l2.5 -2.5' />
              <path d='M11 6l9 0' />
              <path d='M11 12l9 0' />
              <path d='M11 18l9 0' />
            </svg>
          </a>
        </div>
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
