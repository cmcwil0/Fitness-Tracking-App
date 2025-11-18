import classes from '../css/FitnessSearch.module.css'


const exampleWorkouts = [
  {
    id: 1,
    name: "Push-ups",
    shortDescription: "Upper body strength exercise",
    longDescription: "A classic bodyweight exercise that targets the chest, shoulders, triceps, and core. Start in a plank position with hands shoulder-width apart, lower your body until your chest nearly touches the floor, then push back up to starting position. Great for building upper body strength and can be modified for different fitness levels."
  },
  {
    id: 2,
    name: "Squats",
    shortDescription: "Lower body compound movement",
    longDescription: "A fundamental lower body exercise that works the quadriceps, hamstrings, glutes, and core. Stand with feet shoulder-width apart, lower your body as if sitting in a chair, keeping your chest up and knees behind your toes, then return to standing. Essential for building leg strength and improving functional movement."
  },
  {
    id: 3,
    name: "Burpees",
    shortDescription: "Full-body cardio exercise",
    longDescription: "A high-intensity exercise that combines a squat, plank, push-up, and jump. Start standing, drop into a squat, kick back into plank, do a push-up, jump feet back to squat, then jump up with arms overhead. Excellent for cardiovascular fitness and full-body conditioning."
  },
  {
    id: 4,
    name: "Mountain Climbers",
    shortDescription: "Dynamic core and cardio",
    longDescription: "A fast-paced exercise that targets the core, shoulders, and legs while providing cardiovascular benefits. Start in a plank position and alternate bringing knees to chest in a running motion. Keep your core engaged and maintain a steady rhythm for maximum effectiveness."
  },
  {
    id: 5,
    name: "Deadlifts",
    shortDescription: "Posterior chain strength",
    longDescription: "A compound exercise that primarily targets the hamstrings, glutes, lower back, and traps. Stand with feet hip-width apart, hinge at the hips to lower the weight while keeping your back straight, then drive through your heels to return to standing. One of the best exercises for overall strength and power development."
  },
  {
    id: 6,
    name: "Plank",
    shortDescription: "Core stability exercise",
    longDescription: "An isometric exercise that strengthens the entire core, shoulders, and glutes. Hold a push-up position with forearms on the ground, maintaining a straight line from head to heels. Focus on keeping your core tight and breathing steadily. Excellent for building core stability and endurance."
  },
  {
    id: 7,
    name: "Jumping Jacks",
    shortDescription: "Cardio warm-up exercise",
    longDescription: "A simple but effective cardiovascular exercise that also works the legs and shoulders. Start with feet together and arms at sides, jump while spreading legs shoulder-width apart and raising arms overhead, then return to starting position. Perfect for warming up or adding cardio to any workout."
  },
  {
    id: 8,
    name: "Lunges",
    shortDescription: "Unilateral leg exercise",
    longDescription: "A single-leg exercise that targets the quadriceps, hamstrings, glutes, and improves balance. Step forward with one leg, lowering your hips until both knees are bent at 90 degrees, then push back to starting position. Helps correct muscle imbalances and improves functional movement patterns."
  },
  {
    id: 9,
    name: "Pull-ups",
    shortDescription: "Upper body pulling exercise",
    longDescription: "A challenging upper body exercise that targets the latissimus dorsi, rhomboids, biceps, and core. Hang from a pull-up bar with palms facing away, pull your body up until your chin clears the bar, then lower with control. Excellent for building back strength and improving grip strength."
  },
  {
    id: 10,
    name: "High Knees",
    shortDescription: "Dynamic cardio movement",
    longDescription: "A high-intensity cardio exercise that involves running in place while bringing knees up toward chest. Keep your core engaged and pump your arms as you alternate lifting each knee as high as possible. Great for improving cardiovascular fitness, leg strength, and coordination."
  }
];


const FitnessSearch = ({addMovementFunction}) => {
  return (
    <div className={classes.fitnessSearchContainer}>
      <input className={classes.searchBar} type="text" placeholder='Search Movement...' />
      <ul className={classes.searchResults}>
        {
          exampleWorkouts.map(workout => (
            <li className={classes.searchResultCard} key={workout.id}>
                <div className={classes.workoutName}>{workout.name}</div>
                <div className={classes.cardButtons}>
                    <div className={classes.infoButton}><svg xmlns="http://www.w3.org/2000/svg" width='15px' height='15px' fill='var(--accent-color)' viewBox="0 0 192 512"><path d="M48 48a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zM0 192c0-17.7 14.3-32 32-32l64 0c17.7 0 32 14.3 32 32l0 256 32 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 512c-17.7 0-32-14.3-32-32s14.3-32 32-32l32 0 0-224-32 0c-17.7 0-32-14.3-32-32z"/></svg></div>
                    <div className={classes.addWorkoutButton} onClick={() => addMovementFunction}><svg xmlns="http://www.w3.org/2000/svg" width='15px' height='15px' fill='var(--accent-color)' viewBox="0 0 448 512"><path d="M256 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 160-160 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l160 0 0 160c0 17.7 14.3 32 32 32s32-14.3 32-32l0-160 160 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-160 0 0-160z"/></svg></div>
                </div>
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default FitnessSearch
