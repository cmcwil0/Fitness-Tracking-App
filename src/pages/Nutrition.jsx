import { useEffect, useMemo, useState } from 'react';
import classes from '../css/Nutrition.module.css';
import MacroSearch from '../components/MacroSearch';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { isLoggedIn, authHeaders } from '../utils/auth.js';
import { getCurrentDate } from './Dashboard.jsx';
import { BarChart } from '@mui/x-charts';

const API = import.meta.env.VITE_API_URL || 'http://localhost:4000';

const sampleDataWithMacros = [
  { day: 'Monday', calories: 2400, protein: 120, carbs: 300, fat: 80 },
  { day: 'Tuesday', calories: 2800, protein: 140, carbs: 350, fat: 95 },
  { day: 'Wednesday', calories: 2200, protein: 110, carbs: 275, fat: 75 },
  { day: 'Thursday', calories: 3000, protein: 150, carbs: 375, fat: 105 },
  { day: 'Friday', calories: 2600, protein: 130, carbs: 325, fat: 85 },
  { day: 'Saturday', calories: 2900, protein: 145, carbs: 362, fat: 98 },
  { day: 'Sunday', calories: 2500, protein: 125, carbs: 312, fat: 83 },
];

const rnd = (n) => (typeof n === 'number' ? Math.round(n) : 0);

const QtyBadge = ({ q }) => (
  <span
    style={{
      fontSize: 12,
      opacity: 0.85,
      marginRight: 8,
      padding: '1px 6px',
      borderRadius: 8,
      border: '1px solid var(--border-color, #444)',
    }}
  >
    x{q}
  </span>
);

export const NutritionCard = () => {
  return (
    <div className={classes.nutritionCard}>
      <CircularProgressbar
        className={classes.progressBar}
        value={1000}
        maxValue={3000}
        text={`${1000}`}
        styles={buildStyles({})}
      />
    </div>
  );
};

