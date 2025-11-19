import { useState } from 'react';
import classes from '../css/FitnessCalendar.module.css'
import { LineChart } from '@mui/x-charts';

const FitnessCalendar = () => {
    const [workoutCompleted, setWorkoutCompleted] = useState(false);
    const [workoutType, setWorkoutType] = useState('weight lifting');

    const [currentWeekStart, setCurrentWeekStart] = useState(() => {
        const today = new Date();
        const dayOfWeek = today.getDay(); //0 = sunday
        const weekStart = new Date(today); //creates copy of today
        weekStart.setDate(today.getDate() - dayOfWeek); //go back to sunday
        return weekStart;
    });

    const [selectedDate, setSelectedDate] = useState(new Date()); //defaults as today

    const handleDateClick = (day) => {
        setSelectedDate(day.fullDate);
    }

    const getWeekDays = (weekStart) => {
        const week = [];

        for(let i = 0; i < 7; i++) {
            const day = new Date(weekStart);
            day.setDate(weekStart.getDate() + i);
            week.push({
                date:day.getDate(),
                dayName: day.toLocaleDateString('en-US', { weekday: 'short' }),
                fullDate: new Date(day),
                isToday: day.toDateString() === new Date().toDateString(),
                isSelected: selectedDate && day.toDateString() === selectedDate.toDateString()
            });
        }
        return week;
    }

    const weekDays = getWeekDays(currentWeekStart);

  return (
    <div className={classes.fitnessCalendarContainer}>
        <div className={classes.selectDateContainer}>
            <ul>
                {weekDays.map((day, index) => (
                    <li
                        className={`${classes.weekday} ${day.isSelected ? classes.daySelected : '' }`} 
                        key={index}
                        onClick={() => handleDateClick(day)}
                        >
                        <div className={classes.dateName} >{day.dayName.toUpperCase()}</div>
                        {day.isToday && <span className={classes.todayDot}></span>}
                        <div className={classes.dateDay} >{day.date}</div>
                    </li>
                ))}
            </ul>
        </div>
        <div className={classes.mainContent}>
                <div className={classes.workoutMilestones}>

                </div>
                <div className={classes.workoutCompletedContainer}>
                    {workoutCompleted && (<svg xmlns="http://www.w3.org/2000/svg" width='25px' fill='var(--accent-color)' viewBox="0 0 448 512"><path d="M434.8 70.1c14.3 10.4 17.5 30.4 7.1 44.7l-256 352c-5.5 7.6-14 12.3-23.4 13.1s-18.5-2.7-25.1-9.3l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l101.5 101.5 234-321.7c10.4-14.3 30.4-17.5 44.7-7.1z"/></svg>)}
                    {!workoutCompleted && workoutType === 'cardio' && (<svg xmlns="http://www.w3.org/2000/svg" height='40px' width='40px' fill='var(--accent-color)' viewBox="-100 -30 548 612"><path d="M256.5-32a56 56 0 1 1 0 112 56 56 0 1 1 0-112zM123.6 176c-3.3 0-6.2 2-7.4 5L94.2 235.9c-6.6 16.4-25.2 24.4-41.6 17.8s-24.4-25.2-17.8-41.6l21.9-54.9C67.7 129.9 94.1 112 123.6 112l97.3 0c28.5 0 54.8 15.1 69.1 39.7l32.8 56.3 61.6 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-61.6 0c-22.8 0-43.8-12.1-55.3-31.8l-10-17.1-20.7 70.4 75.4 22.6c27.7 8.3 41.8 39 30.1 65.5L285.7 509c-7.2 16.2-26.1 23.4-42.2 16.2s-23.4-26.1-16.2-42.2l49.2-110.8-95.9-28.8c-32.7-9.8-52-43.7-43.7-76.8l22.7-90.6-35.9 0zm-8 181c13.3 14.9 30.7 26.3 51.2 32.4l4.7 1.4-6.9 19.3c-5.8 16.3-16 30.8-29.3 41.8L52.9 519.8c-13.6 11.2-33.8 9.3-45-4.3s-9.3-33.8 4.3-45l82.4-67.9c4.5-3.7 7.8-8.5 9.8-13.9L115.6 357z"/></svg>)}
                    {!workoutCompleted && workoutType === 'weight lifting' && (<svg xmlns="http://www.w3.org/2000/svg" height='35px' width='35px' fill='var(--accent-color)' viewBox="0 0 640 512"><path d="M96 112c0-26.5 21.5-48 48-48s48 21.5 48 48l0 112 256 0 0-112c0-26.5 21.5-48 48-48s48 21.5 48 48l0 16 16 0c26.5 0 48 21.5 48 48l0 48c17.7 0 32 14.3 32 32s-14.3 32-32 32l0 48c0 26.5-21.5 48-48 48l-16 0 0 16c0 26.5-21.5 48-48 48s-48-21.5-48-48l0-112-256 0 0 112c0 26.5-21.5 48-48 48s-48-21.5-48-48l0-16-16 0c-26.5 0-48-21.5-48-48l0-48c-17.7 0-32-14.3-32-32s14.3-32 32-32l0-48c0-26.5 21.5-48 48-48l16 0 0-16z"/></svg>)}
                    <span className={classes.workoutCompletedText}>{workoutCompleted ? 'Workout completed' : 'Workout Scheduled for Today'}</span>
                </div>
                <div className={classes.workoutDurationContainer}>
                    <svg xmlns="http://www.w3.org/2000/svg" height='20px' width='20px' fill='var(--accent-color)' viewBox="0 0 512 512"><path d="M464 256a208 208 0 1 1 -416 0 208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0 256 256 0 1 0 -512 0zM232 120l0 136c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2 280 120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"/></svg>
                    <div className={classes.workoutDuration}>11:30</div>
                    <label htmlFor="">Duration</label>
                </div>
        </div>
        
    </div>
  )
}

export default FitnessCalendar