import { useState } from "react";
import '../css/MacroSearch.css';

const foods = [
  { id: 1, name: "Nature Valley Granola Bar", calories: 200, protein: 3, carbs: 29, fat: 8 },
  { id: 2, name: "Chicken Breast (100g)", calories: 165, protein: 31, carbs: 0, fat: 3.6 },
  { id: 3, name: "Brown Rice (1 cup)", calories: 216, protein: 5, carbs: 45, fat: 1.8 },
  { id: 4, name: "Apple (medium)", calories: 95, protein: 0.5, carbs: 25, fat: 0.3 },
  { id: 5, name: "Greek Yogurt (plain, 170g)", calories: 100, protein: 17, carbs: 6, fat: 0 },
  { id: 6, name: "Almonds (28g)", calories: 164, protein: 6, carbs: 6, fat: 14 },
  { id: 7, name: "Egg (large)", calories: 72, protein: 6, carbs: 0.6, fat: 5 },
  { id: 8, name: "Banana (medium)", calories: 105, protein: 1.3, carbs: 27, fat: 0.3 },
  { id: 9, name: "Broccoli (1 cup)", calories: 55, protein: 3.7, carbs: 11, fat: 0.6 },
  { id: 10, name: "Salmon (100g)", calories: 206, protein: 22, carbs: 0, fat: 13 },
  { id: 11, name: "Peanut Butter (2 tbsp)", calories: 188, protein: 8, carbs: 6, fat: 16 },
];



const MacroSearch = () => {
    const [search, setSearch] = useState('');

    const filtered = foods.filter(item =>
      item.name.toLowerCase().includes(search.toLowerCase())  
    );



  return (
    <div className="macro-search-container">
      <form className='search-food'>
          <input 
            type="text" 
            placeholder='search for meal...'
            value={search}
            onChange={element => setSearch(element.target.value)}
             />
          <ul className='foods-list'>
            {search !== '' && filtered.map(item => (
              <li key={item.id}>
                <span>{item.name}</span>
                <span>{item.calories}kcal</span>
                <span>{item.protein}g</span>
                <span>{item.carbs}g</span>
                <span>{item.fat}g</span>
              </li>
            ))}
          </ul> 
        </form>


    </div>
  )
}

export default MacroSearch
