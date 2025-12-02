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
      icon: <svg xmlns="http://www.w3.org/2000/svg" width='24px' height='24px' viewBox="0 0 640 512"><path d="M96 112c0-26.5 21.5-48 48-48s48 21.5 48 48l0 112 256 0 0-112c0-26.5 21.5-48 48-48s48 21.5 48 48l0 16 16 0c26.5 0 48 21.5 48 48l0 48c17.7 0 32 14.3 32 32s-14.3 32-32 32l0 48c0 26.5-21.5 48-48 48l-16 0 0 16c0 26.5-21.5 48-48 48s-48-21.5-48-48l0-112-256 0 0 112c0 26.5-21.5 48-48 48s-48-21.5-48-48l0-16-16 0c-26.5 0-48-21.5-48-48l0-48c-17.7 0-32-14.3-32-32s14.3-32 32-32l0-48c0-26.5 21.5-48 48-48l16 0 0-16z"/></svg>
    },
    {
      id: 2,
      type: 'nutrition',
      title: 'Lunch Logged',
      description: '650 calories • High protein',
      time: '3 hours ago',
      icon: <svg xmlns="http://www.w3.org/2000/svg" width='24px' height='24px' viewBox="0 0 512 512"><path d="M0 176c0-35.3 28.7-64 64-64 .5 0 1.1 0 1.6 0 7.4-36.5 39.7-64 78.4-64 15 0 29 4.1 40.9 11.2 13.3-25.7 40.1-43.2 71.1-43.2s57.8 17.6 71.1 43.2c12-7.1 26-11.2 40.9-11.2 38.7 0 71 27.5 78.4 64 .5 0 1.1 0 1.6 0 35.3 0 64 28.7 64 64 0 11.7-3.1 22.6-8.6 32L8.6 208C3.1 198.6 0 187.7 0 176zM0 283.4C0 268.3 12.3 256 27.4 256l457.1 0c15.1 0 27.4 12.3 27.4 27.4 0 70.5-44.4 130.7-106.7 154.1L403.5 452c-2 16-15.6 28-31.8 28l-231.5 0c-16.1 0-29.8-12-31.8-28l-1.8-14.4C44.4 414.1 0 353.9 0 283.4z"/></svg>
    },
    {
      id: 3,
      type: 'hydration',
      title: 'Water Goal Reached',
      description: '2.5L consumed today',
      time: '1 hour ago',
      icon: <svg xmlns="http://www.w3.org/2000/svg" width='24px' height='24px' viewBox="0 0 384 512"><path d="M192 512c-88.4 0-160-71.6-160-160 0-15.3 10.8-36.4 32.3-63.7 21.2-27 49.5-54.8 78.4-81.3 30.4-27.8 60.6-53.6 83.4-73.6 10.1-8.9 18.2-16.3 24.1-21.8 1.8-1.7 3.4-3.2 4.8-4.5 1.4 1.3 3 2.8 4.8 4.5 5.9 5.5 14 12.9 24.1 21.8 22.8 20 53 45.8 83.4 73.6 28.9 26.5 57.2 54.3 78.4 81.3C362.8 315.6 373.6 336.7 373.6 352 373.6 440.4 302 512 213.6 512l-21.6 0z"/></svg>
    },
    {
      id: 4,
      type: 'achievement',
      title: 'New Personal Record!',
      description: 'Bench Press: 185 lbs',
      time: '5 hours ago',
      icon: <svg xmlns="http://www.w3.org/2000/svg" width='24px' height='24px' viewBox="0 0 576 512"><path d="M400 0L176 0c-26.5 0-48.1 21.8-47.1 48.2 .2 5.3 .4 10.6 .7 15.8L24 64C10.7 64 0 74.7 0 88c0 92.6 33.5 157 78.5 200.7 44.3 43.1 98.3 64.8 138.1 75.8 23.4 6.5 39.4 26 39.4 45.6 0 20.9-17 37.9-37.9 37.9L192 448c-17.7 0-32 14.3-32 32s14.3 32 32 32l192 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-26.1 0C337 448 320 431 320 410.1c0-19.6 15.9-39.2 39.4-45.6 39.9-11 93.9-32.7 138.2-75.8C542.5 245 576 180.6 576 88c0-13.3-10.7-24-24-24L446.4 64c.3-5.2 .5-10.4 .7-15.8C448.1 21.8 426.5 0 400 0zM48.9 112l84.4 0c9.1 90.1 29.2 150.3 51.9 190.6-24.9-11-50.8-26.5-73.2-48.3-32-31.1-58-76-63-142.3zM464.1 254.3c-22.4 21.8-48.3 37.3-73.2 48.3 22.7-40.3 42.8-100.5 51.9-190.6l84.4 0c-5.1 66.3-31.1 111.2-63 142.3z"/></svg>
    },
    {
      id: 5,
      type: 'workout',
      title: 'Morning Run',
      description: '30 min • 5.2 km • 280 cal',
      time: 'Yesterday',
      icon: <svg xmlns="http://www.w3.org/2000/svg" width='24px' height='24px' viewBox="0 0 448 512"><path d="M256.5-32a56 56 0 1 1 0 112 56 56 0 1 1 0-112zM123.6 176c-3.3 0-6.2 2-7.4 5L94.2 235.9c-6.6 16.4-25.2 24.4-41.6 17.8s-24.4-25.2-17.8-41.6l21.9-54.9C67.7 129.9 94.1 112 123.6 112l97.3 0c28.5 0 54.8 15.1 69.1 39.7l32.8 56.3 61.6 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-61.6 0c-22.8 0-43.8-12.1-55.3-31.8l-10-17.1-20.7 70.4 75.4 22.6c27.7 8.3 41.8 39 30.1 65.5L285.7 509c-7.2 16.2-26.1 23.4-42.2 16.2s-23.4-26.1-16.2-42.2l49.2-110.8-95.9-28.8c-32.7-9.8-52-43.7-43.7-76.8l22.7-90.6-35.9 0zm-8 181c13.3 14.9 30.7 26.3 51.2 32.4l4.7 1.4-6.9 19.3c-5.8 16.3-16 30.8-29.3 41.8L52.9 519.8c-13.6 11.2-33.8 9.3-45-4.3s-9.3-33.8 4.3-45l82.4-67.9c4.5-3.7 7.8-8.5 9.8-13.9L115.6 357z"/></svg>
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
              style={{ '--activity-color': getActivityTypeColor(activity.type) }}
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