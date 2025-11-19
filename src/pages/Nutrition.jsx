import { useMemo, useState, useEffect } from 'react';
import classes from '../css/Nutrition.module.css'
import MacroSearch from '../components/MacroSearch';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import MacroProgressCard from '../components/MacroProgressCard';
import WeeklyGraph from '../components/WeeklyGraph';
import { isLoggedIn, authHeaders } from '../utils/auth.js';
import { getCurrentDate } from './Dashboard.jsx';
import { BarChart } from '@mui/x-charts';

const API = import.meta.env.VITE_API_URL || 'http://localhost:4000';

const sampleData = [
      { day: 'Monday', calories: 2400 },
      { day: 'Tuesday', calories: 2800 },
      { day: 'Wednesday', calories: 2200 },
      { day: 'Thursday', calories: 3000 },
      { day: 'Friday', calories: 2600 },
      { day: 'Saturday', calories: 2900 },
      { day: 'Sunday', calories: 2500 }
    ];

    // First, you'll need sample data with macros breakdown
const sampleDataWithMacros = [
  { day: 'Monday', calories: 2400, protein: 120, carbs: 300, fat: 80 },
  { day: 'Tuesday', calories: 2800, protein: 140, carbs: 350, fat: 95 },
  { day: 'Wednesday', calories: 2200, protein: 110, carbs: 275, fat: 75 },
  { day: 'Thursday', calories: 3000, protein: 150, carbs: 375, fat: 105 },
  { day: 'Friday', calories: 2600, protein: 130, carbs: 325, fat: 85 },
  { day: 'Saturday', calories: 2900, protein: 145, carbs: 362, fat: 98 },
  { day: 'Sunday', calories: 2500, protein: 125, carbs: 312, fat: 83 }
];


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
  const [calorieTarget, setCalorieTarget] = useState(2800);
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

  //should be removed I think???
  // When user clicks “+” on a search result
  // const handleAddFood = (food) => {
  //   setCalorieCount(v => v + (food.calories || 0));
  //   setCarbCount(v => v + (food.carbs || 0));
  //   setProteinCount(v => v + (food.protein || 0));
  //   setFatCount(v => v + (food.fat || 0));
  // };

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
          <label htmlFor=""></label>
          {isSearchFocused === false &&
            <>
              <BarChart
                width={500}
                height={250}
                borderRadius={10}
                series={[
                  {
                    data: sampleDataWithMacros.map(item => item.protein * 4),
                    stack: 'calories',
                    color: '#FF6B6B',
                    label: 'Protein'
                  },
                  {
                    data: sampleDataWithMacros.map(item => item.carbs * 4),
                    stack: 'calories',
                    color: '#4ECDC4',
                    label: 'Carbs'
                  },
                  {
                    data: sampleDataWithMacros.map(item => item.fat * 9),
                    stack: 'calories',
                    color: '#45B7D1',
                    label: 'Fat'
                  }
                ]}
                xAxis={[{
                  data: sampleDataWithMacros.map(item => item.day.slice(0, 3)),
                  scaleType: 'band',
                  disableLine: true,
                  disableTicks: true,
                  tickLabelStyle: { fill: 'var(--accent-color)' }
                }]}
                yAxis={[{
                  disableLine: true,
                  disableTicks: true,
                  tickLabelStyle: { display: 'none' }
                }]}
                slotProps={{ legend: { hidden: true } }}
                margin={{
                  left: 0,
                  right: 50,
                  bottom: 50
                }}
                hideLegend
              />
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