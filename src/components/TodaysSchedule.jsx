import { useState, useEffect } from 'react'
import classes from '../css/TodaysSchedule.module.css'
import { NavLink } from 'react-router-dom'

const TodaysSchedule = () => {
  const [scheduledWorkouts, setScheduledWorkouts] = useState([
    { id: 1, name: 'Chest & Triceps', type: 'strength', completed: false },
    { id: 2, name: 'Cardio Run', type: 'cardio', completed: false }
  ])

  const toggleComplete = (id) => {
    setScheduledWorkouts(prev => 
      prev.map(workout => 
        workout.id === id ? { ...workout, completed: !workout.completed } : workout
      )
    )
  }

  const completedCount = scheduledWorkouts.filter(w => w.completed).length
  const totalCount = scheduledWorkouts.length

  return (
    <div className={classes.scheduleContainer}>
      <div className={classes.header}>
        <h3>Today's Schedule</h3>
        <span className={classes.progress}>{completedCount}/{totalCount}</span>
      </div>
      
      <div className={classes.workoutList}>
        {scheduledWorkouts.length === 0 ? (
          <div className={classes.noWorkouts}>
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="var(--accent-color)" viewBox="0 0 640 512">
              <path d="M96 64c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32l0 384c0 17.7-14.3 32-32 32L128 480c-17.7 0-32-14.3-32-32L96 64zM208 288l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm80 0l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm80 0l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zM208 384l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm80 0l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm80 0l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zM272 160l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16zm80-32l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm80 32l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16z"/>
            </svg>
            <p>No workouts scheduled</p>
            <NavLink to="/fitness" className={classes.addWorkoutLink}>Add Workout</NavLink>
          </div>
        ) : (
          scheduledWorkouts.map(workout => (
            <div 
              key={workout.id} 
              className={`${classes.workoutItem} ${workout.completed ? classes.completed : ''}`}
            >
              <div className={classes.workoutInfo}>
                <div className={classes.workoutName}>{workout.name}</div>
              </div>
              <div className={classes.workoutActions}>
                <div className={`${classes.typeIndicator} ${classes[workout.type]}`}>
                  {workout.type === 'strength' ? '💪' : '🏃'}
                </div>
  
              </div>
            </div>
          ))
        )}
      </div>
      
      <NavLink to="/fitness" className={classes.manageLink}>
        Manage Schedule
      </NavLink>
    </div>
  )
}

export default TodaysSchedule