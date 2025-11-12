import { useState, useEffect } from 'react';
import classes from '../css/Nutrition.module.css';
import MacroSearch from '../components/MacroSearch';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import MacroProgressCard from '../components/MacroProgressCard';
import WeeklyGraph from '../components/WeeklyGraph';
import { isLoggedIn, authHeaders } from '../utils/auth.js';


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


const API = import.meta.env.VITE_API_URL || 'http://localhost:4000';
const daysOfWeek = ['monday','tuesday','wednesday','thursday','friday','saturday','sunday'];

const Nutrition = () => {
  const [calorieCount, setCalorieCount] = useState(0);
  const [calorieTarget, setCalorieTarget] = useState(1234);
  const [carbCount, setCarbCount] = useState(0);
  const [proteinCount, setProteinCount] = useState(0);
  const [fatCount, setFatCount] = useState(0);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const date = new Date();

  // Load the user's saved calorie target
  useEffect(() => {
    if (!isLoggedIn()) return;
    (async () => {
      try {
        const r = await fetch(`${API}/api/goals/me`, { headers: authHeaders() });
        if (!r.ok) return;
        const data = await r.json();
        if (data && typeof data.calorie_target === 'number') {
          setCalorieTarget(Number(data.calorie_target));
        }
      } catch {}
    })();
  }, []);

  // When user clicks “+” on a search result
  const handleAddFood = (food) => {
    setCalorieCount(v => v + (food.calories || 0));
    setCarbCount(v => v + (food.carbs || 0));
    setProteinCount(v => v + (food.protein || 0));
    setFatCount(v => v + (food.fat || 0));
  };

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
                text={`${calorieCount}/${calorieTarget}`}
                styles={buildStyles({})}
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
            <MacroSearch onFocus={() => setIsSearchFocused(true)} onBlur={() => setIsSearchFocused(false)} onAddFood={handleAddFood} />
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
  );
};

export default Nutrition;