import { useState, useEffect } from 'react'
import classes from '../css/TotalTimeCard.module.css'

const TotalTimeCard = () => {
  const [timeToday, setTimeToday] = useState(45)

  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    if (hours > 0) {
      return `${hours}h ${mins}m`
    }
    return `${mins}m`
  }

  return (
    <div className={classes.totalTimeContainer}>
      <div className={classes.header}>
        <div className={classes.icon}>⏱️</div>
        <div className={classes.title}>Total Time</div>
      </div>

      <div className={classes.mainStat}>
        <div className={classes.timeValue}>{formatTime(timeToday)}</div>
        <div className={classes.timeLabel}>Today</div>
      </div>

      
    </div>
  )
}

export default TotalTimeCard