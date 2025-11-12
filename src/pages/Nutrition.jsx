import { useState } from 'react';
import classes from '../css/Nutrition.module.css'
import MacroSearch from '../components/MacroSearch';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import MacroProgressCard from '../components/MacroProgressCard';
import WeeklyGraph from '../components/WeeklyGraph';



export const NutritionCard = () => {
    return (
      <div className={classes.nutritionCard}>
        <CircularProgressbar
                className={classes.progressBar} 
                value={1000}
                maxValue={3000}  
                text={`${1000}`}
                styles={buildStyles({
                  // pathColor: ``,
                })}
                 />
        <MacroProgressCard />
      </div>
    )
  }

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
            <div className={classes.bottomContent}>
              {isSearchFocused === false &&
                <>
                  <WeeklyGraph />
                </>
              }
              {isSearchFocused === true && 
                <div className={classes.searchContainer}>
                </div>
              }
            </div>
         

      </div>
    </div>
  )
}

export default Nutrition
