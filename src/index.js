import React from 'react';
import {createRoot} from 'react-dom/client';
import App from './components/App.js';

// Ensure the DOM is fully loaded before rendering
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('root');
    if (container) {
        const root = createRoot(container);
        root.render(<App />);
    } else {
        console.error("Target container 'root' not found.");
    }
});