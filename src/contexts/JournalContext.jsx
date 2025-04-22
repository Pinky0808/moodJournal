import { createContext, useState, useEffect } from 'react';

export const JournalContext = createContext();

export function JournalProvider({ children }) {
  const [entries, setEntries] = useState(() => {
    const savedEntries = localStorage.getItem('moodJournalEntries');
    return savedEntries ? JSON.parse(savedEntries) : [];
  });

  useEffect(() => {
    localStorage.setItem('moodJournalEntries', JSON.stringify(entries));
  }, [entries]);

  const addEntry = (newEntry) => {
    setEntries((prevEntries) => {
      // Check if entry for today already exists
      
      const existingEntryIndex = prevEntries.findIndex(
        (entry) => entry.date === newEntry.date
      );
      
      if (existingEntryIndex >= 0) {
        // Update existing entry
        const updatedEntries = [...prevEntries];
        updatedEntries[existingEntryIndex] = newEntry;
        return updatedEntries;
      } else {
        // Add new entry
        return [...prevEntries, newEntry];
      }
    });
  };

  return (
    <JournalContext.Provider value={{ entries, addEntry }}>
      {children}
    </JournalContext.Provider>
  );
}