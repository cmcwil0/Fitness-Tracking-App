import { useState } from "react";
import classes from '../css/MacroSearch.module.css';

const foods = [ //example list *WILL BE REPLACED BY NUTRITIONIX*
  { id: 1, name: "Granola Bar", brand: "Nature Valley", calories: 200, protein: 3, carbs: 29, fat: 8 },
  { id: 2, name: "Chicken Breast (100g)", brand: "Generic", calories: 165, protein: 31, carbs: 0, fat: 3.6 },
  { id: 3, name: "Brown Rice (1 cup)", brand: "Generic", calories: 216, protein: 5, carbs: 45, fat: 1.8 },
  { id: 4, name: "Apple (medium)", brand: "Generic", calories: 95, protein: 0.5, carbs: 25, fat: 0.3 },
  { id: 5, name: "Greek Yogurt (plain, 170g)", brand: "Chobani", calories: 100, protein: 17, carbs: 6, fat: 0 },
  { id: 6, name: "Almonds (28g)", brand: "Blue Diamond", calories: 164, protein: 6, carbs: 6, fat: 14 },
  { id: 7, name: "Egg (large)", brand: "Generic", calories: 72, protein: 6, carbs: 0.6, fat: 5 },
  { id: 8, name: "Banana (medium)", brand: "Generic", calories: 105, protein: 1.3, carbs: 27, fat: 0.3 },
  { id: 9, name: "Broccoli (1 cup)", brand: "Generic", calories: 55, protein: 3.7, carbs: 11, fat: 0.6 },
  { id: 10, name: "Salmon (100g)", brand: "Generic", calories: 206, protein: 22, carbs: 0, fat: 13 },
  { id: 11, name: "Peanut Butter (2 tbsp)", brand: "Jif", calories: 188, protein: 8, carbs: 6, fat: 16 },
];



const MacroSearch = ({onFocus, onBlur}) => {
    const [search, setSearch] = useState('');

    const filteredFoods = foods.filter(item =>
      item.name.toLowerCase().includes(search.toLowerCase())  
    );



  return (
    <div className={classes.macroSearchContainer}>
      <form className={classes.searchFood}>
          <input 
            type="text" 
            placeholder='search for meal...'
            value={search}
            onChange={element => setSearch(element.target.value)}
            onFocus={onFocus}
            onBlur={onBlur}
             />
          <ul className={classes.foodsList}>
            {search !== '' && filteredFoods.map(item => (
              <li key={item.id}>
                <div className={classes.mainInfo}>
                  <span className={classes.itemName}>{item.name}</span>
                  <span className={classes.itemBrand}>{item.brand}</span>
                </div>
                <div className={classes.subInfo}>
                  <span className={classes.itemCalories}>{item.calories}<span>kcal</span></span>
                  <button className={classes.infoButton} type="button">?</button>
                  <button className={classes.addFoodButton} type="button">+</button>
                </div>
              </li>
            ))}
          </ul> 
        </form>
    </div>
  )
}

export default MacroSearch
