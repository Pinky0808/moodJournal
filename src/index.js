import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App'
import { JournalProvider } from './contexts/JournalContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <JournalProvider>
      <App />
    </JournalProvider>
  </React.StrictMode>
);