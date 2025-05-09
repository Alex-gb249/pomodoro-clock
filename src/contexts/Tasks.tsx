import { createContext, useState } from 'react'
import { Task } from '../models/Task'
import { initialCurrentTask, initialTasks } from '../utilities/TasksUtils'

const DEFAULT_CONTEXT = {
  isSelectingTask: false,
  setIsSelectingTask: () => {},
  tasks: initialTasks(),
  setTasks: () => {},
  isCreating: false,
  setIsCreating: () => {},
  newTaskName: '',
  setNewTaskName: () => {},
  newTaskDescription: '',
  setNewTaskDescription: () => {},
  currentTask: null,
  setCurrentTask: () => {},
}

export const TasksContext = createContext<TasksContextType>(DEFAULT_CONTEXT)

export interface TasksContextType {
  isSelectingTask: boolean
  setIsSelectingTask: (isSelectingTask: boolean) => void
  tasks: Task[]
  setTasks: (tasks: Task[]) => void
  isCreating: boolean
  setIsCreating: (isCreating: boolean) => void
  newTaskName: string
  setNewTaskName: (newTaskName: string) => void
  newTaskDescription: string
  setNewTaskDescription: (newTaskDescription: string) => void
  currentTask: Task | null
  setCurrentTask: (currentTask: Task | null) => void
}

export function TasksContextProvider({ children }: { children: React.ReactNode }) {
  const [currentTask, setCurrentTask] = useState<Task | null>(initialCurrentTask())
  const [tasks, setTasks] = useState<Task[]>(initialTasks())
  const [isCreating, setIsCreating] = useState(false)
  const [newTaskName, setNewTaskName] = useState('')
  const [newTaskDescription, setNewTaskDescription] = useState('')
  const [isSelectingTask, setIsSelectingTask] = useState(currentTask === null)

  return (
    <TasksContext.Provider
      value={{
        isSelectingTask,
        setIsSelectingTask,
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
      }}
    >
      {children}
    </TasksContext.Provider>
  )
}
