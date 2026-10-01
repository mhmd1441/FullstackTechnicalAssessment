import { useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import './App.css'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => sessionStorage.getItem('isAuthenticated') === 'true'
  )

  return (
    <Routes>
      <Route
        path="/login"
        element={
          <LoginPage onLogin={() => setIsAuthenticated(true)} />
        }
      />

      <Route
        path="/dashboard"
        element={
          isAuthenticated
            ? <DashboardPage onLogout={() => setIsAuthenticated(false)} />
            : <Navigate to="/login" replace />
        }
      />

      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

export default App