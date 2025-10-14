import '../css/GoalForm.css';
import { useState } from 'react';

const GoalForm = () => {
    const [currentStep, setCurrentStep] = useState(1); //conditional rendering for each step

    const [heightFt, setHeightFt] = useState('');
    const [heightIn, setHeightIn] = useState('');
    const [weight, setWeight] = useState('');
    const [gender, setGender] = useState('');
    const [activityLevel, setActivityLevel] = useState('');
    const [exerciseType, setExerciseType] = useState('');

    const getResults = () => {
        const totalHeightInches = Number(heightFt / 12) + Number(heightIn);

    }


   

  return (
    <div className="goal-form-container">
      <div className="goal-form">
        
        {currentStep === 1 && //render if step = 1
            <div className='step1-container'>
                <h1>Welcome {'name'}</h1>
                <h3>First, lets get some information</h3>
                
                    <div className='height-container'>
                        <label>Height: </label>
                        <input type="number" placeholder='ft' value={heightFt} onChange={e => setHeightFt(e.target.value)} />
                        <input type="number" placeholder='in' value={heightIn} onChange={e => setHeightIn(e.target.value)} />
                    </div>
                    <div className="weight-container">
                        <label>Weight:  </label>
                        <input type="number" placeholder='lbs' value={weight} onChange={e => setWeight(e.target.value)}/>
                    </div>
                    <div className='gender-container'>
                        <label>Gender:  </label>
                        <select name="Gender" id="gender" value={gender} onChange={e => setGender(e.target.value)}>
                            <option value="select" disabled='true' selected='true'>Select</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>
                    <div className='activity-level-container'>
                        <label>Activity Level: </label>
                        <select name="ActivityLevel" id="activity-level" value={activityLevel} onChange={e => setActivityLevel(e.target.value)}>
                            <option value="select" disabled='true' selected='true'>Select</option>
                            <option value="inactive">Inactive (Little or no exercise)</option>
                            <option value="low">Light (1-3 times/week)</option>
                            <option value="moderate">Moderate (4-5 times/week)</option>
                            <option value="active">Active (daily or intense exercise)</option>
                        </select>
                    </div>
                    <div className='exercise-type-container'>
                        <label>Excercise Type:</label>
                            <button className={exerciseType === 'lifting' ? 'button-selected' : ''} onClick={() => setExerciseType('lifting')}>Lifting Weights</button>
                            or
                            <button className={exerciseType === 'cardio' ? 'button-selected' : ''} onClick={() => setExerciseType('cardio')}>Cardio</button>
                    </div>

                    
                    <button className='next-button' onClick={() => setCurrentStep(currentStep + 1)}>Next</button>
            </div>
        }
        {currentStep === 2 && //renders if step 2
            <div className="step2-container">
                <h3>Next, lets set a goal</h3>

                {exerciseType === 'lifting' && //renders if excercise type lifting
                    <>
                        <div>
                            <label>Training for: </label>
                            <button>Strength</button>
                            <button>Hypertrophy</button>
                        </div>
                        <div>
                            <label>I want to: </label>
                            <button>Build Muscle</button>
                            <button>Cut Fat</button>
                            <button></button>
                        </div>
                       
                    </> 
                }

                
                <button className="back-button" onClick={() => setCurrentStep(currentStep - 1)}>Back</button>
            </div>
            
        }

      </div>
    </div>
  )
}

export default GoalForm
