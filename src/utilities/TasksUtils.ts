import { Task } from '../models/Task'

export const DEFAULT_TASKS: Task[] = [
  new Task(
    'Create a new task',
    'You can create a new task (like this one) with the "Create" button',
    true,
  ),
]

export const initialTasks = () => {
  const savedTasks: [] = JSON.parse(localStorage.getItem('tasks') || '[]')
  const parsedTasks = savedTasks.map((task: any) => {
    return new Task(task.name, task.description, task.active, task.id)
  })

  if (parsedTasks.length > 0) return parsedTasks
  localStorage.setItem('tasks', JSON.stringify(DEFAULT_TASKS))
  return DEFAULT_TASKS
}

export const initialCurrentTask = () => {
  const savedTask = JSON.parse(localStorage.getItem('currentTask') || 'null')
  if (savedTask)
    return new Task(savedTask.name, savedTask.description, savedTask.active, savedTask.id)
  return null
}
