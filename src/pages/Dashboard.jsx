import classes from'../css/Dashboard.module.css'
import { useEffect, useState } from 'react'
import {NutritionCard} from './Nutrition.jsx'
import WeeklyGraph from '../components/WeeklyGraph.jsx'
import { NavLink } from 'react-router-dom'
import FitnessCircle from '../components/FitnessCircle.jsx'
import TodaysSchedule from '../components/TodaysSchedule.jsx'
import MonthlyProgress from '../components/MonthlyProgress.jsx'
import WeeklyGoals from '../components/WeeklyGoals.jsx'
import RecentActivity from '../components/RecentActivity.jsx'
import QuickActions from '../components/QuickActions.jsx'
import TotalTimeCard from '../components/TotalTimeCard.jsx'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

export const getCurrentDate = () => {
  const today = new Date()
  const options = { weekday: 'long', day: 'numeric', month: 'short' }
  return today.toLocaleDateString('en-US', options)
}

const API = import.meta.env?.VITE_API_URL || 'http://localhost:4000'

const Dashboard = () => {
  const [username, setUsername] = useState('Name')
  const [streak, setStreak] = useState('num')

  const [calorieTarget, setCalorieTarget] = useState(0)
  const [todayCalories, setTodayCalories] = useState(0)

  useEffect(() => {
    try {
      const cached = localStorage.getItem('user')
      if (cached) {
        const u = JSON.parse(cached)
        if (u?.username) setUsername(u.username)
      }
    } catch {}

    const token = localStorage.getItem('token')
    if (token) {
      fetch(`${API}/api/auth/me`, { headers: { Authorization: `Bearer ${token}` } })
        .then(r => (r.ok ? r.json() : null))
        .then(data => {
          if (data?.user?.username) {
            setUsername(data.user.username)
            localStorage.setItem('user', JSON.stringify(data.user))
          }
        })
        .catch(() => {})
    }
  }, [])

  const extractCalories = (payload) => {
    if (!payload) return 0
    if (typeof payload.calories === 'number') return payload.calories
    if (payload.totals && typeof payload.totals.calories === 'number') {
      return payload.totals.calories
    }
    if (Array.isArray(payload.items)) {
      return payload.items.reduce(
        (sum, it) => sum + Number(it.calories || 0) * Number(it.quantity || 1),
        0
      )
    }
    return 0
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) return

    const load = async () => {
      try {
        const [gRes, dRes] = await Promise.all([
          fetch(`${API}/api/goals/me`, { headers: { Authorization: `Bearer ${token}` } }),
          fetch(`${API}/api/diary/today`, { headers: { Authorization: `Bearer ${token}` } })
        ])

        if (gRes.ok) {
          const g = await gRes.json()
          const tgt = Number(g?.calorie_target ?? g?.goal?.calorie_target ?? 0)
          if (Number.isFinite(tgt) && tgt > 0) setCalorieTarget(tgt)
        }

        if (dRes.ok) {
          const d = await dRes.json()
          setTodayCalories(extractCalories(d))
        }
      } catch {
      }
    }

    load()

    const onChanged = (e) => {
      if (e?.detail?.calories != null) {
        setTodayCalories(Number(e.detail.calories) || 0)
      } else {
        load()
      }
    }
    window.addEventListener('diary:changed', onChanged)
    return () => window.removeEventListener('diary:changed', onChanged)
  }, [])

  return (
    <div className={`${classes.dashboardPage} ${classes.card}`}>
      <div className={`${classes.dashboardContainer} ${classes.card}`}>

        {}
        <div className={`${classes.nutritionContainer} ${classes.card}`}>
          <div style={{ width: '55%', margin: '0 auto' }}>
            <CircularProgressbar
              value={todayCalories}
              maxValue={calorieTarget > 0 ? calorieTarget : 1}
              text={`${todayCalories}/${calorieTarget || 0}`}
              styles={buildStyles({})}
            />
          </div>
        </div>

        {}
        <div className={`${classes.workoutContainer} ${classes.card}`}>
          <div className={classes.scheduledToday}>
            <TodaysSchedule />
          </div>

          {}
          <NavLink
            to="/fitness"
            className={classes.fitnessCircleWrapper}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <FitnessCircle />
          </NavLink>
        </div>

        <div className={`${classes.card} ${classes.weeklyGoalsCard}`}>
          <WeeklyGoals />
        </div>
        <div className={`${classes.card} ${classes.monthlyProgressCard}`}>
          <MonthlyProgress />
        </div>

        <div className={`${classes.progressContainer} ${classes.card}`}>
          <div className={classes.cardHeader}>
            <div className={classes.headerText}>
              <h2>Welcome Back {username}</h2>
              <span className={classes.dateLabel}>{getCurrentDate()}</span>
            </div>
            <NavLink className={classes.profileContainer} to="/userprofile"></NavLink>
          </div>

          <div className={classes.bottomSection}>
            <div className={classes.activitySection}>
              <div className={`${classes.recentActivityCard} ${classes.card}`}>
                <RecentActivity />
              </div>
            </div>

            <div className={classes.bottomCards}>
              <div className={classes.topRow}>
                <div className={`${classes.streakContainer} ${classes.smallCard} ${classes.squareCard}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" fill="var(--accent-color)" viewBox="0 -50 448 612"><path d="M160.5-26.4c9.3-7.8 23-7.5 31.9 .9 12.3 11.6 23.3 24.4 33.9 37.4 13.5 16.5 29.7 38.3 45.3 64.2 5.2-6.8 10-12.8 14.2-17.9 1.1-1.3 2.2-2.7 3.3-4.1 7.9-9.8 17.7-22.1 30.8-22.1 13.4 0 22.8 11.9 30.8 22.1 1.3 1.7 2.6 3.3 3.9 4.8 10.3 12.4 24 30.3 37.7 52.4 27.2 43.9 55.6 106.4 55.6 176.6 0 123.7-100.3 224-224 224S0 411.7 0 288c0-91.1 41.1-170 80.5-225 19.9-27.7 39.7-49.9 54.6-65.1 8.2-8.4 16.5-16.7 25.5-24.2zM225.7 416c25.3 0 47.7-7 68.8-21 42.1-29.4 53.4-88.2 28.1-134.4-4.5-9-16-9.6-22.5-2l-25.2 29.3c-6.6 7.6-18.5 7.4-24.7-.5-17.3-22.1-49.1-62.4-65.3-83-5.4-6.9-15.2-8-21.5-1.9-18.3 17.8-51.5 56.8-51.5 104.3 0 68.6 50.6 109.2 113.7 109.2z"/></svg>
                  <label>Streak</label>
                  <div className={classes.streakLabel}>{30}</div>
                </div>

                <div className={`${classes.totalTimeContainer} ${classes.smallCard} ${classes.squareCard}`}>
                  <TotalTimeCard />
                </div>
              </div>

              <div className={`${classes.quickActionsCard} ${classes.card}`}>
                <QuickActions />
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Dashboard