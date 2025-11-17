import classes from'../css/Dashboard.module.css'
import { useEffect, useState } from 'react'
import {NutritionCard} from './Nutrition.jsx'
import WeeklyGraph from '../components/WeeklyGraph.jsx'
import { NavLink } from 'react-router-dom'

export const getCurrentDate = () => {
  const today = new Date()
  const options = {
    weekday: 'long',
    day: 'numeric',
    month: 'short'
  }
  return today.toLocaleDateString('en-US', options)
}


const Dashboard = () => {
  const [username, setUsername] = useState('Name')
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
    <div className={`${classes.dashboardPage} ${classes.card}`}>
      <div className={`${classes.dashboardContainer} ${classes.card}`}>

        <div className={`${classes.nutritionContainer} ${classes.card}`}>
          <NutritionCard />
        </div>

        <div className={`${classes.workoutContainerCard} ${classes.card}`}>workouts</div>
        <div className={`${classes.card}`}>graph</div>
        <div className={`${classes.card}`}>Monthly Progress</div>

        <div className={`${classes.progressContainer} ${classes.card}`}>
          <div className={classes.cardHeader}>
            <div className={classes.headerText}>
              <h2>Welcome Back {username}</h2>
              <span className={classes.dateLabel}>{getCurrentDate()}</span>
            </div>
              <NavLink className={classes.profileContainer} to="/userprofile"></NavLink>
          </div>

          <div className={classes.bottomSection}>
            <WeeklyGraph title={'Activity'} />

            <div className={classes.bottomCards}>
              <div className={`${classes.streakContainer} ${classes.smallCard}`}>

                  <svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" fill="var(--accent-color)" viewBox="0 -50 448 612"><path d="M160.5-26.4c9.3-7.8 23-7.5 31.9 .9 12.3 11.6 23.3 24.4 33.9 37.4 13.5 16.5 29.7 38.3 45.3 64.2 5.2-6.8 10-12.8 14.2-17.9 1.1-1.3 2.2-2.7 3.3-4.1 7.9-9.8 17.7-22.1 30.8-22.1 13.4 0 22.8 11.9 30.8 22.1 1.3 1.7 2.6 3.3 3.9 4.8 10.3 12.4 24 30.3 37.7 52.4 27.2 43.9 55.6 106.4 55.6 176.6 0 123.7-100.3 224-224 224S0 411.7 0 288c0-91.1 41.1-170 80.5-225 19.9-27.7 39.7-49.9 54.6-65.1 8.2-8.4 16.5-16.7 25.5-24.2zM225.7 416c25.3 0 47.7-7 68.8-21 42.1-29.4 53.4-88.2 28.1-134.4-4.5-9-16-9.6-22.5-2l-25.2 29.3c-6.6 7.6-18.5 7.4-24.7-.5-17.3-22.1-49.1-62.4-65.3-83-5.4-6.9-15.2-8-21.5-1.9-18.3 17.8-51.5 56.8-51.5 104.3 0 68.6 50.6 109.2 113.7 109.2z"/></svg>
                  <label>Streak</label>
                  <div className={classes.streakLabel}>{30}</div>

              </div>

              <div className={`${classes.smallCard}`}>

              </div>
            </div>
          </div>
          
    
        </div>

      </div>
    </div>
  )
}

export default Dashboard