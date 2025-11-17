import classes from '../css/Fitness.module.css'
import { getCurrentDate } from './Dashboard.jsx';
import FitnessCircle from '../components/FitnessCircle.jsx';
import FitnessCalendar from '../components/FitnessCalendar.jsx';

const Fitness = () => {
  return (
    <div className={classes.fitnessPage}>

        <div className={classes.fitnessContainer}>
            <div className={classes.dateLabel}>{getCurrentDate()}</div>
            <FitnessCircle />
            <FitnessCalendar />
        </div>
    </div>
  )
}

export default Fitness
