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
        <div className={classes.icon}><svg xmlns="http://www.w3.org/2000/svg" width='20px' height='20px' fill='var(--accent-color)' viewBox="0 0 512 512"><path d="M256 0a256 256 0 1 1 0 512 256 256 0 1 1 0-512zM232 120l0 136c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2 280 120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"/></svg></div>
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