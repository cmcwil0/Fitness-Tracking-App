import { useState } from 'react'
import classes from '../css/RecentActivity.module.css'

const RecentActivity = () => {
  const [activities] = useState([
    {
      id: 1,
      type: 'workout',
      title: 'Chest & Triceps',
      description: '45 min • 350 cal burned',
      time: '2 hours ago',
      icon: '💪'
    },
    {
      id: 2,
      type: 'nutrition',
      title: 'Lunch Logged',
      description: '650 calories • High protein',
      time: '3 hours ago',
      icon: '🍽️'
    },
    {
      id: 3,
      type: 'hydration',
      title: 'Water Goal Reached',
      description: '2.5L consumed today',
      time: '1 hour ago',
      icon: '💧'
    },
    {
      id: 4,
      type: 'achievement',
      title: 'New Personal Record!',
      description: 'Bench Press: 185 lbs',
      time: '5 hours ago',
      icon: '🏆'
    },
    {
      id: 5,
      type: 'workout',
      title: 'Morning Run',
      description: '30 min • 5.2 km • 280 cal',
      time: 'Yesterday',
      icon: '🏃'
    }
  ])

  const getActivityTypeColor = (type) => {
    switch (type) {
      case 'workout': return '#EFA00B'
      case 'nutrition': return '#D65108'
      case 'hydration': return '#758A93'
      case 'achievement': return '#9A7AA0'
      default: return 'var(--accent-color)'
    }
  }

  return (
    <div className={classes.recentActivityContainer}>
      <div className={classes.header}>
        <h3>Recent Activity</h3>
      </div>
      
      <div className={classes.activityList}>
        {activities.map(activity => (
          <div key={activity.id} className={classes.activityItem}>
            <div 
              className={classes.activityIcon}
              style={{ backgroundColor: getActivityTypeColor(activity.type) }}
            >
              {activity.icon}
            </div>
            <div className={classes.activityContent}>
              <div className={classes.activityTitle}>{activity.title}</div>
              <div className={classes.activityDescription}>{activity.description}</div>
            </div>
            <div className={classes.activityTime}>{activity.time}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RecentActivity