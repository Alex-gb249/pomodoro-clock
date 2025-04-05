import { Task } from '../components/task-manager/Task'

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
  return DEFAULT_TASKS
}
