import '../css/Login.css'
import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const API_URL = import.meta.env?.VITE_API_URL || 'http://localhost:4000'

const Login = () => {
  const usernameInputRef = useRef()
  const passwordInputRef = useRef()
  const navigate = useNavigate()
  const [showForgot, setShowForgot] = useState(false)
  const [forgotEmail, setForgotEmail] = useState('')
  const [forgotMessage, setForgotMessage] = useState('')
  const [forgotError, setForgotError] = useState('')
  const [forgotLoading, setForgotLoading] = useState(false)

  const request = async (path, body) => {
    const res = await fetch(`${API_URL}/api/auth/${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data?.message || 'Request failed')
    return data
  }

  // 🔹 Check if the logged-in user already has a saved goal
  const userHasGoal = async (token) => {
    try {
      const res = await fetch(`${API_URL}/api/goals/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!res.ok) {
        // 404 or any non-OK = treat as no goal
        return false
      }

      const data = await res.json()
      const goal = data.goal || data
      return !!(goal && goal.calorie_target != null)
    } catch (err) {
      console.error('Error checking goals:', err)
      return false
    }
  }

  const handleLogin = async () => {
    const username = usernameInputRef.current.value.trim()
    const password = passwordInputRef.current.value
    if (!username || !password) return alert('Enter username and password.')

    try {
      const { token, user } = await request('login', { identifier: username, password })
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))

      // 🔹 Decide where to send the user based on whether they have a goal
      const hasGoal = await userHasGoal(token)
      if (hasGoal) {
        navigate('/dashboard')
      } else {
        navigate('/goalform')
      }
    } catch (err) {
      alert(err.message)
    }
  }

  const handleSignUp = () => {
    navigate('/signup')
  }

  const handleForgotUsername = async () => {
    setForgotMessage('')
    setForgotError('')

    const email = forgotEmail.trim()
    if (!email) {
      setForgotError('Please enter the email you used when signing up.')
      return
    }

    try {
      setForgotLoading(true)
      const data = await request('forgot-username', { email })
      setForgotMessage(`Your username is: ${data.username}`)
    } catch (err) {
      setForgotError(err.message)
    } finally {
      setForgotLoading(false)
    }
  }

  const returnToLogin = () => {
    setShowForgot(false)
    setForgotEmail('')
    setForgotMessage('')
    setForgotError('')
  }

  return (
    <div className='login-page'>
      <div className='login-container'>

        {!showForgot ? (
          <>
            {}
            <input
              className='username-input'
              ref={usernameInputRef}
              type="text"
              placeholder='Username...'
            />
            <input
              className='password-input'
              ref={passwordInputRef}
              type="password"
              placeholder='Password...'
            />
            <button className='login-button' onClick={handleLogin}>Login</button>
            <button className='signup-button' onClick={handleSignUp}>Sign Up</button>

            {}
            <button
              type="button"
              onClick={() => setShowForgot(true)}
              style={{
                background: 'transparent',
                border: 'none',
                padding: 0,
                marginTop: '10px',
                color: 'inherit',
                textDecoration: 'underline',
                cursor: 'pointer',
                fontSize: '0.9rem',
              }}
            >
              Forgot username?
            </button>
          </>
        ) : (
          <>
            {}
            <input
              className='username-input'
              type="email"
              placeholder='Email you used to sign up...'
              value={forgotEmail}
              onChange={(e) => setForgotEmail(e.target.value)}
            />
            <button
              className='login-button'
              style={{ marginTop: '8px' }}
              onClick={handleForgotUsername}
              disabled={forgotLoading}
            >
              {forgotLoading ? 'Checking...' : 'Find Username'}
            </button>

            {forgotMessage && (
              <p style={{ marginTop: '8px' }}>{forgotMessage}</p>
            )}
            {forgotError && (
              <p style={{ marginTop: '8px', color: '#ff6b6b' }}>{forgotError}</p>
            )}

            <button
              type="button"
              className='signup-button'
              style={{ marginTop: '12px' }}
              onClick={returnToLogin}
            >
              Return to Login
            </button>
          </>
        )}

      </div>
    </div>
  )
}

export default Login