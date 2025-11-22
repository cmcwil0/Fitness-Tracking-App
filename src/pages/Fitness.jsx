// src/pages/Fitness.jsx
import classes from '../css/Fitness.module.css';
import { getCurrentDate } from './Dashboard.jsx';
import FitnessCircle from '../components/FitnessCircle.jsx';
import { useState } from 'react';
import FitnessCalendar from '../components/FitnessCalendar.jsx';
import FitnessSearch from '../components/FitnessSearch.jsx';

const workoutLog = [
  { id: 'seed-1', name: 'Push-ups', description: 'Standard grip push ups' },
  { id: 'seed-2', name: 'Chest Press', description: 'Barbell Chest Press' },
  { id: 'seed-3', name: 'Chest Press', description: 'Barbell Chest Press' },
];

const presets = [
  { id: 1, name: 'Chest Day' },
  { id: 2, name: 'Back Day' },
];

// util to generate stable-ish ids for list keys
const uid = () => `${Date.now()}-${Math.random().toString(36).slice(2,8)}`;
const cap = (s='') => s.charAt(0).toUpperCase() + s.slice(1);

const Fitness = () => {
  const [workoutLogged, setWorkoutLogged] = useState(false);
  const [isWorkoutFocused, setIsWorkoutFocused] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const [workoutType, setWorkoutType] = useState('');
  const [currentPreset, setCurrentPreset] = useState('');

  // this drives the visible cards in the list
  const [workouts, setWorkouts] = useState(workoutLog);

  const handleFitnessCircle = () => setIsWorkoutFocused(true);
  const handleBackButton     = () => setIsSearching(false);

  // Map API Ninjas exercise -> our list item shape (name/description)
  const mapExerciseToItem = (ex) => ({
    id: `ex-${uid()}`,
    name: cap(ex?.name || 'Exercise'),
    description: [
      ex?.equipment ? cap(ex.equipment) : null,
      ex?.muscle ? cap(ex.muscle) : null
    ].filter(Boolean).join(' • ') || (ex?.type ? cap(ex.type) : ''),
    _raw: ex, // keep full object for info popup
  });

  // called by FitnessSearch on "+"
  const handleAddMovement = (exerciseFromSearch) => {
    const item = mapExerciseToItem(exerciseFromSearch || {});
    setWorkouts(prev => [...prev, item]);
    setIsSearching(false);
  };

  const handleRemoveMovement = (id) => {
    setWorkouts(prev => prev.filter(w => w.id !== id));
  };

  const handleInfo = (item) => {
    const ex = item?._raw || {};
    const lines = [
      `Name: ${cap(ex.name || item.name)}`,
      ex.type        ? `Type: ${cap(ex.type)}` : null,
      ex.muscle      ? `Muscle: ${cap(ex.muscle)}` : null,
      ex.equipment   ? `Equipment: ${cap(ex.equipment)}` : null,
      ex.difficulty  ? `Difficulty: ${cap(ex.difficulty)}` : null,
      ex.instructions? `\nInstructions:\n${ex.instructions}` : null,
    ].filter(Boolean);
    window.alert(lines.join('\n'));
  };

  const handleLogWorkout = () => {
    // For now just close the logger; later you can POST workouts + duration/etc.
    setWorkoutLogged(true);
    setIsWorkoutFocused(false);
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
          </div>
        )}

        {isWorkoutFocused && (
          <div className={classes.isLoggingContainer}>
            <section className={classes.topSection}>
              <div className={classes.leftColumn}>
                <div className={classes.workoutTimeContainer}>
                  <label>Duration:</label>
                  <input className={classes.timeInputHours} type="number" placeholder="hr" />
                  <div className={classes.colon}>:</div>
                  <input className={classes.timeInputMins} type="number" placeholder="m" />
                </div>

                <div>
                  <label>Workout Type:</label>
                  <select value={workoutType} onChange={(e) => setWorkoutType(e.target.value)}>
                    <option value="" disabled>Select</option>
                    <option value="weight_lifting">Weight Lifting</option>
                    <option value="cardio">Cardio</option>
                  </select>
                </div>

                <div>
                  <label>Preset:</label>
                  <select value={currentPreset} onChange={(e) => setCurrentPreset(e.target.value)}>
                    {presets.map(preset => (
                      <option value={preset.name} key={preset.id}>{preset.name}</option>
                    ))}
                    <option value="add-new-preset">Add New Preset</option>
                  </select>

                  {isSearching && (
                    <div className={classes.backButtonContainer}>
                      <button className={classes.backButton} onClick={handleBackButton}>back</button>
                    </div>
                  )}
                </div>
              </div>

              <div className={classes.dateContainer}>
                {getCurrentDate()}
              </div>
            </section>

            <section className={classes.logMainSection}>
              {!isSearching && (
                <ul className={classes.workoutList}>
                  {workouts.map((workout) => (
                    <li className={classes.workoutCard} key={workout.id}>
                      <div className={classes.workoutImageContainer}>image</div>

                      <div className={classes.workoutText}>
                        <div className={classes.workoutName}>{workout.name}</div>
                        <div className={classes.subText}>{workout.description}</div>
                      </div>

                      <div className={classes.buttonContainer}>
                        <div className={classes.smallButtons}>
                          <button
                            className={classes.removeWorkoutButton}
                            onClick={() => handleRemoveMovement(workout.id)}
                            title="Remove"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" height="17px" width="17px" fill="var(--accent-color)" viewBox="0 0 640 640">
                              <path d="M232.7 69.9C237.1 56.8 249.3 48 263.1 48L377 48C390.8 48 403 56.8 407.4 69.9L416 96L512 96C529.7 96 544 110.3 544 128C544 145.7 529.7 160 512 160L128 160C110.3 160 96 145.7 96 128C96 110.3 110.3 96 128 96L224 96L232.7 69.9zM128 208L512 208L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 208zM216 272C202.7 272 192 282.7 192 296L192 488C192 501.3 202.7 512 216 512C229.3 512 240 501.3 240 488L240 296C240 282.7 229.3 272 216 272zM320 272C306.7 272 296 282.7 296 296L296 488C296 501.3 306.7 512 320 512C333.3 512 344 501.3 344 488L344 296C344 282.7 333.3 272 320 272zM424 272C410.7 272 400 282.7 400 296L400 488C400 501.3 410.7 512 424 512C437.3 512 448 501.3 448 488L448 296C448 282.7 437.3 272 424 272z" />
                            </svg>
                          </button>

                          <button
                            className={classes.infoButton}
                            onClick={() => handleInfo(workout)}
                            title="Info"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" height="17px" width="17px" fill="var(--accent-color)" viewBox="0 0 640 640">
                              <path d="M272 112C272 85.5 293.5 64 320 64C346.5 64 368 85.5 368 112C368 138.5 346.5 160 320 160C293.5 160 272 138.5 272 112zM224 256C224 238.3 238.3 224 256 224L320 224C337.7 224 352 238.3 352 256L352 512L384 512C401.7 512 416 526.3 416 544C416 561.7 401.7 576 384 576L256 576C238.3 576 224 561.7 224 544C224 526.3 238.3 512 256 512L288 512L288 288L256 288C238.3 288 224 273.7 224 256z" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}

                  <button className={classes.addWorkoutButton} onClick={() => setIsSearching(true)}>
                    Add Workout
                  </button>
                </ul>
              )}

              {isSearching && (
                // Your FitnessSearch already fetches from API Ninjas.
                // It should call props.addMovementFunction(exercise) on "+"
                <FitnessSearch addMovementFunction={handleAddMovement} />
              )}
            </section>

            <button className={classes.logWorkoutButton} onClick={handleLogWorkout}>
              Log Workout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Fitness;