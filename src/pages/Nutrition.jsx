import { useState } from 'react';
import classes from '../css/Nutrition.module.css'
import MacroSearch from '../components/MacroSearch';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']



const Nutrition = () => {
  const [calorieCount, setCalorieCount] = useState(1800);
  const [calorieTarget, setCalorieTarget] = useState(2800);
  const [carbCount, setCarbCount] = useState(25);
  const [proteinCount, setProteinCount] = useState(50);
  const [fatCount, setFatCount] = useState(65);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const date = new Date();

  return (
    <div className={`${classes.nutritionPage}`}>
      <div className={`${classes.nutritionContainer}`}>

        {isSearchFocused === false &&
          <>
            <div className={classes.dateLabel}>{date.toLocaleDateString()}</div>

            <div className={classes.progressBar}>
              <CircularProgressbar 
                value={calorieCount}
                maxValue={calorieTarget}  
                text={`${calorieCount}`}
                styles={buildStyles({
                  // pathColor: ``,
                })}
                 />
            </div>

            <div className={`${classes.cpfContainer}`}>
                <div className={classes.carbCount}>
                  <div>{`${carbCount}g`}</div>
                  <label>Carbohydrates</label>
                </div>
                <div className={classes.proteinCount}>
                  <div>{`${proteinCount}g`}</div>
                  <label>Protein</label>
                </div>
                <div className={classes.fatCount}>
                  <div>{`${fatCount}g`}</div>
                  <label>Fat</label>
                </div>
            </div>
                </> }
            <MacroSearch onFocus={() => setIsSearchFocused(true)} onBlur={() => setIsSearchFocused(false)} />
          {isSearchFocused === false &&
            <>
              <div className={classes.weeklyChartContainer}>
                  <div className={classes.weeklyChart}>
                    {daysOfWeek.map((element, index) => ( //renders for each day of the week
                    <div className={`${classes[`${element}Container`]} ${classes.barContainer}`}  key={index}> 
                      <div className={`${classes[`${element}Bar`]} ${classes.bar}`} style={{height: `${(calorieCount / calorieTarget) * 100}%`}}></div>
                      <label>{element}</label>
                    </div>
                    ))}
                  </div>
              </div>
            </>
          }
          {isSearchFocused === true && 
            <div className={classes.searchContainer}>
              
            </div>
          }
         

      </div>
    </div>
  )
}

export default Nutrition
