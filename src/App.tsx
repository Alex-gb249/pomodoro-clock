import './App.css'
import { Header } from './components/header/Header'
import { Clock } from './components/clock/Clock'
import { Footer } from './components/footer/Footer'

function App() {

  return (
    <>
      <div className='all'>
        <Header />
        <div className='d-flex justify-content-center align-items-center'>
          <Clock />
        </div>
        <Footer />
      </div>
    </>
  )
}

export default App
