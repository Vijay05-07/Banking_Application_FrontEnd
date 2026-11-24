import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/public/Home'
import Login from './pages/auth/login/Login'
import ProtectedRoute from './routes/ProtectedRoute'
import Register from './pages/auth/register/Register'
import Dashboard from './pages/customer/dashboard/Dashboard'
import DashboardLayout from './components/dashboardLayout/DashboardLayout'
function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route element={<ProtectedRoute/>}>
           <Route element={<DashboardLayout />}>
              <Route path="/dashboard" element={<Dashboard />}>

              </Route>
           </Route>
        </Route>
      </Routes>
    </>
  )
}

export default App
