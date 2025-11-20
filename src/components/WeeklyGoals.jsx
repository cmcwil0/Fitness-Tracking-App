import { useState } from 'react'
import classes from '../css/WeeklyGoals.module.css'

const WeeklyGoals = () => {
  const [goals] = useState([
    { 
      id: 1, 
      title: 'Workout Sessions', 
      current: 4, 
      target: 6, 
      icon: '💪',
      color: '#EFA00B'
    },
    { 
      id: 2, 
      title: 'Cardio Hours', 
      current: 3.5, 
      target: 5, 
      icon: '🏃',
      color: '#D65108'
    },
    { 
      id: 3, 
      title: 'Protein Goals', 
      current: 5, 
      target: 7, 
      icon: '🥩',
      color: '#22C55E'
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