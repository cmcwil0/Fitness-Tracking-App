import '../css/GoalForm.css';
import { useState } from 'react';

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
        const totalHeightInches = Number(heightFt * 12) + Number(heightIn);

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
                    <input type="text" className='name-input' placeholder='name...' onChange={e => setUserName(e.target.value)}/>
                </div>
                <div className='age-container'>
                    <label>AGE</label>
                    <input type="number" className="age-input" placeholder='age...' onChange={e => setUserAge(e.target.value)} />
                </div>
                <div className='height-container'>
                    <label>HEIGHT</label>
                    <input type="number" className="height-ft-input" placeholder='ft' onChange={e => setHeightFt(e.target.value)} />
                    <input type="number" className="height-in-input" placeholder='in' onChange={e => setHeightIn(e.target.value)} />
                </div>
                <div className='weight-container'>
                    <label>WEIGHT</label>
                    <input type="number" className="weight-input" placeholder='lbs' onChange={e => setWeight(e.target.value)} />
                </div>
                <div className="gender-container">
                    <button className={`male-button ${gender === 'male' && 'button-selected'}`} onClick={() => setGender('male')}>
                        <svg fill='var(--primary-color)' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M384 96C384 78.3 398.3 64 416 64L544 64C561.7 64 576 78.3 576 96L576 224C576 241.7 561.7 256 544 256C526.3 256 512 241.7 512 224L512 173.3L417 268.3C436.5 296.7 448 331 448 368.1C448 465.3 369.2 544.1 272 544.1C174.8 544.1 96 465.2 96 368C96 270.8 174.8 192 272 192C309 192 343.4 203.4 371.8 223L466.8 128L416.1 128C398.4 128 384.1 113.7 384.1 96zM272 480C333.9 480 384 429.9 384 368C384 306.1 333.9 256 272 256C210.1 256 160 306.1 160 368C160 429.9 210.1 480 272 480z"/></svg>
                    </button>
                    <button className={`female-button ${gender === 'female' && 'button-selected'}`} onClick={() => setGender('female')}>
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
                            <option value="select" disabled='true' selected='true'>SELECT</option>
                            <option value="inactive">Inactive (Little or no exercise)</option>
                            <option value="low">Light (1-3 times/week)</option>
                            <option value="moderate">Moderate (4-5 times/week)</option>
                            <option value="active">Active (daily or intense exercise)</option>
                    </select>
                </div>
                <div className="exercise-type-container">
                    <label htmlFor="">EXERCISE TYPE</label>
                    <div className='exercise-type-buttons'>
                        <div className='button-container'>
                            <button className={`lifting-button ${exerciseType === 'lifting' && 'button-selected'}`} onClick={() => setExerciseType('lifting')} >
                                <svg xmlns="http://www.w3.org/2000/svg" fill='var(--primary-color)' viewBox="0 0 640 512"><path d="M96 112c0-26.5 21.5-48 48-48s48 21.5 48 48l0 112 256 0 0-112c0-26.5 21.5-48 48-48s48 21.5 48 48l0 16 16 0c26.5 0 48 21.5 48 48l0 48c17.7 0 32 14.3 32 32s-14.3 32-32 32l0 48c0 26.5-21.5 48-48 48l-16 0 0 16c0 26.5-21.5 48-48 48s-48-21.5-48-48l0-112-256 0 0 112c0 26.5-21.5 48-48 48s-48-21.5-48-48l0-16-16 0c-26.5 0-48-21.5-48-48l0-48c-17.7 0-32-14.3-32-32s14.3-32 32-32l0-48c0-26.5 21.5-48 48-48l16 0 0-16z"/></svg>
                            </button>
                            <label className='lifting-label'>Lifting</label>
                        </div>
                        <div className='button-container'>
                            <button className={`cardio-button ${exerciseType === 'cardio' && 'button-selected'}`} onClick={() => setExerciseType('cardio')}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill='var(--primary-color)' viewBox="0 0 600 530"><path d="M256.5-32a56 56 0 1 1 0 112 56 56 0 1 1 0-112zM123.6 176c-3.3 0-6.2 2-7.4 5L94.2 235.9c-6.6 16.4-25.2 24.4-41.6 17.8s-24.4-25.2-17.8-41.6l21.9-54.9C67.7 129.9 94.1 112 123.6 112l97.3 0c28.5 0 54.8 15.1 69.1 39.7l32.8 56.3 61.6 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-61.6 0c-22.8 0-43.8-12.1-55.3-31.8l-10-17.1-20.7 70.4 75.4 22.6c27.7 8.3 41.8 39 30.1 65.5L285.7 509c-7.2 16.2-26.1 23.4-42.2 16.2s-23.4-26.1-16.2-42.2l49.2-110.8-95.9-28.8c-32.7-9.8-52-43.7-43.7-76.8l22.7-90.6-35.9 0zm-8 181c13.3 14.9 30.7 26.3 51.2 32.4l4.7 1.4-6.9 19.3c-5.8 16.3-16 30.8-29.3 41.8L52.9 519.8c-13.6 11.2-33.8 9.3-45-4.3s-9.3-33.8 4.3-45l82.4-67.9c4.5-3.7 7.8-8.5 9.8-13.9L115.6 357z"/></svg>
                            </button>
                            <label className='cardio-label'>Cardio</label>
                        </div>
                    </div>
                </div>
                <div className='step-buttons'>
                    <button className="back-button" onClick={() => setCurrentStep(currentStep - 1)}>BACK</button>
                    <button className="next-button" onClick={() => setCurrentStep(currentStep + 1)}>NEXT</button>
                </div>
            </div>
        }
        {(currentStep === 3 && exerciseType === 'lifting') && //renders step 3 if type is lifting
            <div className="step3-container">
                <h4>NEXT, LETS SET A GOAL</h4>

                <div className="training-type-container">
                    <label htmlFor="">I AM TRAINING FOR... </label>
                    <button className={`button1-style ${trainingType === 'strength' && 'button1-selected'}`} onClick={() => setTrainingType('strength')} >STRENGTH</button>
                    <button className={`button1-style ${trainingType === 'hypertrophy' && 'button1-selected'}`} onClick={() => setTrainingType('hypertrophy')}>HYPERTROPHY</button>
                </div>
                <div className="nutrition-style-container">
                    <label>I WANT TO... </label>
                    <button className={`button1-style ${nutritionType === 'bulk' && 'button1-selected'}`} onClick={() => setNutritionType('bulk')}>BULK</button>
                    <button className={`button1-style ${nutritionType === 'maintain' && 'button1-selected'}`} onClick={() => setNutritionType('maintain')}>MAINTAIN</button>
                    <button className={`button1-style ${nutritionType === 'cut' && 'button1-selected'}`} onClick={() => setNutritionType('cut')}>CUT</button>
                </div>

                <div className='step-buttons'>
                    <button className="back-button" onClick={() => setCurrentStep(currentStep - 1)}>BACK</button>
                    <button className="next-button" onClick={() => setCurrentStep(currentStep + 1)}>NEXT</button>
                </div>
            </div>
        }
        {(currentStep === 3 && exerciseType === 'cardio') && //renders step 3 if type is cardio

            <div className='step3-container'>

            </div>

        }
        {currentStep === 4 && // step 4
            <div className='step4-container'>
                <div>
                    I WANT TO {activityLevel.toUpperCase()}
                </div>

                <div className='step-buttons'>
                    <button className="back-button" onClick={() => setCurrentStep(currentStep - 1)}>BACK</button>
                    <button className="next-button" onClick={() => setCurrentStep(currentStep + 1)}>NEXT</button>
                </div>
            </div>
        }

      </div>
    </div>
  )
}

export default GoalForm