const Nutrition = () => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [calorieTarget, setCalorieTarget] = useState(2800);
  const [showFoodLog, setShowFoodLog] = useState(false);

  const [diary, setDiary] = useState([]);
  const todayStr = useMemo(
    () => new Date().toISOString().slice(0, 10),
    []
  );

  useEffect(() => {
    if (!isLoggedIn()) return;
    (async () => {
      try {
        const r = await fetch(`${API}/api/goals/me`, {
          headers: authHeaders(),
        });
        if (!r.ok) return;
        const data = await r.json();
        if (data && typeof data.calorie_target === 'number') {
          setCalorieTarget(Number(data.calorie_target));
        }
      } catch {}
    })();
  }, []);

  async function loadDiary() {
    if (!isLoggedIn()) return setDiary([]);
    try {
      const r = await fetch(`${API}/api/diary/today`, {
        headers: authHeaders(),
      });
      const data = await r.json();
      if (r.ok && Array.isArray(data.items)) setDiary(data.items);
    } catch {}
  }

  useEffect(() => {
    loadDiary();
  }, []);

  const totals = useMemo(() => {
    return diary.reduce(
      (acc, it) => {
        const q = Number(it.quantity) || 0;
        acc.calories += (Number(it.calories) || 0) * q;
        acc.protein += (Number(it.protein) || 0) * q;
        acc.carbs += (Number(it.carbs) || 0) * q;
        acc.fat += (Number(it.fat) || 0) * q;
        return acc;
      },
      { calories: 0, protein: 0, carbs: 0, fat: 0 }
    );
  }, [diary]);

  const calorieCount = totals.calories;
  const carbCount = totals.carbs;
  const proteinCount = totals.protein;
  const fatCount = totals.fat;

  async function changeQty(item, delta) {
    if (!isLoggedIn()) {
      alert('Please log in to track foods.');
      return;
    }
    try {
      const body = {
        date: todayStr,
        name: item.name,
        delta,
        calories: item.calories,
        protein: item.protein,
        carbs: item.carbs,
        fat: item.fat,
      };
      const r = await fetch(`${API}/api/diary/qty`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          ...authHeaders(),
        },
        body: JSON.stringify(body),
      });
      if (!r.ok) {
        const e = await r.json().catch(() => ({}));
        throw new Error(e?.message || 'Could not update diary');
      }
      const data = await r.json();
      setDiary(Array.isArray(data.items) ? data.items : []);
    } catch (e) {
      alert(e.message || 'Could not update diary');
    }
  }

  async function deleteItem(name) {
    if (!isLoggedIn()) return;
    try {
      const r = await fetch(`${API}/api/diary/item`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          ...authHeaders(),
        },
        body: JSON.stringify({ date: todayStr, name }),
      });
      if (!r.ok) throw new Error('Failed to delete item');
      const data = await r.json();
      setDiary(Array.isArray(data.items) ? data.items : []);
    } catch (e) {
      alert(e.message || 'Failed to delete');
    }
  }

  const handleSearchPlus = (food) => changeQty(food, +1);
  const handleSearchMinus = (food) => changeQty(food, -1);
  const handleSearchDelete = (food) => deleteItem(food.name);

  const diaryButtonStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderColor: 'var(--accent-color)',
    color: 'var(--accent-color)',
  };

  return (
    <div className={classes.nutritionPage}>
      <div className={classes.nutritionContainer}>
        {isSearchFocused === false && (
          <>
            <div className={classes.dateLabel}>{getCurrentDate()}</div>

            <div className={classes.progressBar} style={{ position: 'relative' }}>
              <CircularProgressbar
                value={calorieCount}
                maxValue={calorieTarget}
                text={``}
                styles={buildStyles({pathColor: '#D65108'})}
              />
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#D65108', position: 'relative' }}>
                  {calorieCount}
                  <span style={{ fontSize: '0.9rem', opacity: 0.8, position: 'absolute', marginLeft: '4px' }}>kcal</span>
                </div>
                <div style={{ fontSize: '0.85rem', opacity: 0.7, marginTop: '4px' }}>
                  {Math.max(0, calorieTarget - calorieCount)} remaining
                </div>
              </div>
            </div>

            <div className={classes.cpfContainer}>
              <div className={classes.carbCount}>
                <div>{`${rnd(carbCount)}g`}</div>
                <label>Carbohydrates</label>
              </div>
              <div className={classes.proteinCount}>
                <div>{`${rnd(proteinCount)}g`}</div>
                <label>Protein</label>
              </div>
              <div className={classes.fatCount}>
                <div>{`${rnd(fatCount)}g`}</div>
                <label>Fat</label>
              </div>
            </div>
          </>
        )}

        <MacroSearch
          onFocus={() => setIsSearchFocused(true)}
          onBlur={() => setIsSearchFocused(false)}
          onPlus={handleSearchPlus}
          onMinus={handleSearchMinus}
          onDelete={handleSearchDelete}
        />

        {isSearchFocused === false && (
          <>
            <button
              onClick={() => setShowFoodLog(!showFoodLog)}
              style={{
                marginTop: '4px',
                padding: '8px 16px',
                borderRadius: '8px',
                border: '2px solid var(--accent-color)',
                background: 'var(--secondary-color)',
                color: 'var(--accent-color)',
                cursor: 'pointer',
                fontSize: '0.9rem',
                transition: 'all 0.15s ease',
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'var(--accent-color)';
                e.target.style.color = 'var(--background-color)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'var(--secondary-color)';
                e.target.style.color = 'var(--accent-color)';
              }}
            >
              {showFoodLog ? 'Hide Food Log' : 'Show Food Log'}
            </button>

            {showFoodLog && (
              <div
                style={{
                  marginTop: 8,
                  maxHeight: 180,
                  overflowY: 'auto',
                  width: '100%',
                }}
              >
                <ul className={classes.foodsList}>
                  {diary.map((it) => (
                    <li key={`${it.name}-${it.id || it.entry_date}`}>
                      <div className={classes.mainInfo}>
                        <span className={classes.itemName}>{it.name}</span>
                        <span className={classes.itemBrand}>API Ninjas</span>
                      </div>

                      <div className={classes.subInfo}>
                        <span className={classes.itemCalories}>
                          {rnd(it.calories)}
                          <span>kcal</span>
                        </span>

                        <span
                          style={{
                            fontSize: 12,
                            opacity: 0.85,
                            marginRight: 8,
                          }}
                        >
                          {rnd(it.carbs)}g C · {rnd(it.protein)}g P ·{' '}
                          {rnd(it.fat)}g F
                        </span>

                        <QtyBadge q={it.quantity} />

                        {}
                        <button
                          className={classes.infoButton}
                          type="button"
                          style={diaryButtonStyle}
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={() => changeQty(it, -1)}
                          title="Remove one"
                        >
                          −
                        </button>

                        {}
                        <button
                          className={classes.addFoodButton}
                          type="button"
                          style={diaryButtonStyle}
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={() => changeQty(it, +1)}
                          title="Add one"
                        >
                          +
                        </button>

                        {}
                        <button
                          className={classes.infoButton}
                          type="button"
                          style={diaryButtonStyle}
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={() => deleteItem(it.name)}
                          title="Delete"
                        >
                          🗑
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}

        {isSearchFocused === false && !showFoodLog && (
          <div className={classes.bottomContent}>
            <BarChart
              width={500}
              height={250}
              borderRadius={10}
              series={[
                {
                  data: sampleDataWithMacros.map((i) => i.protein * 4),
                  stack: 'calories',
                  color: '#D65108',
                  label: 'Protein',
                },
                {
                  data: sampleDataWithMacros.map((i) => i.carbs * 4),
                  stack: 'calories',
                  color: '#EFA00B',
                  label: 'Carbs',
                },
                {
                  data: sampleDataWithMacros.map((i) => i.fat * 9),
                  stack: 'calories',
                  color: '#b4bbbeff',
                  label: 'Fat',
                },
              ]}
              xAxis={[
                {
                  data: sampleDataWithMacros.map((i) =>
                    i.day.slice(0, 3)
                  ),
                  scaleType: 'band',
                  disableLine: true,
                  disableTicks: true,
                  tickLabelStyle: { fill: 'var(--accent-color)' },
                },
              ]}
              yAxis={[
                {
                  disableLine: true,
                  disableTicks: true,
                  tickLabelStyle: { display: 'none' },
                },
              ]}
              slotProps={{ legend: { hidden: true } }}
              margin={{ left: 0, right: 50, bottom: 50 }}
              hideLegend
            />
          </div>
        )}
      </div>
    </div>
  );
};

window.dispatchEvent(new Event('diary:updated'));

export default Nutrition;