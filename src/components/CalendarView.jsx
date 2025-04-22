import { useState } from 'react';
import '../styles/CalendarView.css';

export default function CalendarView({ entries, onDateSelect }) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [filter, setFilter] = useState('all');

  // ... (keep existing helper functions: daysInMonth, firstDayOfMonth, generateCalendarDays)

  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const moodEmojis = {
    happy: '😊',
    neutral: '😐',
    sad: '😔',
    angry: '😠',
    excited: '🤩'
  };

  const changeMonth = (increment) => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + increment, 1));
  };

  const handleDayClick = (date) => {
    onDateSelect(date);
  };

  const daysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const firstDayOfMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month, 1).getDay();
  };
  
  const generateCalendarDays = () => {
    const totalDays = daysInMonth(currentMonth);
    const firstDay = firstDayOfMonth(currentMonth);
    const days = [];
    
    // Add empty slots for days before the first day of month
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    // Add actual days of month
    for (let i = 1; i <= totalDays; i++) {
      const dateStr = `${currentMonth.getFullYear()}-${(currentMonth.getMonth() + 1).toString().padStart(2, '0')}-${i.toString().padStart(2, '0')}`;
      const entry = entries.find(e => e.date === dateStr);
      days.push({
        date: dateStr,
        day: i,
        entry
      });
    }

    return days;
  };

  const calendarDays = generateCalendarDays();

  return (
    <div className="calendar-view">
      <div className="calendar-header">
        <button onClick={() => changeMonth(-1)}>← Previous</button>
        <h2>{monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}</h2>
        <button onClick={() => changeMonth(1)}>Next →</button>
      </div>

      <div className="filters">
        <label>Filter by mood:</label>
        <select 
          value={filter} 
          onChange={(e) => setFilter(e.target.value)}
          className="filter-select"
        >
          <option value="all">All Moods</option>
          <option value="happy">Happy</option>
          <option value="neutral">Neutral</option>
          <option value="sad">Sad</option>
          <option value="angry">Angry</option>
          <option value="excited">Excited</option>
        </select>
      </div>

      <div className="calendar-grid">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="calendar-day-header">{day}</div>
        ))}

        {calendarDays.map((day, index) => {
          if (!day) return <div key={`empty-${index}`} className="calendar-day empty"></div>;
          
          const hasEntry = day.entry && (filter === 'all' || day.entry.mood === filter);
          
          return (
            <div 
              key={day.date} 
              className={`calendar-day ${hasEntry ? 'has-entry' : ''}`}
              onClick={() => handleDayClick(day.date)}
            >
              <div className="day-number">{day.day}</div>
              {hasEntry && (
                <div className="day-entry">
                  <div className="day-mood">{moodEmojis[day.entry.mood]}</div>
                  {day.entry.weather && (
                    <div className="day-weather">
                      {Math.round(day.entry.weather.temp)}°C
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}