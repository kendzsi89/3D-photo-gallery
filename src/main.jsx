import React from 'react';
import ReactDOM from 'react-dom/client'; // Import from 'react-dom/client' for React 18+
import App from './App'; // Assuming your main component is called App
import './index.css'; // Your global CSS if any

// Create the root element and render the app
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

      <App />

  </React.StrictMode>
);
