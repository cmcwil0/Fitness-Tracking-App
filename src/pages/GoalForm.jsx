import { useState } from 'react';
import classes from '../css/GoalForm.module.css';

const GoalForm = () => {
    const [currentStep, setCurrentStep] = useState(1); //conditional rendering for each step

    const [userName, setUserName] =useState('');
    const [userAge, setUserAge] =useState('');
    const [heightFt, setHeightFt] = useState('');
    const [heightIn, setHeightIn] = useState('');
    const [weight, setWeight] = useState('');
    const [gender, setGender] = useState('');
    const [activityLevel, setActivityLevel] = useState('');
    const [exerciseType, setExerciseType] = useState('');
    const [trainingType, setTrainingType] = useState('');
    const [nutritionType, setNutritionType] = useState('');

    const getResults = () => {
        // const totalHeightInches = Number(heightFt * 12) + Number(heightIn);
    }


   

  return (
    <div className={`${classes.goalFormContainer}`}>
        <div className={`${classes.goalForm}`}>

      {currentStep === 1 &&
                <div className={classes.step1}>
                   <h2>Lets get some information..</h2>

                   <form action="" className={`${classes.goalInputs}`}>

                      <div className={`${classes.genderForm}`}>
                          <label>Gender</label>
                          <button className={classes.maleButton}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M80 176a112 112 0 1 1 224 0 112 112 0 1 1 -224 0zM223.9 349.1C305.9 334.1 368 262.3 368 176 368 78.8 289.2 0 192 0S16 78.8 16 176c0 86.3 62.1 158.1 144.1 173.1-.1 1-.1 1.9-.1 2.9l0 64-32 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l32 0 0 32c0 17.7 14.3 32 32 32s32-14.3 32-32l0-32 32 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-32 0 0-64c0-1 0-1.9-.1-2.9z"/></svg></button>
                          <button className={classes.femaleButton}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M320 32c0-17.7 14.3-32 32-32L480 0c17.7 0 32 14.3 32 32l0 128c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-50.7-95 95c19.5 28.4 31 62.7 31 99.8 0 97.2-78.8 176-176 176S32 401.2 32 304 110.8 128 208 128c37 0 71.4 11.4 99.8 31l95-95-50.7 0c-17.7 0-32-14.3-32-32zM208 416a112 112 0 1 0 0-224 112 112 0 1 0 0 224z"/></svg></button>
                          <button className={classes.otherButton}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M192 128a128 128 0 1 1 0 256 128 128 0 1 1 0-256zm0 320a192 192 0 1 0 0-384 192 192 0 1 0 0 384z"/></svg></button>
                      </div>

                      <div className={`${classes.heightForm}`}>
                      <label>Height</label>
                          <div>
                              <input className={`${classes.feetInput}`} type="number" placeholder='ft' />
                              <input className={`${classes.inchesInput}`} type="number" placeholder='in' />
                          </div>
                      </div>

                      <div className={`${classes.weightForm}`}>
                          <input type="number" placeholder='Weight' />
                      </div>

                      <div className={`${classes.activityForm}`}>
                          <select>
                              <option value="" disabled hidden>Select</option>
                              <option value="inactive">Inactive</option>
                              <option value="light">Lightly Active</option>
                              <option value="moderate">Moderately Active</option>
                              <option value="heavy">Heavily Active</option>
                          </select>
                      </div>

                   </form>
                </div>        
      }
      {currentStep === 2 &&
        <div className={`${classes.step2}`}>
            ayo
        </div>

      }
            <div className={`${classes.navigationButtons}`}>
                {currentStep > 1 && <button onClick={() => setCurrentStep(prev => prev - 1)}>Back</button>}
                {currentStep < 3 && <button onClick={() => setCurrentStep(prev => prev + 1)}>Next</button>} 
                {currentStep === 3 && <button >Submit</button>}
            </div>
        </div>
      </div>
    )
  
}

export default GoalForm
