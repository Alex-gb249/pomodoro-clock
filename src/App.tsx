import './App.css'
import { Header } from './components/header/Header'
import { Clock } from './components/clock/Clock'

function App() {

  return (
    <>
      <div className='all'>
        <Header />
        <div className='d-flex justify-content-center align-items-center'>
          <Clock />
        </div>
        <div className='footer'> footer</div>
      </div>
    </>
  )
}

export default App
