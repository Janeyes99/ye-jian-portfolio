import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './app/PortfolioApp.jsx';
import { installMediaProtection } from './media-protection.js';
import './index.css';

installMediaProtection();

createRoot(document.getElementById('root')).render(React.createElement(App));
