import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function LoginPage({ onLogin }) {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    setError('')

    if (
      email === 'najahakworld@gmail.com' &&
      password === 'najah123'
    ) {
      sessionStorage.setItem('isAuthenticated', 'true')
      onLogin()
      navigate('/dashboard')
      return
    }

    setError('Invalid email or password.')
  }

  return (
    <main className="login-page">
      <div className="login-card">
        <div className="login-brand">Najahak</div>

        <h1>Welcome back</h1>
        <p className="login-subtitle">
          Sign in to manage client requests.
        </p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@company.com"
            required
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Enter your password"
            required
          />

          {error && <p className="form-error">{error}</p>}

          <button className="primary-button login-button" type="submit">
            Sign in
          </button>
        </form>

        <div className="demo-credentials">
          <strong>Demo account</strong>
          <span>najahakworld@gmail.com</span>
          <span>Password: najah123</span>
        </div>
      </div>
    </main>
  )
}

export default LoginPage