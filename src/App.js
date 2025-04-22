import { useState, useContext } from 'react';
import { JournalContext } from './contexts/JournalContext';
import MoodEntryForm from './components/MoodEntryForm';
import CalendarView from './components/CalendarView';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  const [view, setView] = useState('today');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const { entries } = useContext(JournalContext);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setView('today');
  };

  return (
    <div className="app">
      <Navbar view={view} setView={setView} />
      <main className="main-content">
        {view === 'today' ? (
          <MoodEntryForm date={selectedDate} />
        ) : (
          <CalendarView 
            entries={entries} 
            onDateSelect={handleDateSelect}
          />
        )}
      </main>
    </div>
  );
}

export default App;