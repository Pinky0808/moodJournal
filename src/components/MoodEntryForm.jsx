import { useState, useEffect, useContext } from 'react';
import { JournalContext } from '../contexts/JournalContext';
import MoodSelector from './MoodSelector';
import WeatherDisplay from './WeatherDisplay';
import '../styles/MoodEntryForm.css';

export default function MoodEntryForm({ date }) {
  const [mood, setMood] = useState('');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const { entries, addEntry } = useContext(JournalContext);

  // Load existing entry when date changes
  useEffect(() => {
    const existingEntry = entries.find(entry => entry.date === date);
    if (existingEntry) {
      setMood(existingEntry.mood);
      setNotes(existingEntry.notes || '');
    } else {
      setMood('');
      setNotes('');
    }
  }, [date, entries]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!mood) {
      alert('Please select your mood');
      return;
    }

    const newEntry = {
      date,
      mood,
      notes,
      timestamp: new Date().toISOString(),
    };

    addEntry(newEntry);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="entry-form-container">
      <h2>{new Date(date).toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })}</h2>
      
      <div className="form-and-weather">
        <form onSubmit={handleSubmit} className="mood-entry-form">
          <MoodSelector selectedMood={mood} onSelect={setMood} />
          
          <div className="notes-section">
            <label htmlFor="notes">Notes:</label>
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="How was your day? Any special moments?"
              maxLength="200"
            />
          </div>
          
          <button type="submit" className="submit-button">
            {entries.some(e => e.date === date) ? 'Update Entry' : 'Save Entry'}
          </button>
          
          {submitted && (
            <div className="success-message">
              Entry {entries.some(e => e.date === date) ? 'updated' : 'saved'} successfully!
            </div>
          )}
        </form>
        
        <WeatherDisplay />
      </div>
    </div>
  );
}