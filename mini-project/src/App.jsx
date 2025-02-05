import { useState } from 'react'
import './App.css'
import Login from './components/login'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Login/>
      <Routes>
        <Route path='/home' element={<Login/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
