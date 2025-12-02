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
                  {workout.type === 'strength' ? <svg xmlns="http://www.w3.org/2000/svg" fill='#EFA00B' viewBox="0 0 640 512"><path d="M96 112c0-26.5 21.5-48 48-48s48 21.5 48 48l0 112 256 0 0-112c0-26.5 21.5-48 48-48s48 21.5 48 48l0 16 16 0c26.5 0 48 21.5 48 48l0 48c17.7 0 32 14.3 32 32s-14.3 32-32 32l0 48c0 26.5-21.5 48-48 48l-16 0 0 16c0 26.5-21.5 48-48 48s-48-21.5-48-48l0-112-256 0 0 112c0 26.5-21.5 48-48 48s-48-21.5-48-48l0-16-16 0c-26.5 0-48-21.5-48-48l0-48c-17.7 0-32-14.3-32-32s14.3-32 32-32l0-48c0-26.5 21.5-48 48-48l16 0 0-16z"/></svg> : <svg xmlns="http://www.w3.org/2000/svg" width='30px' height='30px' fill='#758A93' viewBox="-100 -60 548 612"><path d="M256.5-32a56 56 0 1 1 0 112 56 56 0 1 1 0-112zM123.6 176c-3.3 0-6.2 2-7.4 5L94.2 235.9c-6.6 16.4-25.2 24.4-41.6 17.8s-24.4-25.2-17.8-41.6l21.9-54.9C67.7 129.9 94.1 112 123.6 112l97.3 0c28.5 0 54.8 15.1 69.1 39.7l32.8 56.3 61.6 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-61.6 0c-22.8 0-43.8-12.1-55.3-31.8l-10-17.1-20.7 70.4 75.4 22.6c27.7 8.3 41.8 39 30.1 65.5L285.7 509c-7.2 16.2-26.1 23.4-42.2 16.2s-23.4-26.1-16.2-42.2l49.2-110.8-95.9-28.8c-32.7-9.8-52-43.7-43.7-76.8l22.7-90.6-35.9 0zm-8 181c13.3 14.9 30.7 26.3 51.2 32.4l4.7 1.4-6.9 19.3c-5.8 16.3-16 30.8-29.3 41.8L52.9 519.8c-13.6 11.2-33.8 9.3-45-4.3s-9.3-33.8 4.3-45l82.4-67.9c4.5-3.7 7.8-8.5 9.8-13.9L115.6 357z"/></svg>}
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