import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import './index.css'
import App from './App.tsx'
import { PomodoroProvider } from './contexts/Pomodoro.tsx'
import { TasksContextProvider } from './contexts/Tasks.tsx'
import { ThemeContextProvider } from './contexts/Theme.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeContextProvider>
      <PomodoroProvider>
        <TasksContextProvider>
          <App />
        </TasksContextProvider>
      </PomodoroProvider>
    </ThemeContextProvider>
  </StrictMode>,
)
