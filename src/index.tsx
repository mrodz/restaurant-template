import React, { Context, createContext, FC, useEffect, useState } from 'react';
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
document.title = WEBSITE_TITLE ?? 'MYD Web Design'

let metaThemeColor = document.createElement('meta');
metaThemeColor.name = 'theme-color';
metaThemeColor.content = styles.primaryColor
document.head.appendChild(metaThemeColor)

let throttlePause = false
const throttle = (callback: () => void, time: number) => {
  if (throttlePause) return

  throttlePause = true
  setTimeout(() => {
    callback()
    throttlePause = false
  }, time)
}

/**
 * Function that accepts an object containing the window's new `width` and `height`.
 */
type WindowResizeCallback = (newDim: DocumentDimensions) => void

let windowResizeFunctionCallbacks: WindowResizeCallback[] = []
window.onresize = () => {
  // throttling ensures the site is more performant
  throttle(() => {
    for (let fn of windowResizeFunctionCallbacks) {
      let dims = {
        width: document.body.clientWidth,
        height: document.body.clientHeight
      }

      fn(dims)
    }
  }, 200)
}

/**
 * If called in a Functional Component, do so in a `useEffect` hook so 
 * the listener is added only once on mount (as opposed to every frame).
 * @param fn callback function that will be called on window resize.
 * @param trace whether or not to trace this function's calls. This should be limited
 */
export function onWindowResize(fn: WindowResizeCallback, trace: boolean = false) {
  if (trace) console.trace()
  windowResizeFunctionCallbacks.push(fn) // insert `fn` into `windowResizeFunctionCallbacks`
}

export type DocumentDimensions = {
  width: number,
  height: number
}

/**
 * 
 * @returns {DocumentDimensions} 
 */
function getBodyDims(): DocumentDimensions {
  return {
    width: document.body.clientWidth,
    height: document.body.clientHeight
  }
}

export const AppDimensionContextBuilder: () => [Context<DocumentDimensions>, FC<any>] = () => {
  const Context = createContext<DocumentDimensions>(getBodyDims())

  const Provider = (props: any) => {
    const [dim, setDim] = useState(getBodyDims());

    useEffect(() => {
      onWindowResize(() => {
        setDim(getBodyDims());
      })
    }, [])

    return (
      <Context.Provider value={dim}>
        {props?.children}
      </Context.Provider>
    )
  }

  return [
    Context,
    Provider
  ]
}

export const [AppDimensionContext, AppDimensionProvider] = AppDimensionContextBuilder()

/**
 * ### Logging function
 * Examples:
 * 
 * ```js
 * lvar`a:${5}` 
 * // produces:
 * // [DEBUG] >> a = 5
 * 
 * lvar`account:${{ name: "@mrodz", pass: 1234 }},isCool:${true}`
 * // produces:
 * // [DEBUG] >> account = { name: "@mrodz", pass: 1234 }
 * // [DEBUG] >> isCool = true
 * ```
 */
export function lvar(strings: TemplateStringsArray, ...args: any[]) {
  if (args.length === 0) {
    console.log(strings[0])
    return
  }

  let result: string = ''
  const filteredStrings = strings.raw.filter(str => str !== '')
  const prefix = '[DEBUG] >> ';

  if (filteredStrings.length !== args.length) throw new Error("too many variables; not enough lables.")

  if (filteredStrings[0].charAt(filteredStrings[0].length - 1) === ':')
    result = `${prefix}${filteredStrings[0].slice(0, filteredStrings[0].length - 1)} = ${args[0]}\n`

  for (let i = 1; i < filteredStrings.length; i++) {
    const str = filteredStrings[i];
    if (str.charAt(str.length - 1) === ':' && str.charAt(0) === ',')
      result += `${prefix}${str.slice(1, str.length - 1)} = ${args[i]}\n`
  }

  console.log(result);
}

export { styles }