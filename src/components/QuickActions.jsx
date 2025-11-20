import { NavLink } from 'react-router-dom'
import classes from '../css/QuickActions.module.css'

const QuickActions = () => {
  const actions = [
    {
      id: 1,
      title: 'Log Workout',
      icon: '💪',
      path: '/fitness',
      color: '#EFA00B'
    },
    {
      id: 2,
      title: 'Add Meal',
      icon: '🍽️',
      path: '/nutrition',
      color: '#D65108'
    },
    {
      id: 3,
      title: 'Set Goals',
      icon: '🎯',
      path: '/goalform',
      color: '#9A7AA0'
    },
    {
      id: 4,
      title: 'View Profile',
      icon: '👤',
      path: '/userprofile',
      color: '#758A93'
    }
  ]

  return (
    <div className={classes.quickActionsContainer}>
      <h3 className={classes.title}>Quick Actions</h3>
      <div className={classes.actionsGrid}>
        {actions.map(action => (
          <NavLink 
            key={action.id}
            to={action.path}
            className={classes.actionButton}
            style={{ '--action-color': action.color }}
          >
            <div className={classes.actionIcon}>{action.icon}</div>
            <span className={classes.actionTitle}>{action.title}</span>
          </NavLink>
        ))}
      </div>
    </div>
  )
}

export default QuickActions