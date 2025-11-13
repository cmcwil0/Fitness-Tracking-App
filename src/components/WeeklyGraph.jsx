import classes from '../css/WeeklyGraph.module.css'
import { useState } from 'react';

const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']

const WeeklyGraph = ({title}) => {
    const [calorieCount, setCalorieCount] = useState(1800);
    const [calorieTarget, setCalorieTarget] = useState(2800);


  return (
        <div className={classes.weeklyChartContainer}>
            <h3 className={classes.weeklyChartTitle}>{title}</h3>
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
  )
}

export default WeeklyGraph
