import { useState } from 'react';
import classes from '../css/GoalForm.module.css';
import { NutritionRecommendation, WorkoutRecommendation } from '../components/UserRecommendation';
import { useNavigate } from 'react-router-dom';
import { isLoggedIn, authHeaders } from '../utils/auth.js';

const GoalForm = () => {
  const [currentStep, setCurrentStep] = useState(1); 

  const [height, setHeight] = useState(''); //cm
  const [weight, setWeight] = useState(''); //lbs
  const [gender, setGender] = useState(''); //male, female, other
  const [age, setAge] = useState(''); // age in years
  const [activityLevel, setActivityLevel] = useState(''); //inactive, light, moderate, very, heavy
  const [exerciseType, setExerciseType] = useState(''); //lifting, cardio
  const [trainingType, setTrainingType] = useState(''); //Cardio: general, speed, endurance | Lifting: Strength, hypertrophy
  const [nutritionType, setNutritionType] = useState(''); //gain, gainFast, maintain, lose, loseFast
  const [editingField, setEditingField] = useState('');
  const [calorieTarget, setCalorieTarget] = useState('');
  const [workoutRec, setWorkoutRec] = useState(null);

  const navigate = useNavigate();
  const API = import.meta.env.VITE_API_URL || 'http://localhost:4000';

  const editingFields = [
    {id:'height', label: 'Height'},
    {id:'weight', label: 'Weight'},
    {id:'gender', label: 'Gender'},
    {id:'age', label: 'Age'},
    {id:'exerciseType', label: 'Exercise Type'},
    {id:'trainingType', label: 'Training Type'},
    {id:'nutritionType', label: 'Nutrition Type'},
  ];

  async function saveGoalToBackend(targetKcal) {
    const r = await fetch(`${API}/api/goals`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...authHeaders() },
      body: JSON.stringify({ calorie_target: Number(targetKcal) })
    });
    const data = await r.json();
    if (!r.ok) throw new Error(data?.message || 'Failed to save goal');
  }

  const Submit = async () => {
    if (!isLoggedIn()) {
      alert('Please log in to save your goal.');
      navigate('/login');
      return;
    }

    const target = Math.round(
      NutritionRecommendation(height, weight, gender, age, activityLevel, nutritionType)
    );

    const workout = WorkoutRecommendation(exerciseType, trainingType, activityLevel);

    setCalorieTarget(target);
    setWorkoutRec(workout);
    setCurrentStep(currentStep + 1);

    try {
      await saveGoalToBackend(target);
    } catch (e) {
      console.error(e);
    }
  };

  const validateForm = () => { 
    if(currentStep === 1) {
      if(gender !== '' && weight !== '' && height !== '' && activityLevel !== '' && exerciseType !== '') {
        return true;
      } else {
        return false;
      }
    } else if(currentStep === 2) {
      if(trainingType !== '' && nutritionType !== '') {
        return true;
      } else {
        return false;
      }
    }
  };

  const validateStep = (button) => {
    if(button === "back") {
      setCurrentStep(currentStep - 1);
    } else if(button === "next" && validateForm()) {
      setCurrentStep(currentStep + 1);
    } else {
      return;
    }
  };

  const submitForm = () => {};

  return (
    <div className={`${classes.goalFormContainer}`}>
      <div className={`${classes.goalForm}`}>

        {currentStep === 1 && //if step 1 render
          <div className={classes.step1}>
            <h2>Lets get some information..</h2>
            <form className={`${classes.goalInputs}`}>
              <div className={`${classes.genderForm}`}>
                <div className={`${classes.buttonSvgStyle}`}>
                  <button className={`${classes.maleButton} ${gender === 'male' ? classes.buttonSelected : ''}`} onClick={() => setGender('male')} type='button'><svg xmlns="http://www.w3.org/2000/svg" width='35px' height='35px' viewBox="0 0 384 512"><path d="M80 176a112 112 0 1 1 224 0 112 112 0 1 1 -224 0zM223.9 349.1C305.9 334.1 368 262.3 368 176 368 78.8 289.2 0 192 0S16 78.8 16 176c0 86.3 62.1 158.1 144.1 173.1-.1 1-.1 1.9-.1 2.9l0 64-32 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l32 0 0 32c0 17.7 14.3 32 32 32s32-14.3 32-32l0-32 32 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-32 0 0-64c0-1 0-1.9-.1-2.9z"/></svg></button>
                  <label>Male</label>
                </div>
                <div className={`${classes.buttonSvgStyle}`}>
                  <button className={`${classes.femaleButton} ${gender === 'female' ? classes.buttonSelected : ''}`} onClick={() => setGender('female')} type='button'><svg xmlns="http://www.w3.org/2000/svg" width='30px' height='30px' viewBox="0 0 512 512"><path d="M320 32c0-17.7 14.3-32 32-32L480 0c17.7 0 32 14.3 32 32l0 128c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-50.7-95 95c19.5 28.4 31 62.7 31 99.8 0 97.2-78.8 176-176 176S32 401.2 32 304 110.8 128 208 128c37 0 71.4 11.4 99.8 31l95-95-50.7 0c-17.7 0-32-14.3-32-32zM208 416a112 112 0 1 0 0-224 112 112 0 1 0 0 224z"/></svg></button>
                  <label>Female</label>
                </div>
                <div className={`${classes.buttonSvgStyle}`}>
                  <button className={`${classes.otherButton} ${gender === 'other' ? classes.buttonSelected : ''}`} onClick={() => setGender('other')} type='button'><svg xmlns="http://www.w3.org/2000/svg" width='35px' height='35px' viewBox="0 0 384 512"><path d="M192 128a128 128 0 1 1 0 256 128 128 0 1 1 0-256zm0 320a192 192 0 1 0 0-384 192 192 0 1 0 0 384z"/></svg></button>
                  <label>Other</label>
                </div>
              </div>
              <div className={`${classes.ageForm}`}>
                <input type="number" placeholder='Age (years)' className={`${classes.ageInput}`} value={age} onChange={e => setAge(e.target.value)} />
              </div>
              <div className={`${classes.heightForm}`}>
                <input className={`${classes.heightInput}`} type="number" placeholder='Height (cm)' value={height} onChange={e => setHeight(e.target.value)}/>
              </div>
              <div className={`${classes.weightForm}`}>
                <input type="number" placeholder='Weight (lbs)' value={weight} onChange={e => setWeight(e.target.value)}/>
              </div>
              <div className={`${classes.activityForm}`}>
                <select value={activityLevel} onChange={e => setActivityLevel(e.target.value)}>
                  <option value="" disabled hidden>Select</option>
                  <option value="inactive">Inactive</option>
                  <option value="light">Lightly Active</option>
                  <option value="moderate">Moderately Active</option>
                  <option value="very">Very Active</option>
                  <option value="heavy">Heavily Active</option>
                </select>
              </div>
              <div className={`${classes.exerciseTypeForm}`}>
                <div className={`${classes.buttonSvgStyle}`}>
                  <button className={`${classes.liftingButton} ${exerciseType === 'lifting' ? classes.buttonSelected : ''}`} onClick={() => setExerciseType('lifting')} type='button'><svg xmlns="http://www.w3.org/2000/svg" width='35px' height='35px' viewBox="0 0 640 512"><path d="M96 112c0-26.5 21.5-48 48-48s48 21.5 48 48l0 112 256 0 0-112c0-26.5 21.5-48 48-48s48 21.5 48 48l0 16 16 0c26.5 0 48 21.5 48 48l0 48c17.7 0 32 14.3 32 32s-14.3 32-32 32l0 48c0 26.5-21.5 48-48 48l-16 0 0 16c0 26.5-21.5 48-48 48s-48-21.5-48-48l0-112-256 0 0 112c0 26.5-21.5 48-48 48s-48-21.5-48-48l0-16-16 0c-26.5 0-48-21.5-48-48l0-48c-17.7 0-32-14.3-32-32s14.3-32 32-32l0-48c0-26.5 21.5-48 48-48l16 0 0-16z"/></svg></button>
                  <label>Lifting</label>
                </div>
                <div className={`${classes.buttonSvgStyle}`}>
                  <button className={`${classes.cardioButton} ${exerciseType === 'cardio' ? classes.buttonSelected : ''}`} onClick={() => setExerciseType('cardio')} type='button'><svg xmlns="http://www.w3.org/2000/svg" width='35px' height='35px' viewBox="-60 -50 548 612"><path d="M256.5-32a56 56 0 1 1 0 112 56 56 0 1 1 0-112zM123.6 176c-3.3 0-6.2 2-7.4 5L94.2 235.9c-6.6 16.4-25.2 24.4-41.6 17.8s-24.4-25.2-17.8-41.6l21.9-54.9C67.7 129.9 94.1 112 123.6 112l97.3 0c28.5 0 54.8 15.1 69.1 39.7l32.8 56.3 61.6 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-61.6 0c-22.8 0-43.8-12.1-55.3-31.8l-10-17.1-20.7 70.4 75.4 22.6c27.7 8.3 41.8 39 30.1 65.5L285.7 509c-7.2 16.2-26.1 23.4-42.2 16.2s-23.4-26.1-16.2-42.2l49.2-110.8-95.9-28.8c-32.7-9.8-52-43.7-43.7-76.8l22.7-90.6-35.9 0zm-8 181c13.3 14.9 30.7 26.3 51.2 32.4l4.7 1.4-6.9 19.3c-5.8 16.3-16 30.8-29.3 41.8L52.9 519.8c-13.6 11.2-33.8 9.3-45-4.3s-9.3-33.8 4.3-45l82.4-67.9c4.5-3.7 7.8-8.5 9.8-13.9L115.6 357z"/></svg></button>
                  <label>Cardio</label>
                </div>
              </div>
            </form>
          </div>
        }

        {currentStep === 2 && 
          <div className={`${classes.step2}`}>
            <h2>Lets set a goal...</h2>
            {exerciseType === 'lifting' &&
              <>
                <div className={`${classes.trainingTypeForm}`}>
                  <label>Training For...</label>
                  <div>
                    <button onClick={() => setTrainingType('strength')} className={`${trainingType === 'strength' ? classes.buttonSelected : ''}`}>Strength</button>
                    <button onClick={() => setTrainingType('hypertrophy')} className={`${trainingType === 'hypertrophy' ? classes.buttonSelected : ''}`}>Hypertrophy</button>
                  </div>
                </div>
              </>
            }
            {exerciseType === 'cardio' &&
              <>
                <div className={`${classes.trainingTypeForm}`}>
                  <label htmlFor="">Training For...</label>
                  <div>
                    <button onClick={() => setTrainingType('general')} className={`${trainingType === 'general' ? classes.buttonSelected : ''}`}>Improve Overall Fitness</button>
                    <button onClick={() => setTrainingType('speed')} className={`${trainingType === 'speed' ? classes.buttonSelected : ''}`}>Speed</button>
                    <button onClick={() => setTrainingType('endurance')} className={`${trainingType === 'endurance' ? classes.buttonSelected : ''}`}>Endurance</button>
                  </div>
                </div>
              </>
            }
            <div className={`${classes.nutritionTypeForm}`}>
              <label>I want to...</label>
              <div>
                <button onClick={() => setNutritionType('gainFast')} className={`${nutritionType === 'gainFast' ? classes.buttonSelected : ''}`}>{exerciseType === 'lifting' ? 'Bulk Quickly' : 'Gain Weight Fast'}</button>
                <button onClick={() => setNutritionType('gain')} className={`${nutritionType === 'gain' ? classes.buttonSelected : ''}`}>{exerciseType === 'lifting' ? 'Bulk' : 'Gain Weight'}</button>
                <button onClick={() => setNutritionType('maintain')} className={`${nutritionType === 'maintain' ? classes.buttonSelected : ''}`}>Maintain</button>
                <button onClick={() => setNutritionType('lose')} className={`${nutritionType === 'lose' ? classes.buttonSelected : ''}`}>{exerciseType === 'lifting' ? 'Cut' : 'Lose Weight'}</button>
                <button onClick={() => setNutritionType('loseFast')} className={`${nutritionType === 'loseFast' ? classes.buttonSelected : ''}`}>{exerciseType === 'lifting' ? 'Cut Quickly' : 'Lose Weight Fast'}</button> 
              </div>
            </div>

          </div>
        }

        {currentStep === 3 && 
          <div className={`${classes.step3}`}>
            <h2>Does Everything Look Correct?</h2>
            <div className={classes.editForm}>
              {editingFields.map((object, index) => (
                <div className={`${classes.block} ${classes[`${object.id}Container`]}`} key={index}>
                  <label>{object.label}: </label>
                  {editingField !== object.id ? ( 
                    <>
                      <span>{eval(object.id)}</span>
                      <button className={classes.editingButton} onClick={() => setEditingField(object.id)}>Edit</button>
                    </>
                  ) : (
                    <>
                      <input onChange={e => eval(`set${object.id.charAt(0).toUpperCase() + object.id.slice(1)}`)(e.target.value)} value={eval(object.id)} placeholder={`${object.label}...`} />
                      <button className={classes.confirmEditButton} onClick={() => setEditingField('')}>Confirm</button>
                    </>
                  )}
                  {}
                </div>
              ))}
            </div>
          </div>
        }

        {currentStep !== 4 && 
          <div className={`${classes.navigationButtons}`}>
            {currentStep > 1 && <button onClick={() => validateStep('back')}>Back</button>}
            {currentStep < 3 && <button onClick={() => validateStep('next')} className={!validateForm() ? classes.buttonDisabled : ''} >Next</button>}
            {currentStep === 3 && <button onClick={() => Submit()}>Submit</button>}
          </div>
        }

        {}
        {currentStep === 4 && 
          <div className={classes.step4}>
            <h2>Goal Recommendation</h2>
            <div className={classes.nutritionRecContainer}>
              <label>Daily Calorie Target</label>
              <div className={classes.recDiv}>
                <div className={classes.nutritionRec}>
                  {editingField !== 'calorieTarget' ? (
                    <div>
                      <span>{calorieTarget}</span> kcal
                      <button className={classes.editbutton} onClick={() => setEditingField('calorieTarget')}>Edit</button>
                    </div>
                  ) : (
                    <div>
                      <input type="number" placeholder='kcal...' onChange={e => setCalorieTarget(e.target.value)} value={calorieTarget}/> kcal
                      <button className={classes.confirmEditButton} onClick={() => setEditingField('')}>Confirm</button>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className={classes.workoutRecContainer}>
              <label>Weekly Workout Target</label>
              {workoutRec && (
                <div className={classes.workoutRec}>
                  <div className={classes.workoutSummary}>
                    <p><strong>{workoutRec.workoutsPerWeek}</strong> workouts per week</p>
                    <p><strong>{workoutRec.restDays}</strong> rest days</p>
                  </div>
                  <div className={classes.muscleGroups}>
                    <p><strong>Focus Areas:</strong></p>
                    <ul>
                      {workoutRec.muscleGroups.map((group, idx) => (
                        <li key={idx}>{group}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        }

      </div>
    </div>
  );
};

export default GoalForm;