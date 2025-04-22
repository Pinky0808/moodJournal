import { useContext } from 'react';
import { JournalContext } from '../contexts/JournalContext';

export default function Navbar({ view, setView }) {
  const { entries } = useContext(JournalContext);

  return (
    <div Style="margin: 0 auto;">
    <nav className="navbar" >
       
      <h1>Mood Journal</h1>
      <div className="nav-links">
        <button 
          className={`nav-button ${view === 'today' ? 'active' : ''}`}
          onClick={() => setView('today')}
        >
          Today
        </button>
        <button 
          className={`nav-button ${view === 'calendar' ? 'active' : ''}`}
          onClick={() => setView('calendar')}
        >
          Calendar ({entries.length})
        </button>
      </div>
      
    </nav>
    </div>
  );
}