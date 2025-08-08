import React from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/login/Login'
import Admin from './pages/admin/Admin'
import { AuthProvider } from './context/useAuth'
import ProtectedRoutes from './utils/ProtectedRoutes'
import Unauthorized from './pages/unauthorised-access/Unauthorised'
import { SocketProvider } from './context/socketContext'

function App() {
  return (
    <Router>
      <AuthProvider>
        <SocketProvider>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route
            path='/admin'
            element={
              // <ProtectedRoutes element={<Admin />} allowedRoutes={["admin"]} />
              <Admin />
            }
          />
          <Route
            path='/unauthorised-access'
            element={<Unauthorized />}
          />
        </Routes>
        </SocketProvider>
      </AuthProvider>
    </Router>
  )
}

export default App
