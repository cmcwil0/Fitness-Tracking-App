import '../css/Dashboard.css'
import ProgressRing from '../components/ProgressRing'
import { useEffect, useState } from 'react'

const Dashboard = () => {
  const [username, setUsername] = useState('name')
  const [streak, setStreak] = useState('num')

  useEffect(() => {
    try {
      const cached = localStorage.getItem('user')
      if (cached) {
        const u = JSON.parse(cached)
        if (u?.username) setUsername(u.username)
      }
    } catch { /* ignore parse errors */ }

    const token = localStorage.getItem('token')
    const API_URL = import.meta.env?.VITE_API_URL || 'http://localhost:4000'
    if (token) {
      fetch(`${API_URL}/api/auth/me`, {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(r => (r.ok ? r.json() : null))
        .then(data => {
          if (data?.user?.username) {
            setUsername(data.user.username)
            localStorage.setItem('user', JSON.stringify(data.user))
          }
          // TODO: add a real streak endpoint/field, set it here:
          // setStreak(data.user.streak)
        })
        .catch(() => {})
    }
  }, [])

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        <div className='nutrition-container card'>
          <div>calories: </div>
        </div>
        <div className="progress-container card">
          {/* pull from database for name below and similar data */}
          <h1>Welcome Back {username}</h1>
          <h2>Streak {streak}</h2>
        </div>
        <div className='workout-container card'>workouts</div>
        <div className='card'>graph</div>
        <div className='card'>another</div>
      </div>
    </div>
  )
}

export default Dashboard