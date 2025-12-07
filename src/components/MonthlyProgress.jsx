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
          <span className={classes.achievementIcon}><svg xmlns="http://www.w3.org/2000/svg" width='15px' height='15px' fill='#D65108' viewBox="0 0 384 512"><path d="M153.6 29.9l16-21.3C173.6 3.2 180 0 186.7 0 198.4 0 208 9.6 208 21.3l0 22.1c0 13.1 5.4 25.7 14.9 34.7L307.6 159C356.4 205.6 384 270.2 384 337.7 384 434 306 512 209.7 512L192 512C86 512 0 426 0 320l0-3.8c0-48.8 19.4-95.6 53.9-130.1l3.5-3.5c4.2-4.2 10-6.6 16-6.6 12.5 0 22.6 10.1 22.6 22.6L96 288c0 35.3 28.7 64 64 64s64-28.7 64-64l0-3.9c0-18-7.2-35.3-19.9-48l-38.6-38.6c-24-24-37.5-56.7-37.5-90.7 0-27.7 9-54.8 25.6-76.9z"/></svg></span>
          <span className={classes.achievementText}>{monthlyStats.streak} day streak!</span>
        </div>
      </div>
    </div>
  )
}

export default MonthlyProgress