import { useState } from 'react';
import '../styles/MoodSelector.css';

const moodOptions = [
  { id: 'happy', emoji: '😊', label: 'Happy', color: '#FFD700' },
  { id: 'neutral', emoji: '😐', label: 'Neutral', color: '#A9A9A9' },
  { id: 'sad', emoji: '😔', label: 'Sad', color: '#6495ED' },
  { id: 'angry', emoji: '😠', label: 'Angry', color: '#FF6347' },
  { id: 'excited', emoji: '🤩', label: 'Excited', color: '#FF69B4' },
];

export default function MoodSelector({ selectedMood, onSelect }) {
  const [localSelected, setLocalSelected] = useState(selectedMood);

  const handleSelect = (mood) => {
    setLocalSelected(mood);
    onSelect(mood);
  };

  return (
    <div className="mood-selector">
      <h3>How are you feeling today?</h3>
      <div className="mood-options">
        {moodOptions.map((mood) => (
          <button
            key={mood.id}
            className={`mood-option ${localSelected === mood.id ? 'selected' : ''}`}
            onClick={() => handleSelect(mood.id)}
            style={{
              backgroundColor: localSelected === mood.id ? mood.color : '#f5f5f5',
            }}
            aria-label={mood.label}
          >
            <span className="mood-emoji">{mood.emoji}</span>
            <span className="mood-label">{mood.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}