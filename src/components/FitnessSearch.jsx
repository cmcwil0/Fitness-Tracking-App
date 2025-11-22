// client/src/components/FitnessSearch.jsx
import { useEffect, useMemo, useState } from 'react';
import classes from '../css/FitnessSearch.module.css';
import { isLoggedIn, authHeaders } from '../utils/auth';

const API = import.meta.env?.VITE_API_URL || 'http://localhost:4000';

// tiny debounce util
const useDebounce = (value, delay = 400) => {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
};

// fallback if API has an issue (keeps UI usable)
const fallbackItems = [
  { id: 'fallback-pushups', name: 'Push-ups', muscle: 'chest', type: 'strength', difficulty: 'beginner', equipment: 'body only', instructions: 'Standard grip push ups.' },
  { id: 'fallback-chest-press', name: 'Chest Press', muscle: 'chest', type: 'strength', difficulty: 'intermediate', equipment: 'barbell', instructions: 'Barbell chest press.' },
];

export default function FitnessSearch({ addMovementFunction, onInfo }) {
  const [q, setQ] = useState('');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');
  const debounced = useDebounce(q, 450);
  const loggedIn = isLoggedIn();

  useEffect(() => {
    if (!loggedIn) { setItems([]); setErr(''); return; }

    const name = (debounced || '').trim();
    if (!name) { setItems([]); setErr(''); return; }

    (async () => {
      try {
        setLoading(true);
        setErr('');
        const r = await fetch(`${API}/api/exercises?name=${encodeURIComponent(name)}&limit=25`, {
          headers: authHeaders(),
        });
        if (!r.ok) throw new Error(await r.text());

        const { items: raw = [] } = await r.json();
        const mapped = raw.map((it, i) => ({
          id: `${it.name}-${it.muscle || 'na'}-${i}`,
          name: it.name,
          muscle: it.muscle || '',
          type: it.type || '',
          equipment: it.equipment || '',
          difficulty: it.difficulty || '',
          instructions: it.instructions || '',
        }));
        setItems(mapped);
      } catch {
        setErr('Exercise lookup failed — showing a small example list.');
        setItems(fallbackItems);
      } finally {
        setLoading(false);
      }
    })();
  }, [debounced, loggedIn]);

  const list = useMemo(() => items, [items]);

  const handleAdd = (item) => {
    if (typeof addMovementFunction === 'function') addMovementFunction(item);
  };

  const handleInfo = (item) => {
    if (typeof onInfo === 'function') return onInfo(item);
    alert(
      `${item.name}\n\nMuscle: ${item.muscle}\nType: ${item.type}\nEquipment: ${item.equipment}\nDifficulty: ${item.difficulty}\n\n${item.instructions}`
    );
  };

  const addFirstOnEnter = (e) => {
    if (!loggedIn) return;
    if (e.key === 'Enter' && list.length) {
      e.preventDefault();
      handleAdd(list[0]);
    }
  };

  return (
    <div className={classes.fitnessSearchContainer}>
      <input
        className={classes.searchBar}
        type="text"
        placeholder={loggedIn ? 'Search Movement...' : 'Sign in to search movements…'}
        value={q}
        onChange={(e) => setQ(e.target.value)}
        onKeyDown={addFirstOnEnter}
        disabled={!loggedIn}
        title={!loggedIn ? 'Please sign in to search' : undefined}
      />

      {loading && <div style={{ fontSize: 12, opacity: .8, marginTop: 6 }}>Searching…</div>}
      {!!err && !loading && <div style={{ fontSize: 12, opacity: .8, marginTop: 6 }}>{err}</div>}

      <ul className={classes.searchResults}>
        {loggedIn && list.map((workout) => (
          <li className={classes.searchResultCard} key={workout.id}>
            <div className={classes.workoutName}>{workout.name}</div>
            <div className={classes.cardButtons}>
              <button
                type="button"
                className={classes.infoButton}
                onClick={() => handleInfo(workout)}
                title="Details"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="var(--accent-color)" viewBox="0 0 192 512"><path d="M48 48a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zM0 192c0-17.7 14.3-32 32-32l64 0c17.7 0 32 14.3 32 32l0 256 32 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 512c-17.7 0-32-14.3-32-32s14.3-32 32-32l32 0 0-224-32 0c-17.7 0-32-14.3-32-32z"/></svg>
              </button>

              <button
                type="button"
                className={classes.addWorkoutButton}
                onClick={() => handleAdd(workout)}
                title="Add"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="var(--accent-color)" viewBox="0 0 448 512"><path d="M256 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 160-160 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l160 0 0 160c0 17.7 14.3 32 32 32s32-14.3 32-32l0-160 160 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-160 0 0-160z"/></svg>
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}