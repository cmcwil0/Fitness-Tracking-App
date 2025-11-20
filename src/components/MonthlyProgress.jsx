import { useState } from 'react'
import classes from '../css/MonthlyProgress.module.css'

const MonthlyProgress = () => {
  const [currentMonth] = useState(new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }))
  
  // Sample data - in a real app, this would come from an API
  const monthlyStats = {
    workoutsCompleted: 18,
    workoutsPlanned: 24,
    caloriesBurned: 12500,
    avgDuration: 45, // minutes
    streak: 7
  }

  const progressPercentage = (monthlyStats.workoutsCompleted / monthlyStats.workoutsPlanned) * 100

  return (
    <div className={classes.monthlyProgressContainer}>
      <div className={classes.header}>
        <h3>Monthly Progress</h3>
        <span className={classes.month}>{currentMonth}</span>
      </div>
      
      <div className={classes.mainStat}>
        <div className={classes.progressRing}>
          <svg className={classes.progressSvg} viewBox="0 0 100 100">
            <circle
              className={classes.progressBackground}
              cx="50"
              cy="50"
              r="40"
            />
            <circle
              className={classes.progressForeground}
              cx="50"
              cy="50"
              r="40"
              style={{
                strokeDashoffset: `${251.2 - (progressPercentage / 100) * 251.2}`
              }}
            />
          </svg>
          <div className={classes.progressText}>
            <span className={classes.progressNumber}>{monthlyStats.workoutsCompleted}</span>
            <span className={classes.progressLabel}>/ {monthlyStats.workoutsPlanned}</span>
          </div>
        </div>
      </div>

      <div className={classes.statsGrid}>
        <div className={classes.statItem}>
          <div className={classes.statValue}>{monthlyStats.caloriesBurned.toLocaleString()}</div>
          <div className={classes.statLabel}>Calories Burned</div>
        </div>
        <div className={classes.statItem}>
          <div className={classes.statValue}>{monthlyStats.avgDuration}min</div>
          <div className={classes.statLabel}>Avg Duration</div>
        </div>
      </div>

      <div className={classes.achievements}>
        <div className={classes.achievementItem}>
          <span className={classes.achievementIcon}>🔥</span>
          <span className={classes.achievementText}>{monthlyStats.streak} day streak!</span>
        </div>
      </div>
    </div>
  )
}

export default MonthlyProgress