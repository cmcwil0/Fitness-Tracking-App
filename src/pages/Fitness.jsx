// src/pages/Fitness.jsx
import classes from '../css/Fitness.module.css';
import { getCurrentDate } from './Dashboard.jsx';
import FitnessCircle from '../components/FitnessCircle.jsx';
import { useState, useEffect } from 'react';
import FitnessCalendar from '../components/FitnessCalendar.jsx';
import FitnessSearch from '../components/FitnessSearch.jsx';

const API = import.meta.env.VITE_API_URL || 'http://localhost:4000';

const presets = [
  { id: 1, name: 'Chest Day' },
  { id: 2, name: 'Back Day' },
];

const uid = () => `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
const cap = (s = '') => s.charAt(0).toUpperCase() + s.slice(1);

const Fitness = () => {
  const [workoutLogged, setWorkoutLogged] = useState(false);
  const [isWorkoutFocused, setIsWorkoutFocused] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const [workoutType, setWorkoutType] = useState('');
  const [currentPreset, setCurrentPreset] = useState('');

  const [durationHours, setDurationHours] = useState('');
  const [durationMinutes, setDurationMinutes] = useState('');

  const [workouts, setWorkouts] = useState([]);

  const [pastWorkouts, setPastWorkouts] = useState([]);

  const [showHistory, setShowHistory] = useState(false);

  const handleFitnessCircle = () => setIsWorkoutFocused(true);
  const handleBackButton = () => setIsSearching(false);

  const mapExerciseToItem = (ex) => ({
    id: `ex-${uid()}`,
    name: cap(ex?.name || 'Exercise'),
    description:
      [
        ex?.equipment ? cap(ex.equipment) : null,
        ex?.muscle ? cap(ex.muscle) : null,
      ]
        .filter(Boolean)
        .join(' • ') || (ex?.type ? cap(ex.type) : ''),
    _raw: ex,
  });

  const handleAddMovement = (exerciseFromSearch) => {
    const item = mapExerciseToItem(exerciseFromSearch || {});
    setWorkouts((prev) => [...prev, item]);
    setIsSearching(false);
  };

  const handleRemoveMovement = (id) => {
    setWorkouts((prev) => prev.filter((w) => w.id !== id));
  };

  const handleInfo = (item) => {
    const ex = item?._raw || {};
    const lines = [
      `Name: ${cap(ex.name || item.name)}`,
      ex.type ? `Type: ${cap(ex.type)}` : null,
      ex.muscle ? `Muscle: ${cap(ex.muscle)}` : null,
      ex.equipment ? `Equipment: ${cap(ex.equipment)}` : null,
      ex.difficulty ? `Difficulty: ${cap(ex.difficulty)}` : null,
      ex.instructions ? `\nInstructions:\n${ex.instructions}` : null,
    ].filter(Boolean);
    window.alert(lines.join('\n'));
  };

  const handleLogWorkout = async () => {
    if (!workoutType || !currentPreset || currentPreset === 'add-new-preset') {
      alert('Please select a workout type and preset.');
      return;
    }

    if (!workouts.length) {
      alert('Please add at least one exercise.');
      return;
    }

    const duration_hours = Number(durationHours || 0);
    const duration_minutes = Number(durationMinutes || 0);

    if (duration_hours === 0 && duration_minutes === 0) {
      alert('Please enter workout duration.');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please log in to save workouts.');
      return;
    }

    try {
      const res = await fetch(`${API}/api/workouts/log`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          duration_hours,
          duration_minutes,
          workout_type: workoutType,
          preset: currentPreset,
          exercises: workouts.map((w) => ({
            name: w.name,
            description: w.description,
          })),
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to save workout');
      }

      alert('Workout logged!');
      setWorkoutLogged(true);
      setWorkouts([]);
      setIsWorkoutFocused(false);
      setDurationHours('');
      setDurationMinutes('');
      setWorkoutType('');
      setCurrentPreset('');

      setPastWorkouts((prev) => [
        {
          id: data.workoutId,
          workout_type: workoutType,
          preset: currentPreset,
          duration_hours,
          duration_minutes,
          created_at: new Date().toISOString(),
        },
        ...prev,
      ]);
    } catch (err) {
      console.error(err);
      alert(err.message || 'Could not log workout');
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    const loadWorkouts = async () => {
      try {
        const res = await fetch(`${API}/api/workouts/mine`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          console.error('Failed to fetch past workouts');
          return;
        }

        const data = await res.json();
        if (Array.isArray(data.workouts)) {
          setPastWorkouts(data.workouts);
        }
      } catch (err) {
        console.error('Error loading past workouts:', err);
      }
    };

    loadWorkouts();
  }, []);

  const formatDuration = (h, m) => {
    const hh = Number(h || 0);
    const mm = Number(m || 0);
    if (!hh && !mm) return '-';
    if (!hh) return `${mm}m`;
    if (!mm) return `${hh}h`;
    return `${hh}h ${mm}m`;
  };

  const handleViewDetails = async (workoutId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please log in to view workout details.');
      return;
    }

    try {
      const res = await fetch(`${API}/api/workouts/${workoutId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to fetch workout details');
      }

      const workout = data.workout;
      const lines = [];

      lines.push(
        `Preset: ${workout.preset || 'Workout'} (${workout.workout_type || 'type'})`
      );
      lines.push(
        `Date: ${
          workout.created_at
            ? new Date(workout.created_at).toLocaleString()
            : 'Unknown'
        }`
      );
      lines.push(
        `Duration: ${formatDuration(
          workout.duration_hours,
          workout.duration_minutes
        )}`
      );
      lines.push('');
      lines.push('Exercises:');

      if (!workout.exercises || workout.exercises.length === 0) {
        lines.push('  (No exercises saved)');
      } else {
        workout.exercises.forEach((ex, idx) => {
          lines.push(
            `  ${idx + 1}. ${ex.name || 'Exercise'}${
              ex.description ? ` – ${ex.description}` : ''
            }`
          );
        });
      }

      window.alert(lines.join('\n'));
    } catch (err) {
      console.error(err);
      alert(err.message || 'Could not load workout details');
    }
  };

  const handleDeleteWorkout = async (workoutId) => {
    if (!window.confirm('Are you sure you want to delete this workout?')) {
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please log in to delete workouts.');
      return;
    }

    try {
      const res = await fetch(`${API}/api/workouts/${workoutId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to delete workout');
      }

      setPastWorkouts((prev) => prev.filter((w) => w.id !== workoutId));
    } catch (err) {
      console.error(err);
      alert(err.message || 'Could not delete workout');
    }
  };

  const handleToggleHistory = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please sign in to view past workouts.');
      return;
    }
    setShowHistory((v) => !v);
  };

  return (
    <div className={classes.fitnessPage}>
      <div className={classes.fitnessContainer}>
        {!isWorkoutFocused && (
          <div className={classes.defaultItems}>
            <FitnessCircle onButtonClick={handleFitnessCircle} />
            <div className={classes.workoutCompletedText}>
              {workoutLogged ? 'Workout Completed' : 'Todays Workout Not Completed'}
            </div>
            <FitnessCalendar />

            {}
            <div
              style={{
                marginTop: '-20px',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <button
                type="button"
                onClick={handleToggleHistory}
                style={{
                  width: '200px',
                  height: '32px',
                  borderRadius: '16px',
                  border: '1px solid #fff',
                  backgroundColor: 'transparent',
                  color: '#fff',
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  textAlign: 'center',
                }}
              >
                {showHistory ? 'Hide Past Workouts' : 'View Past Workouts'}
              </button>

              {showHistory && (
                <div
                  style={{
                    marginTop: '10px',
                    maxHeight: '240px',
                    overflowY: 'auto',
                    overflowX: 'hidden',
                    fontSize: '0.85rem',
                    width: '80%',
                    maxWidth: '500px',
                    textAlign: 'center',
                    boxSizing: 'border-box',
                  }}
                >
                  {pastWorkouts.length === 0 && (
                    <div>No past workouts logged yet.</div>
                  )}

                  {pastWorkouts.length > 0 && (
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                      {pastWorkouts.map((w) => (
                        <li
                          key={w.id}
                          style={{
                            padding: '8px 0',
                            borderBottom: '1px solid rgba(255,255,255,0.1)',
                          }}
                        >
                            <div>
                              <strong>{w.preset || 'Workout'}</strong>{' '}
                              <span style={{ opacity: 0.8 }}>
                                ({w.workout_type || 'type'})
                              </span>
                            </div>
                            <div style={{ opacity: 0.8 }}>
                              {w.created_at
                                ? new Date(w.created_at).toLocaleString()
                                : ''}
                              {' • '}
                              {formatDuration(w.duration_hours, w.duration_minutes)}
                            </div>

                            <div
                              style={{
                                marginTop: '4px',
                                display: 'flex',
                                justifyContent: 'center',
                                gap: '16px',
                              }}
                            >
                              <button
                                type="button"
                                onClick={() => handleViewDetails(w.id)}
                                style={{
                                  background: 'transparent',
                                  border: 'none',
                                  color: '#4da6ff',
                                  cursor: 'pointer',
                                  fontSize: '0.8rem',
                                  textDecoration: 'underline',
                                }}
                              >
                                View details
                              </button>

                              <button
                                type="button"
                                onClick={() => handleDeleteWorkout(w.id)}
                                style={{
                                  background: 'transparent',
                                  border: 'none',
                                  color: '#ff6666',
                                  cursor: 'pointer',
                                  fontSize: '0.8rem',
                                  textDecoration: 'underline',
                                }}
                              >
                                Delete
                              </button>
                            </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {isWorkoutFocused && (
          <div className={classes.isLoggingContainer}>
            <section className={classes.topSection}>
              <div className={classes.leftColumn}>
                <div className={classes.workoutTimeContainer}>
                  <label>Duration:</label>
                  <input
                    className={classes.timeInputHours}
                    type="number"
                    placeholder="hr"
                    value={durationHours}
                    onChange={(e) => setDurationHours(e.target.value)}
                  />
                  <div className={classes.colon}>:</div>
                  <input
                    className={classes.timeInputMins}
                    type="number"
                    placeholder="m"
                    value={durationMinutes}
                    onChange={(e) => setDurationMinutes(e.target.value)}
                  />
                </div>

                <div>
                  <label>Workout Type:</label>
                  <select
                    value={workoutType}
                    onChange={(e) => setWorkoutType(e.target.value)}
                  >
                    <option value="" disabled>
                      Select
                    </option>
                    <option value="weight_lifting">Weight Lifting</option>
                    <option value="cardio">Cardio</option>
                  </select>
                </div>

                <div>
                  <label>Preset:</label>
                  <select
                    value={currentPreset}
                    onChange={(e) => setCurrentPreset(e.target.value)}
                  >
                    <option value="" disabled>
                      Select Preset
                    </option>
                    {presets.map((preset) => (
                      <option value={preset.name} key={preset.id}>
                        {preset.name}
                      </option>
                    ))}
                    <option value="add-new-preset">Add New Preset</option>
                  </select>

                  {isSearching && (
                    <div className={classes.backButtonContainer}>
                      <button
                        className={classes.backButton}
                        onClick={handleBackButton}
                      >
                        back
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className={classes.dateContainer}>{getCurrentDate()}</div>
            </section>

            <section className={classes.logMainSection}>
              {!isSearching && (
                <ul className={classes.workoutList}>
                  {workouts.map((workout) => (
                    <li className={classes.workoutCard} key={workout.id}>
                      <div className={classes.workoutImageContainer}>image</div>

                      <div className={classes.workoutText}>
                        <div className={classes.workoutName}>{workout.name}</div>
                        <div className={classes.subText}>
                          {workout.description}
                        </div>
                      </div>

                      <div className={classes.buttonContainer}>
                        <div className={classes.smallButtons}>
                          <button
                            className={classes.removeWorkoutButton}
                            onClick={() => handleRemoveMovement(workout.id)}
                            title="Remove"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              height="17px"
                              width="17px"
                              fill="var(--accent-color)"
                              viewBox="0 0 640 640"
                            >
                              <path d="M232.7 69.9C237.1 56.8 249.3 48 263.1 48L377 48C390.8 48 403 56.8 407.4 69.9L416 96L512 96C529.7 96 544 110.3 544 128C544 145.7 529.7 160 512 160L128 160C110.3 160 96 145.7 96 128C96 110.3 110.3 96 128 96L224 96L232.7 69.9zM128 208L512 208L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 208zM216 272C202.7 272 192 282.7 192 296L192 488C192 501.3 202.7 512 216 512C229.3 512 240 501.3 240 488L240 296C240 282.7 229.3 272 216 272zM320 272C306.7 272 296 282.7 296 296L296 488C296 501.3 306.7 512 320 512C333.3 512 344 501.3 344 488L344 296C344 282.7 333.3 272 320 272zM424 272C410.7 272 400 282.7 400 296L400 488C400 501.3 410.7 512 424 512C437.3 512 448 501.3 448 488L448 296C448 282.7 437.3 272 424 272z" />
                            </svg>
                          </button>

                          <button
                            className={classes.infoButton}
                            onClick={() => handleInfo(workout)}
                            title="Info"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              height="17px"
                              width="17px"
                              fill="var(--accent-color)"
                              viewBox="0 0 640 640"
                            >
                              <path d="M272 112C272 85.5 293.5 64 320 64C346.5 64 368 85.5 368 112C368 138.5 346.5 160 320 160C293.5 160 272 138.5 272 112zM224 256C224 238.3 238.3 224 256 224L320 224C337.7 224 352 238.3 352 256L352 512L384 512C401.7 512 416 526.3 416 544C416 561.7 401.7 576 384 576L256 576C238.3 576 224 561.7 224 544C224 526.3 238.3 512 256 512L288 512L288 288L256 288C238.3 288 224 273.7 224 256z" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}

                  <button
                    className={classes.addWorkoutButton}
                    onClick={() => setIsSearching(true)}
                  >
                    Add Workout
                  </button>
                </ul>
              )}

              {isSearching && (
                <FitnessSearch addMovementFunction={handleAddMovement} />
              )}
            </section>

            <button
              className={classes.logWorkoutButton}
              onClick={handleLogWorkout}
            >
              Log Workout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Fitness;