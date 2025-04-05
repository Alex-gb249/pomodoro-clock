import { createContext, useState } from 'react'
import { Task } from '../components/task-manager/Task'
import { initialTasks } from '../utilities/TasksUtils'

const DEFAULT_CONTEXT = {
  tasks: initialTasks(),
  setTasks: () => {},
  isCreating: false,
  setIsCreating: () => {},
  newTaskName: '',
  setNewTaskName: () => {},
  newTaskDescription: '',
  setNewTaskDescription: () => {},
}

export const TasksContext = createContext<TasksContextType>(DEFAULT_CONTEXT)

export interface TasksContextType {
  tasks: Task[]
  setTasks: (tasks: Task[]) => void
  isCreating: boolean
  setIsCreating: (isCreating: boolean) => void
  newTaskName: string
  setNewTaskName: (newTaskName: string) => void
  newTaskDescription: string
  setNewTaskDescription: (newTaskDescription: string) => void
}

export function TasksContextProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks())
  const [isCreating, setIsCreating] = useState(false)
  const [newTaskName, setNewTaskName] = useState('')
  const [newTaskDescription, setNewTaskDescription] = useState('')

  return (
    <TasksContext.Provider
      value={{
        tasks,
        setTasks,
        isCreating,
        setIsCreating,
        newTaskName,
        setNewTaskName,
        newTaskDescription,
        setNewTaskDescription,
      }}
    >
      {children}
    </TasksContext.Provider>
  )
}
