import { useContext } from 'react'
import { Task } from '../../models/Task'
import './TaskManager.css'
import { PomodoroContext } from '../../contexts/Pomodoro'
import { Clock } from './components/clock/Clock'
import { TasksContext } from '../../contexts/Tasks'
import Check from '../../assets/Check'
import Cancel from '../../assets/Cancel'
import Plus from '../../assets/Plus'
import Trash from '../../assets/Trash'

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

    if (taskId === currentTask?.getId()) {
      setCurrentTask(null)
      localStorage.removeItem('currentTask')
    }
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
                <Trash />
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
            <a className='clickable text-success me-2' onClick={saveTask}>
              <Check />
            </a>
            <a className='clickable text-danger' onClick={handleCancel}>
              <Cancel />
            </a>
          </>
        ) : (
          <a className='clickable text-success' onClick={handleCreate}>
            <Plus />
          </a>
        )}
      </div>
    </div>
  ) : (
    <Clock />
  )
}
