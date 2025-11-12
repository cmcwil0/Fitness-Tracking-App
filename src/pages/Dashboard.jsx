import classes from'../css/Dashboard.module.css'
import { useEffect, useState } from 'react'
import {NutritionCard} from './Nutrition.jsx'

const Dashboard = () => {
  const [username, setUsername] = useState('Name')
  const [streak, setStreak] = useState('num')

  const getCurrentDate = () => {
    const today = new Date()
    const options = {
      weekday: 'long',
      day: 'numeric',
      month: 'short'
    }
    return today.toLocaleDateString('en-US', options)
  }

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
    <div className={`${classes.dashboardPage} ${classes.card}`}>
      <div className={`${classes.dashboardContainer} ${classes.card}`}>

        <div className={`${classes.nutritionContainer} ${classes.card}`}>
          <NutritionCard />
        </div>

        <div className={`${classes.workoutContainerCard} ${classes.card}`}>workouts</div>
        <div className={`${classes.card}`}>graph</div>
        <div className={`${classes.card}`}>another</div>

        <div className={`${classes.progressContainer} ${classes.card}`}>
          {/* pull from database for name below and similar data */}
          <div className={classes.cardHeader}>
            <div className={classes.headerText}>
              <h2>Welcome Back {username}</h2>
              <span className={classes.dateLabel}>{getCurrentDate()}</span>
            </div>
            <div className={classes.profileContainer}></div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Dashboard