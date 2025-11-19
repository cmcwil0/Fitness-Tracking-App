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
              <svg xmlns="http://www.w3.org/2000/svg" height='100px' width='100px' fill='var(--accent-color)' viewBox="0 0 640 640"><path d="M530.8 134.1C545.1 144.5 548.3 164.5 537.9 178.8L281.9 530.8C276.4 538.4 267.9 543.1 258.5 543.9C249.1 544.7 240 541.2 233.4 534.6L105.4 406.6C92.9 394.1 92.9 373.8 105.4 361.3C117.9 348.8 138.2 348.8 150.7 361.3L252.2 462.8L486.2 141.1C496.6 126.8 516.6 123.6 530.9 134z"/></svg>
            </div>
          }
        </div>
    </div>
  )
}

export default FitnessCircle
