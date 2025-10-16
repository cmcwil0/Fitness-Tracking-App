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
        <div className='character-visual'>
            <svg fill="var(--primary-color)" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="500px" height="500px" viewBox="0 0 556.38 556.38" xml:space="preserve">
                <g>
                  <g>
                    <path d="M188.434,315.146c11.767,0,21.31-9.534,21.315-21.301c0.009-0.004,0.028-130.165,0.028-130.165
                              			c0-1.224,0.99-2.218,2.219-2.218h4.513c1.224,0,2.219,0.99,2.219,2.218c0,0,0,365.168,0,365.211
                              			c0,15.181,12.307,27.487,27.487,27.487c15.181,0,27.487-12.307,27.487-27.487c0-0.043,0-214.884,0-214.884
                              			c0-1.568,0.727-2.219,2.271-2.219h4.432c1.549,0,2.271,0.655,2.271,2.219c0,0,0,214.846,0,214.884
                              			c0,15.181,12.308,27.487,27.488,27.487c15.18,0,27.487-12.307,27.487-27.487c0-0.043,0-365.211,0-365.211
                              			c0-1.224,0.989-2.218,2.218-2.218h4.514c1.225,0,2.219,0.99,2.219,2.218c0,0,0.02,130.161,0.028,130.165
                              			c0.01,11.767,9.549,21.301,21.315,21.301c11.771,0,21.319-9.543,21.319-21.319c0-0.067,0-146.359,0-148.104
                              			c0-29.17-22.443-51.614-50.49-51.614c-0.712,0-38.417,0-56.099,0c0,0-3.543,0-8.974,0c-17.681,0-55.386,0-56.098,0
                              			c-28.052,0-50.49,22.438-50.49,51.614c0,1.745,0,148.037,0,148.104C167.114,305.604,176.658,315.146,188.434,315.146z"/>
                    <circle cx="278.192" cy="40.904" r="40.904"/>
                  </g>
                </g>
            </svg>

        </div>
        
        {currentStep === 1 && //render if step = 1
            <div className='step1-container'>
                <div className="name-container">
                    <label>NAME</label>
                    <input type="text" className='name-input' placeholder='name...'/>
                </div>
                <div className='age-container'>
                    <label>AGE</label>
                    <input type="text" className="age-input" placeholder='age...' />
                </div>
                <div className='height-container'>
                    <label>HEIGHT</label>
                    <input type="text" className="height-ft-input" placeholder='ft'/>
                    <input type="text" className="height-in-input" placeholder='in'/>
                </div>
                <div className='weight-container'>
                    <label>WEIGHT</label>
                    <input type="text" className="weight-input" placeholder='lbs' />
                </div>
                <div className="gender-container">
                    <button className={`male-button ${gender === 'male' && 'gender-selected'}`} onClick={() => setGender('male')}>
                        <svg fill='var(--primary-color)' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M384 96C384 78.3 398.3 64 416 64L544 64C561.7 64 576 78.3 576 96L576 224C576 241.7 561.7 256 544 256C526.3 256 512 241.7 512 224L512 173.3L417 268.3C436.5 296.7 448 331 448 368.1C448 465.3 369.2 544.1 272 544.1C174.8 544.1 96 465.2 96 368C96 270.8 174.8 192 272 192C309 192 343.4 203.4 371.8 223L466.8 128L416.1 128C398.4 128 384.1 113.7 384.1 96zM272 480C333.9 480 384 429.9 384 368C384 306.1 333.9 256 272 256C210.1 256 160 306.1 160 368C160 429.9 210.1 480 272 480z"/></svg>
                    </button>
                    <button className={`female-button ${gender === 'female' && 'gender-selected'}`} onClick={() => setGender('female')}>
                        <svg fill='var(--primary-color)' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M208 240C208 178.1 258.1 128 320 128C381.9 128 432 178.1 432 240C432 301.9 381.9 352 320 352C258.1 352 208 301.9 208 240zM351.9 413.1C433.9 398.1 496 326.3 496 240C496 142.8 417.2 64 320 64C222.8 64 144 142.8 144 240C144 326.3 206.1 398.1 288.1 413.1C288 414.1 288 415 288 416L288 480L256 480C238.3 480 224 494.3 224 512C224 529.7 238.3 544 256 544L288 544L288 576C288 593.7 302.3 608 320 608C337.7 608 352 593.7 352 576L352 544L384 544C401.7 544 416 529.7 416 512C416 494.3 401.7 480 384 480L352 480L352 416C352 415 352 414.1 351.9 413.1z"/></svg>
                    </button>
                </div>
                <button className='next-button' onClick={() => setCurrentStep(currentStep + 1)}>NEXT</button>
            </div>
        }
        {currentStep === 2 && //renders if step 2
            <div className="step2-container">
                <div className="activity-level-container">
                    <label>ACTIVITY LEVEL</label>
                    <select>
                            <option value="select" disabled='true' selected='true'>Select</option>
                            <option value="inactive">Inactive (Little or no exercise)</option>
                            <option value="low">Light (1-3 times/week)</option>
                            <option value="moderate">Moderate (4-5 times/week)</option>
                            <option value="active">Active (daily or intense exercise)</option>
                    </select>
                </div>
                <div className="exercise-type-container">
                    <label htmlFor="">EXERCISE TYPE</label>
                    <div className='exercise-type-buttons'>
                        <button className="lifting-button"></button>
                        <button className='cardio-button'></button>
                    </div>
                </div>
                <button className="back-button" onClick={() => setCurrentStep(currentStep - 1)}>BACK</button>
                <button className="next-button">NEXT</button>
            </div>
        }
        {currentStep === 3 && //renders step 3
            <div className="step3-container">

            </div>
        }

      </div>
    </div>
  )
}

export default GoalForm
