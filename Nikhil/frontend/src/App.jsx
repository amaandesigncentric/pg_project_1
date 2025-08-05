import React from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/login/Login'
import Admin from './pages/admin/Admin'
import { AuthProvider } from './utils/useAuth'
import ProtectedRoutes from './utils/ProtectedRoutes'
import Unauthorized from './pages/unauthorised-access/Unauthorised'

function App() {
  return (
    <Router>
      <AuthProvider>
      <Routes>
        <Route path='/' element={<Login />}  />
        <Route 
        path='/admin' 
        element={
          <ProtectedRoutes element={<Admin />} allowedRoutes={["admin"]} />
        }
        />
        <Route 
        path='/unauthorised-access'
        element={<Unauthorized />}
        />
      </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App
