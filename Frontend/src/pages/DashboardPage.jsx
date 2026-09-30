import { useNavigate } from 'react-router-dom'

function DashboardPage() {
  const navigate = useNavigate()

  const handleLogout = () => {
    sessionStorage.removeItem('isAuthenticated')
    navigate('/login')
  }

  return (
    <div>
      <h1>Client Requests Dashboard</h1>

      <button type="button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  )
}

export default DashboardPage