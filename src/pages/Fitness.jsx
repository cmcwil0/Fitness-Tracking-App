import classes from '../css/Fitness.module.css'
import { getCurrentDate } from './Dashboard.jsx';
import FitnessCircle from '../components/FitnessCircle.jsx';

const Fitness = () => {
  return (
    <div className={classes.fitnessPage}>

        <div className={classes.fitnessContainer}>
            <div className={classes.dateLabel}>{getCurrentDate()}</div>
            <FitnessCircle />
        </div>
    </div>
  )
}

export default Fitness
