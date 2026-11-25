import axios from 'axios'
import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import './App.css'
import Home from './pages/public/Home'
import Login from './pages/auth/login/Login'
import ProtectedRoute from './routes/ProtectedRoute'
import Register from './pages/auth/register/Register'
import Dashboard from './pages/customer/dashboard/Dashboard'
import DashboardLayout from './components/dashboardLayout/DashboardLayout'
import { authCheckCompleted, setAuthenticated } from './store/authSlice'
import { authService } from './services/authservice'
import tokenManager from './services/tokenManager'
import type { AppDispatch } from './store/store'

function App() {
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    let active = true
    const sessionVersion = tokenManager.getSessionVersion()

    const restoreAuth = async () => {
      try {
        await authService.restoreSession()

        if (active && tokenManager.getSessionVersion() === sessionVersion) {
          dispatch(setAuthenticated(true))
        }
      } catch (error: unknown) {
        if (tokenManager.getSessionVersion() === sessionVersion) {
          tokenManager.clearTokens()

          if (active) {
            dispatch(setAuthenticated(false))
          }

          const isExpectedUnauthenticated =
            axios.isAxiosError(error) &&
            (error.response?.status === 401 || error.response?.status === 403)

          if (!isExpectedUnauthenticated) {
            console.error('Unable to restore the authentication session:', error)
          }
        }
      } finally {
        if (active) {
          dispatch(authCheckCompleted())
        }
      }
    }

    void restoreAuth()

    return () => {
      active = false
    }
  }, [dispatch])

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
