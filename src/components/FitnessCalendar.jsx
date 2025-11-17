import { useState } from 'react';
import classes from '../css/FitnessCalendar.module.css'

const FitnessCalendar = () => {
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
    </div>
  )
}

export default FitnessCalendar