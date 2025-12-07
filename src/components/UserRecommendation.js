import { act } from "react";


// const getBMI = (height, weight) => {
//     //BMI = weight(kg) / (height(m))^2
//     const heightM = height / 100;
//     const weightKG = weight * 0.453592;
//     return weightKG / (heightM ** 2);
// }

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

export const NutritionRecommendation = (height, weight, gender, age, activityLevel, nutritionType) => {
    
    //get BMR   
    const BMR = getBMR(height, weight, gender, age); //base metobolic rate

    const TDEE = getTDEE(BMR, activityLevel);

    


    switch(nutritionType) {
        case 'gain' : return TDEE + (TDEE * 0.13);
        case 'gainFast' : return TDEE + (TDEE * 0.23);
        case 'maintain' : return TDEE;
        case 'lose' : return TDEE - (TDEE * 0.13);
        case 'loseFast' : return TDEE - (TDEE * 0.23);
    }

    //will be expanded upon
    

}   

export const WorkoutRecommendation = (exerciseType, trainingType, activityLevel) => {
    let workoutsPerWeek = 0;
    let muscleGroups = [];
    let restDays = 0;
    let notes = '';

    // Determine workouts per week based on activity level and training type
    if (exerciseType === 'lifting') {
        switch (trainingType) {
            case 'strength':
                workoutsPerWeek = activityLevel === 'heavy' || activityLevel === 'very' ? 5 : 4;
                muscleGroups = ['Chest/Triceps', 'Back/Biceps', 'Legs', 'Shoulders', 'Full Body'];
                restDays = 7 - workoutsPerWeek;
                notes = 'Focus on compound movements with heavy weight and low reps (3-6 reps). Rest 3-5 minutes between sets.';
                break;
            case 'hypertrophy':
                workoutsPerWeek = activityLevel === 'heavy' ? 6 : activityLevel === 'very' ? 5 : 4;
                muscleGroups = ['Chest', 'Back', 'Legs', 'Shoulders', 'Arms', 'Core'];
                restDays = 7 - workoutsPerWeek;
                notes = 'Focus on moderate weight with higher volume (8-12 reps). Rest 60-90 seconds between sets.';
                break;
            default:
                workoutsPerWeek = 3;
                muscleGroups = ['Upper Body', 'Lower Body', 'Full Body'];
                restDays = 4;
                notes = 'Balanced approach for general fitness.';
        }
    } else if (exerciseType === 'cardio') {
        switch (trainingType) {
            case 'speed':
                workoutsPerWeek = activityLevel === 'heavy' || activityLevel === 'very' ? 5 : 4;
                muscleGroups = ['HIIT Intervals', 'Sprint Work', 'Tempo Runs', 'Recovery Runs'];
                restDays = 7 - workoutsPerWeek;
                notes = 'Focus on high-intensity intervals and sprint work. Include recovery runs between hard sessions.';
                break;
            case 'endurance':
                workoutsPerWeek = activityLevel === 'heavy' ? 6 : activityLevel === 'very' ? 5 : 4;
                muscleGroups = ['Long Runs', 'Tempo Runs', 'Easy Pace', 'Cross Training'];
                restDays = 7 - workoutsPerWeek;
                notes = 'Build aerobic base with longer, steady-state cardio sessions. Mix in cross-training to prevent overuse injuries.';
                break;
            case 'general':
                workoutsPerWeek = activityLevel === 'very' || activityLevel === 'heavy' ? 5 : activityLevel === 'moderate' ? 4 : 3;
                muscleGroups = ['Steady Cardio', 'HIIT', 'Active Recovery', 'Mixed Intensity'];
                restDays = 7 - workoutsPerWeek;
                notes = 'Variety of cardio intensities for overall fitness. Include both steady-state and interval work.';
                break;
            default:
                workoutsPerWeek = 3;
                muscleGroups = ['Cardio Session', 'Active Recovery'];
                restDays = 4;
                notes = 'General cardiovascular fitness.';
        }
    }

    return {
        workoutsPerWeek,
        muscleGroups,
        restDays,
        notes,
        exerciseType,
        trainingType
    };
}