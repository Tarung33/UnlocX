import React from 'react';
import ReactDOM from 'react-dom/client';

// ✅ Replace index.css with this:
import 'C:/Users/tarun/OneDrive/Desktop/UnlocX/client/src/index.css';
import './styles/base.css';

import App from './App';
import { AuthProvider } from './contexts/AuthContext';
import { BrowserRouter as Router } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Router>
  </React.StrictMode>
);
