import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './components/App/App';
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

export function setHead(content: string = WEBSITE_TITLE): void {
  if (!!head && 'querySelector' in head) {
    let title = head.querySelector('title');
    if (!!title) {
      title.innerHTML = content;
    }
  }
}

if (head !== undefined && head !== null) {
  if ('innerHTML' in head) head.innerHTML += `<meta name="theme-color" content="${styles.primaryColor}" />`;
  setHead()
}

type WindowResizeCallback = ((newDim: { width: number, height: number }) => void);
let windowResizeFunctionCallbacks: WindowResizeCallback[] = [];

window.onresize = (e) => {
  for (let fn of windowResizeFunctionCallbacks) {
    let dims = {
      width: document.body.clientWidth,
      height: document.body.clientHeight
    }

    fn(dims)
  }
}

// Object.freeze(window.onresize)

export function onWindowResize(fn: WindowResizeCallback) {
  windowResizeFunctionCallbacks = [...windowResizeFunctionCallbacks, fn];
}
