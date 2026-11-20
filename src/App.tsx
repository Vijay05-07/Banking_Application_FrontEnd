import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/public/Home'
import Login from './pages/auth/login/Login'
import Register from './pages/auth/register/Register'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
      </Routes>
    </>
  )
}

export default App
