import { useState, useEffect } from 'react';
import classes from '../css/MacroSearch.module.css';

const API = import.meta.env.VITE_API_URL || 'http://localhost:4000';

const useDebounce = (value, delay = 400) => {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
};

const round = (n) => (typeof n === 'number' ? Math.round(n) : 0);
const titleCase = (s = '') => s.charAt(0).toUpperCase() + s.slice(1);

const MacroSearch = ({onFocus, onBlur, onAddFood}) => {
    const [search, setSearch] = useState('');
    const [foods, setFoods] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

  const debounced = useDebounce(search, 400);

  useEffect(() => {
    const q = debounced.trim();
    if (!q) { setFoods([]); setError(null); return; }

    setLoading(true);
    setError(null);

    fetch(`${API}/api/nutrition?query=${encodeURIComponent(q)}`)
      .then(async (r) => {
        if (!r.ok) throw new Error(await r.text());
        return r.json();
      })
      .then(({ items }) => {
        const mapped = (items || []).map((it, idx) => ({
          id: idx + 1,
          name: titleCase(it.name),
          brand: 'API Ninjas',
          calories: round(it.calories),
          protein: round(it.protein_g),
          carbs: round(it.carbohydrates_total_g),
          fat: round(it.fat_total_g),
        }));
        setFoods(mapped);
      })
      .catch(() => setError('Nutrition lookup failed'))
      .finally(() => setLoading(false));
  }, [debounced]);

  const filteredFoods = foods.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={classes.macroSearchContainer}>
      <form className={classes.searchFood}>
          <input 
            type="text" 
            placeholder='search for meal...'
            value={search}
            onChange={element => setSearch(element.target.value)}
            onFocus={onFocus}
            onBlur={onBlur}
             />
          <ul className={classes.foodsList}>
            {search !== '' && filteredFoods.map(item => (
              <li key={item.id}>
                <div className={classes.mainInfo}>
                  <span className={classes.itemName}>{item.name}</span>
                  <span className={classes.itemBrand}>{item.brand}</span>
                </div>
                <div className={classes.subInfo}>
                  <span className={classes.itemCalories}>{item.calories}<span>kcal</span></span>
                  <button className={classes.infoButton} type="button">?</button>
                  <button
                    className={classes.addFoodButton}
                    type="button"
                    onMouseDown={(event) => {
                      event.preventDefault();
                      if (onAddFood) {
                        onAddFood(item);
                      }
                    }}
                  >
                    +
                  </button>
                </div>
              </li>
            ))}
          </ul> 
        </form>
    </div>
  );
};

export default MacroSearch;