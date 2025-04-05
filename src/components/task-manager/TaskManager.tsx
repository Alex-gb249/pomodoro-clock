import { useContext } from 'react'
import { Task } from './Task'
import './TaskManager.css'
import { PomodoroContext } from '../../contexts/Pomodoro'
import { Clock } from './components/clock/Clock'
import { TasksContext } from '../../contexts/Tasks'

export function TaskManager() {
  const { isSelectingTask, setIsSelectingTask } = useContext(PomodoroContext)

  const {
    tasks,
    setTasks,
    isCreating,
    setIsCreating,
    newTaskName,
    setNewTaskName,
    newTaskDescription,
    setNewTaskDescription,
    currentTask,
    setCurrentTask,
  } = useContext(TasksContext)

  const handleCreate = () => {
    setIsCreating(true)
  }

  const handleCancel = () => {
    setIsCreating(false)
  }

  const saveTask = () => {
    if (!newTaskName) return

    const newTask = new Task(newTaskName, newTaskDescription, true)
    const newTasks = [...tasks, newTask]

    localStorage.setItem('tasks', JSON.stringify(newTasks))
    setTasks(newTasks)
    setNewTaskName('')
    setNewTaskDescription('')
    setIsCreating(false)
  }

  const handleDelete = (taskId: string) => {
    const newTasks = tasks.filter((task) => task.getId() !== taskId)

    localStorage.setItem('tasks', JSON.stringify(newTasks))
    setTasks(newTasks)
  }

  const handleEnter = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      saveTask()
    }
  }

  const handleCurrentTask = (task: Task) => {
    setIsCreating(false)
    setCurrentTask(task)
    setIsSelectingTask(false)
    localStorage.setItem('currentTask', JSON.stringify(task))
  }

  return isSelectingTask ? (
    <div className='card' style={{ width: '24rem' }}>
      <div className='card-body d-flex justify-content-center'>
        <h1>Your's tasks</h1>
      </div>
      {tasks.length > 0 || isCreating ? (
        <ul className='list-group list-group-flush'>
          {tasks.map((task) => (
            <li
              key={task.getId()}
              className={`list-group-item d-flex justify-content-between align-items-center ${task.getId() === currentTask?.getId() ? 'bg-secondary-subtle text-primary-emphasis' : ''}`}
            >
              <div>
                <a
                  className='card-text fw-bold clickable m-0'
                  onClick={() => handleCurrentTask(task)}
                >
                  {task.getName()}
                </a>
                {task.getDescription() && (
                  <p className='card-text'>
                    <small className='text-body-secondary'>{task.getDescription()}</small>
                  </p>
                )}
              </div>
              <a className='clickable text-danger' onClick={() => handleDelete(task.getId())}>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  className='icon icon-tabler icons-tabler-outline icon-tabler-trash'
                >
                  <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                  <path d='M4 7l16 0' />
                  <path d='M10 11l0 6' />
                  <path d='M14 11l0 6' />
                  <path d='M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12' />
                  <path d='M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3' />
                </svg>
              </a>
            </li>
          ))}
          {isCreating && (
            <li className='list-group-item'>
              <input
                type='text'
                className='task-input px-2 mb-2'
                placeholder='Task name'
                onChange={(e) => setNewTaskName(e.currentTarget.value)}
                onKeyUp={(e) => handleEnter(e)}
              />
              <small>
                <input
                  type='text'
                  className='task-input description-input text-body-secondary px-2'
                  placeholder='Task description'
                  onChange={(e) => setNewTaskDescription(e.currentTarget.value)}
                  onKeyUp={(e) => handleEnter(e)}
                />
              </small>
            </li>
          )}
        </ul>
      ) : (
        <p className='card-text text-center'>You don't have any tasks yet.</p>
      )}
      <div className='card-body'>
        {isCreating ? (
          <>
            <button className='btn btn-sm btn-success me-2' onClick={saveTask}>
              Save
            </button>
            <button className='btn btn-sm btn-danger' onClick={handleCancel}>
              Cancel
            </button>
          </>
        ) : (
          <>
            <button className='btn btn-sm btn-success me-2' onClick={handleCreate}>
              Create
            </button>
          </>
        )}
      </div>
    </div>
  ) : (
    <Clock />
  )
}
