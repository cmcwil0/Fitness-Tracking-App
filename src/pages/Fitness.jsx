import classes from '../css/Fitness.module.css';
import { getCurrentDate } from './Dashboard.jsx';
import FitnessCircle from '../components/FitnessCircle.jsx';
import FitnessCalendar from '../components/FitnessCalendar.jsx';
import { useState } from 'react';

const workoutLog = [
  { id: 1, name: 'Push-ups', description: 'Standard grip push ups' },
  { id: 2, name: 'Chest Press', description: 'Barbell Chest Press' },
];

const Fitness = () => {
  const [workoutLogged, setWorkoutLogged] = useState(false);
  const [isWorkoutFocused, setIsWorkoutFocused] = useState(false);

  const handleFitnessCircle = () => {
    setIsWorkoutFocused(true);
  }

  const handleAddWorkout = () => {
    // will be added to
  }

  const handleLogWorkout = () => {
    //submit workout data to database
    setIsWorkoutFocused(false);
  }

  return (
    <div className={classes.fitnessPage}>
      <div className={classes.fitnessContainer}>
        {!isWorkoutFocused && (
          <>
            <div className={classes.dateLabel}>{getCurrentDate()}</div>
        </div>
            <FitnessCircle onButtonClick={handleFitnessCircle} />
            <FitnessCalendar />
        
          </>
        )}

        {isWorkoutFocused && (
          <div className={classes.isLoggingContainer}>
            <section className={classes.topSection}>
              <div className={classes.leftColumn}>
                <div className={classes.workoutTimeContainer}>
                  <label>Time:</label>
                  <input type="number" />
                </div>
                <div>
                  <label>Workout Type:</label>
                  <select name="" id="">
                    <option value="">Weight Lifting</option>
                    <option value="">Cardio</option>
                  </select>
                </div>
                <div>
                  <label>Preset:</label>
                  <select></select>
                </div>
              </div>
           
              <div className={classes.dateContainer}>
                {getCurrentDate()}
              </div>
            </section>

            <section className={classes.logMainSection}>
              <ul className={classes.workoutList}>

                {workoutLog.map((workout, index) => ( // each workout card
                  <li className={classes.workoutCard} key={index}>

                    <div className={classes.workoutImageContainer}>image</div>

                    <div className={classes.workoutText}>
                      <div className={classes.workoutName}>{workout.name}</div>
                      <div className={classes.subText}>{workout.description}</div>
                    </div>

                      <div className={classes.buttonContainer}>
                        <div className={classes.smallButtons}>
                          <button className={classes.removeWorkoutButton}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="17px" width="17px" fill="var(--accent-color)" viewBox="0 0 640 640">
                              <path d="M232.7 69.9C237.1 56.8 249.3 48 263.1 48L377 48C390.8 48 403 56.8 407.4 69.9L416 96L512 96C529.7 96 544 110.3 544 128C544 145.7 529.7 160 512 160L128 160C110.3 160 96 145.7 96 128C96 110.3 110.3 96 128 96L224 96L232.7 69.9zM128 208L512 208L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 208zM216 272C202.7 272 192 282.7 192 296L192 488C192 501.3 202.7 512 216 512C229.3 512 240 501.3 240 488L240 296C240 282.7 229.3 272 216 272zM320 272C306.7 272 296 282.7 296 296L296 488C296 501.3 306.7 512 320 512C333.3 512 344 501.3 344 488L344 296C344 282.7 333.3 272 320 272zM424 272C410.7 272 400 282.7 400 296L400 488C400 501.3 410.7 512 424 512C437.3 512 448 501.3 448 488L448 296C448 282.7 437.3 272 424 272z" />
                            </svg>
                          </button>
                          <button className={classes.infoButton}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="17px" width="17px" fill="var(--accent-color)" viewBox="0 0 640 640">
                              <path d="M272 112C272 85.5 293.5 64 320 64C346.5 64 368 85.5 368 112C368 138.5 346.5 160 320 160C293.5 160 272 138.5 272 112zM224 256C224 238.3 238.3 224 256 224L320 224C337.7 224 352 238.3 352 256L352 512L384 512C401.7 512 416 526.3 416 544C416 561.7 401.7 576 384 576L256 576C238.3 576 224 561.7 224 544C224 526.3 238.3 512 256 512L288 512L288 288L256 288C238.3 288 224 273.7 224 256z" />
                            </svg>
                          </button>
                        </div>

                      <button className={classes.prButton}>New PR</button>
                    </div>
                    


                  </li>
                ))}
                
              </ul>
              <button className={classes.addWorkoutButton} onClick={() => handleAddWorkout()}>Add Workout</button>
            </section>

            <button className={classes.logWorkoutButton} onClick={() => handleLogWorkout()}>Log Workout</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Fitness;
