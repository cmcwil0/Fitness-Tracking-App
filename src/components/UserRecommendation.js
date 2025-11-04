import { act } from "react";


const getBMI = (height, weight) => {
    //BMI = weight(kg) / (height(m))^2
    const heightM = height / 100;
    const weightKG = weight * 0.453592;
    return weightKG / (heightM ** 2);
}

const getBMR = (height, weight, gender, age) => {
    const weightKG = weight * 0.453592;
    if(gender === 'male') {
        return 88.362 + (13.397 * weightKG) + (4.799 * height) - (5.677 * age);
    } else if(gender === 'female' || gender === 'other') {
        return 447.593 + (9.247 * weightKG) + (3.098 * height) - (4.330 * age);
    }
}

const getTDEE = (bmr, activityLevel) => {
    switch(activityLevel) {// if activity level === case '' : than do this
        case 'inactive': return bmr * 1.2;
        case 'light' : return bmr * 1.375;
        case 'moderate' : return bmr * 1.55;
        case 'very' : return bmr * 1.725;
        case 'heavy' : return bmr * 1.9;
    }

}


//algorithm to determine user goal recommendation

const GoalRecommendation = (height, weight, gender, age, activityLevel, exerciseType, trainingType, nutritionType) => {
    
    //get BMI   
    const BMI = getBMI(height, weight);
    const BMR = getBMR(height, weight, gender, age); //base metobolic rate

    const TDEE = getTDEE(BMR, activityLevel);

    

}   

export default GoalRecommendation;