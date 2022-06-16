import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App/App';
import { BrowserRouter } from 'react-router-dom';
import styles from './designs.scss';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// set the browser theme to the color of the banner + footer.
// NATIVE DOM MANIPULATION: maybe find a better way to do this ( works for now :D )
let head = document.querySelector('head');
if (head !== undefined && head !== null && 'innerHTML' in head) {
  head.innerHTML += `<meta name="theme-color" content="${styles.primaryColor}" />`;
}