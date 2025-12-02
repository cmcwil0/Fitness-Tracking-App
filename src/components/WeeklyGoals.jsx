import { useState } from 'react'
import classes from '../css/WeeklyGoals.module.css'

const WeeklyGoals = () => {
  const [goals] = useState([
    { 
      id: 1, 
      title: 'Workout Sessions', 
      current: 4, 
      target: 6, 
      icon: <svg xmlns="http://www.w3.org/2000/svg" width='30px' height='30px' fill='#EFA00B' viewBox="0 0 640 512"><path d="M96 112c0-26.5 21.5-48 48-48s48 21.5 48 48l0 112 256 0 0-112c0-26.5 21.5-48 48-48s48 21.5 48 48l0 16 16 0c26.5 0 48 21.5 48 48l0 48c17.7 0 32 14.3 32 32s-14.3 32-32 32l0 48c0 26.5-21.5 48-48 48l-16 0 0 16c0 26.5-21.5 48-48 48s-48-21.5-48-48l0-112-256 0 0 112c0 26.5-21.5 48-48 48s-48-21.5-48-48l0-16-16 0c-26.5 0-48-21.5-48-48l0-48c-17.7 0-32-14.3-32-32s14.3-32 32-32l0-48c0-26.5 21.5-48 48-48l16 0 0-16z"/></svg>,
      color: '#EFA00B'
    },
    { 
      id: 2, 
      title: 'Cardio Hours', 
      current: 3.5, 
      target: 5, 
      icon: <svg xmlns="http://www.w3.org/2000/svg" width='30px' height='30px' fill='#758A93' viewBox="-100 -60 548 612"><path d="M256.5-32a56 56 0 1 1 0 112 56 56 0 1 1 0-112zM123.6 176c-3.3 0-6.2 2-7.4 5L94.2 235.9c-6.6 16.4-25.2 24.4-41.6 17.8s-24.4-25.2-17.8-41.6l21.9-54.9C67.7 129.9 94.1 112 123.6 112l97.3 0c28.5 0 54.8 15.1 69.1 39.7l32.8 56.3 61.6 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-61.6 0c-22.8 0-43.8-12.1-55.3-31.8l-10-17.1-20.7 70.4 75.4 22.6c27.7 8.3 41.8 39 30.1 65.5L285.7 509c-7.2 16.2-26.1 23.4-42.2 16.2s-23.4-26.1-16.2-42.2l49.2-110.8-95.9-28.8c-32.7-9.8-52-43.7-43.7-76.8l22.7-90.6-35.9 0zm-8 181c13.3 14.9 30.7 26.3 51.2 32.4l4.7 1.4-6.9 19.3c-5.8 16.3-16 30.8-29.3 41.8L52.9 519.8c-13.6 11.2-33.8 9.3-45-4.3s-9.3-33.8 4.3-45l82.4-67.9c4.5-3.7 7.8-8.5 9.8-13.9L115.6 357z"/></svg>,
      color: '#758A93'
    },
    { 
      id: 3, 
      title: 'Protein Goals', 
      current: 5, 
      target: 7, 
      icon: <svg xmlns="http://www.w3.org/2000/svg" width='25px' height='25px' fill='#D65108' viewBox="0 0 512 512"><path d="M0 176c0-35.3 28.7-64 64-64 .5 0 1.1 0 1.6 0 7.4-36.5 39.7-64 78.4-64 15 0 29 4.1 40.9 11.2 13.3-25.7 40.1-43.2 71.1-43.2s57.8 17.6 71.1 43.2c12-7.1 26-11.2 40.9-11.2 38.7 0 71 27.5 78.4 64 .5 0 1.1 0 1.6 0 35.3 0 64 28.7 64 64 0 11.7-3.1 22.6-8.6 32L8.6 208C3.1 198.6 0 187.7 0 176zM0 283.4C0 268.3 12.3 256 27.4 256l457.1 0c15.1 0 27.4 12.3 27.4 27.4 0 70.5-44.4 130.7-106.7 154.1L403.5 452c-2 16-15.6 28-31.8 28l-231.5 0c-16.1 0-29.8-12-31.8-28l-1.8-14.4C44.4 414.1 0 353.9 0 283.4z"/></svg>,
      color: '#D65108'
    },

  ])

  const getProgressPercentage = (current, target) => Math.min((current / target) * 100, 100)

  return (
    <div className={classes.weeklyGoalsContainer}>
      <div className={classes.header}>
        <h3>Weekly Goals</h3>
        <span className={classes.weekProgress}>Day 4/7</span>
      </div>
      
      <div className={classes.goalsList}>
        {goals.map(goal => (
          <div key={goal.id} className={classes.goalItem}>
            <div className={classes.goalHeader}>
              <span className={classes.goalIcon}>{goal.icon}</span>
              <div className={classes.goalInfo}>
                <div className={classes.goalTitle}>{goal.title}</div>
                <div className={classes.goalProgress}>
                  {goal.current} / {goal.target}
                  {goal.title.includes('Hours') || goal.title.includes('Water') ? '' : ''}
                </div>
              </div>
              <div className={classes.goalPercentage}>
                {Math.round(getProgressPercentage(goal.current, goal.target))}%
              </div>
            </div>
            <div className={classes.progressBarContainer}>
              <div 
                className={classes.progressBar}
                style={{ 
                  width: `${getProgressPercentage(goal.current, goal.target)}%`,
                  backgroundColor: goal.color
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className={classes.summary}>
        <div className={classes.summaryItem}>
          <span className={classes.summaryLabel}>Goals Met:</span>
          <span className={classes.summaryValue}>
            {goals.filter(g => g.current >= g.target).length}/{goals.length}
          </span>
        </div>
      </div>
    </div>
  )
}

export default WeeklyGoals