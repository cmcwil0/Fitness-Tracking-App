import classes from '../css/WeeklyGraph.module.css'
import { useState } from 'react';

const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']

const WeeklyGraph = () => {
    const [calorieCount, setCalorieCount] = useState(1800);
    const [calorieTarget, setCalorieTarget] = useState(2800);


  return (
    <div>
        <div className={classes.weeklyChartContainer}>
            <div className={classes.weeklyChart}>
              {daysOfWeek.map((element, index) => ( //renders for each day of the week
              <div className={`${classes[`${element}Container`]} ${classes.barContainer}`}  key={index}> 
                <div className={`${classes[`${element}Bar`]} ${classes.bar}`} style={{height: `${(calorieCount / calorieTarget) * 100}%`}}>
                    <div className={`${classes.infoCard}`}>{1000}kcal</div>
                </div>
                <label>{(element.slice(0,3)).toUpperCase()}</label>
              </div>
              ))}
            </div>
        </div>    
    </div>
  )
}

export default WeeklyGraph
