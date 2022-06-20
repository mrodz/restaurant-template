import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App/App';
import { BrowserRouter } from 'react-router-dom';
import styles from './designs.scss';
import { WEBSITE_TITLE } from './RESTAURANT_CONFIG';

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
if (head !== undefined && head !== null) {
  if ('innerHTML' in head) head.innerHTML += `<meta name="theme-color" content="${styles.primaryColor}" />`;
  if ('querySelector' in head) {
    let title = head.querySelector('title');
    if (!!title) {
      title.innerHTML = `${WEBSITE_TITLE}`;
    }
  }
}