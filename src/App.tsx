import './App.css'
import { Header } from './components/header/Header'
import { Footer } from './components/footer/Footer'
import { TaskManager } from './components/task-manager/TaskManager'

function App() {
  return (
    <>
      <div className='all prevent-select'>
        <Header />
        <div className='d-flex justify-content-center align-items-center'>
          <TaskManager />
        </div>
        <Footer />
      </div>
    </>
  )
}

export default App
