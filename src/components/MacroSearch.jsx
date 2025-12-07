import { useState, useEffect } from 'react';
import classes from '../css/MacroSearch.module.css';
import { isLoggedIn, authHeaders } from '../utils/auth';

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
const titleCase = (s = '') =>
  s.length ? s.charAt(0).toUpperCase() + s.slice(1) : s;

const MacroSearch = ({ onFocus, onBlur, onPlus, onMinus, onDelete }) => {
  const [search, setSearch] = useState('');
  const [foods, setFoods] = useState([]);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(''); // no default "100g"

  const loggedIn = isLoggedIn();
  const debounced = useDebounce(search, 400);

  useEffect(() => {
    if (!loggedIn) {
      setFoods([]);
      setError(null);
      return;
    }

    const q = debounced.trim();
    if (!q) {
      setFoods([]);
      setError(null);
      return;
    }

    setError(null);
    const qty = (quantity || '100g').trim();

    fetch(
      `${API}/api/nutrition?query=${encodeURIComponent(
        q
      )}&quantity=${encodeURIComponent(qty)}`,
      {
        headers: authHeaders(),
      }
    )
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
      .catch(() => setError('Nutrition lookup failed'));
  }, [debounced, loggedIn, quantity]);

  const filteredFoods = foods.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={classes.macroSearchContainer}>
      {}
      <form
        className={classes.searchFood}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <input
          type="text"
          placeholder={
            loggedIn
              ? 'Search for nutrition...'
              : 'Sign in to search for nutrition…'
          }
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onFocus={onFocus}
          onBlur={onBlur}
          disabled={!loggedIn}
          title={!loggedIn ? 'Please sign in to search' : undefined}
        />

        {}
        {search && (
          <input
            type="text"
            placeholder={
              loggedIn
                ? 'Quantity (e.g. 1 cup, 2 lbs, 100g)'
                : 'Sign in to set quantity...'
            }
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            onFocus={onFocus}
            onBlur={onBlur}
            disabled={!loggedIn}
          />
        )}

        {error && (
          <div style={{ fontSize: 12, marginTop: 6 }}>{error}</div>
        )}

        <ul className={classes.foodsList}>
          {loggedIn &&
            search !== '' &&
            filteredFoods.map((item) => (
              <li key={item.id}>
                <div className={classes.mainInfo}>
                  <span className={classes.itemName}>{item.name}</span>
                  <span className={classes.itemBrand}>{item.brand}</span>
                </div>

                <div className={classes.subInfo}>
                  <span className={classes.itemCalories}>
                    {item.calories}
                    <span>kcal</span>
                  </span>

                  <span
                    style={{
                      fontSize: 12,
                      opacity: 0.85,
                      marginRight: 8,
                    }}
                  >
                    {item.carbs}g C · {item.protein}g P · {item.fat}g F
                  </span>

                  {}
                  <button
                    className={classes.infoButton}
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => onMinus?.(item)}
                    title="Remove one"
                  >
                    −
                  </button>

                  {}
                  <button
                    className={classes.addFoodButton}
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => onPlus?.(item)}
                    title="Add one"
                  >
                    +
                  </button>

                  {}
                  <button
                    className={classes.infoButton}
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => onDelete?.(item)}
                    title="Delete"
                  >
                    🗑
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