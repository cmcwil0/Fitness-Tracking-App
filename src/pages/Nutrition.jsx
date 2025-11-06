import { useMemo, useState } from 'react';
import classes from '../css/Nutrition.module.css'
import MacroSearch from '../components/MacroSearch';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']



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
                text={`${formatNumber(calorieCount)}`}
                styles={buildStyles({
                  // pathColor: ``,
                })}
                 />
            </div>

            <div className={`${classes.cpfContainer}`}>
                <div className={classes.carbCount}>
                  <div>{`${formatNumber(carbCount)}g`}</div>
                  <label>Carbohydrates</label>
                </div>
                <div className={classes.proteinCount}>
                  <div>{`${formatNumber(proteinCount)}g`}</div>
                  <label>Protein</label>
                </div>
                <div className={classes.fatCount}>
                  <div>{`${formatNumber(fatCount)}g`}</div>
                  <label>Fat</label>
                </div>
            </div>
                </> }
            <MacroSearch onFocus={() => setIsSearchFocused(true)} onBlur={() => setIsSearchFocused(false)} onAddFood={handleAddFood}/>
          {isSearchFocused === false &&
            <>

            <div className={classes.trackedFoodsSection}>
                <h3>Tracked foods</h3>
                {selectedFoods.length > 0 ? (
                  <ul className={classes.trackedFoodsList}>
                    {selectedFoods.map((food) => (
                      <li key={food.logId}>
                        <div className={classes.trackedFoodSummary}>
                          <span className={classes.trackedFoodName}>{food.name}</span>
                          <span className={classes.trackedFoodCalories}>{formatNumber(food.calories)} kcal</span>
                        </div>
                        <div className={classes.trackedFoodMacros}>
                          <span>{formatNumber(food.carbs)}g C</span>
                          <span>{formatNumber(food.protein)}g P</span>
                          <span>{formatNumber(food.fat)}g F</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className={classes.trackedFoodsEmpty}>No foods tracked yet. Use the search above to add items.</p>
                )}
              </div>            
              <div className={classes.weeklyChartContainer}>
                  <div className={classes.weeklyChart}>
                    {daysOfWeek.map((element, index) => ( //renders for each day of the week
                    <div className={`${classes[`${element}Container`]} ${classes.barContainer}`}  key={index}>
                    <div
                      className={`${classes[`${element}Bar`]} ${classes.bar}`}
                      style={{height: `${Math.min((calorieCount / calorieTarget) * 100, 100)}%`}}
                    ></div>
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
