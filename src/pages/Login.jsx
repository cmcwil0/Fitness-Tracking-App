import '../css/Login.css'
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'

const API_URL = import.meta.env?.VITE_API_URL || 'http://localhost:4000'

const Login = () => {
  const usernameInputRef = useRef()
  const passwordInputRef = useRef()
  const navigate = useNavigate()

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

  const handleLogin = async () => {
    const username = usernameInputRef.current.value.trim()
    const password = passwordInputRef.current.value
    if (!username || !password) return alert('Enter username and password.')

    try {
      // send as `identifier` so it works with username OR email
      const { token, user } = await request('login', { identifier: username, password })
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))
      navigate('/dashboard')
    } catch (err) {
      alert(err.message)
    }
  }

  // just redirect to the real Sign Up page
  const handleSignUp = () => {
    navigate('/signup')
  }

  return (
    <div className='login-page'>
      <div className='login-container'>
        <input className='username-input' ref={usernameInputRef} type="text" placeholder='Username...' />
        <input className='password-input' ref={passwordInputRef} type="password" placeholder='Password...' />
        <button className='login-button' onClick={handleLogin}>Login</button>
        <button className='signup-button' onClick={handleSignUp}>Sign Up</button>
      </div>
    </div>
  )
}

export default Login