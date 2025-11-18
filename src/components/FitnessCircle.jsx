import { useState } from 'react'
import classes from '../css/FitnessCircle.module.css'

const FitnessCircle = ({onButtonClick}) => {
    const[workoutLogged, setWorkoutLogged] = useState(false);

  return (
    <div className={classes.fitnessCircleOuter}>
        <div className={classes.fitnessCircle} onClick={() => onButtonClick()}>
          {workoutLogged === false &&
            <div className={classes.workoutLoggedContainer}>
                <svg xmlns="http://www.w3.org/2000/svg" fill='var(--accent-color)' width='100px' height='100px' viewBox="0 0 448 512"><path d="M256 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 160-160 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l160 0 0 160c0 17.7 14.3 32 32 32s32-14.3 32-32l0-160 160 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-160 0 0-160z"/></svg>
            </div>
          }
          {workoutLogged === true &&
            <div className={classes.workoutLoggedContainer}>

            </div>
          }
        </div>
    </div>
  )
}

export default FitnessCircle
