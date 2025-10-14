import '../css/GoalForm.css';
import { useState } from 'react';

const GoalForm = () => {
    const [currentStep, setCurrentStep] = useState(1); //conditional rendering for each step

  return (
    <div className="goal-form-container">
      <div className="goal-form">
        
        {currentStep === 1 && 
            <div className='step1-container'>
                <h1>Welcome {'name'}</h1>
                <h3>Lets set a goal</h3>

                <h3>First, lets get some information</h3>
                
                    <div className='height-container'>
                        <label>Height: </label>
                        <input type="number" placeholder='ft' />
                        <input type="number" placeholder='in' />
                    </div>
                    <div className="weight-container">
                        <label>Weight: </label>
                        <input type="number" placeholder='lbs'/>
                    </div>
                    <div className='gender-container'>
                        <label>Gender: </label>
                        <select name="Gender" id="gender">
                            <option value="select" disabled='true' selected='true'>Select</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>

                    <button className='next-button'>Next</button>
            </div>
        }

      </div>
    </div>
  )
}

export default GoalForm
