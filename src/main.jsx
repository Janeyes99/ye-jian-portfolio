import React from 'react';
import { createRoot } from 'react-dom/client';
import App from '../shared/js/App.jsx';
import { LanguageProvider } from '../shared/js/i18n';
import { Router } from '../shared/js/router';

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <LanguageProvider>
      <Router>
        <App />
      </Router>
    </LanguageProvider>
  </React.StrictMode>
);
