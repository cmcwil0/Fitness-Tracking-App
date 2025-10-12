import { useState } from 'react';
import '../css/Nutrition.css'
import MacroSearch from '../components/MacroSearch';

// list of objects for testing 



const Nutrition = () => {
  return (
    <div className="nutrition-page">
      <div className="nutrition-container">
        <div>Calories</div>

        <div>
          <span className='calorie-count'>{2000}</span>
          <span> kcal</span>
        </div>

        <div>Remaining: {1000}</div>

        <MacroSearch />


      </div>
    </div>
  )
}

export default Nutrition
