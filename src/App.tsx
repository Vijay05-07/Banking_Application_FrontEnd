import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/public/Home'
import Login from './pages/auth/Login'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
      </Routes>
      {/* <Home /> */}
    </>
  )
}

export default App
