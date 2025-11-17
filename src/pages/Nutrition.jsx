import { useMemo, useState } from 'react';
import classes from '../css/Nutrition.module.css'
import MacroSearch from '../components/MacroSearch';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import MacroProgressCard from '../components/MacroProgressCard';
import WeeklyGraph from '../components/WeeklyGraph';
import { isLoggedIn, authHeaders } from '../utils/auth.js';
import { getCurrentDate } from './Dashboard.jsx';

const API = import.meta.env.VITE_API_URL || 'http://localhost:4000';
const daysOfWeek = ['monday','tuesday','wednesday','thursday','friday','saturday','sunday'];



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
  const [calorieTarget] = useState(2800);
  const [selectedFoods, setSelectedFoods] = useState([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const totals = useMemo(() => {
    return selectedFoods.reduce(
      (acc, food) => {
        acc.calories += food.calories;
        acc.carbs += food.carbs;
        acc.protein += food.protein;
        acc.fat += food.fat;
        return acc;
      },
      { calories: 0, carbs: 0, protein: 0, fat: 0 }
    );
  }, [selectedFoods]);

  const calorieCount = totals.calories;
  const carbCount = totals.carbs;
  const proteinCount = totals.protein;
  const fatCount = totals.fat;

  const formatNumber = (value) => (Number.isInteger(value) ? value : value.toFixed(1));

  const handleAddFood = (food) => {
    setSelectedFoods((previous) => [
      ...previous,
      {
        ...food,
        logId: `${food.id}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      },
    ]);
  };


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
            <div className={classes.dateLabel}>{getCurrentDate()}</div>

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