import { Route, Routes } from 'react-router-dom';
import React, { createContext, useEffect, useState } from 'react';

import {
	About,
	Delivery,
	Landing,
	Menu,
	NotFoundPage,
	ProductPicker
} from "../../pages"

import TopBanner from '../TopBanner/TopBanner';
import BottomBanner from '../BottomBanner/BottomBanner';
// import TopBanner from '../TopBanner/TopBanner';
// import TopBanner from '../TopBanner/TopBanner';
// import BottomBanner from "../BottomBanner/BottomBanner";

import './App.scss';
import { onWindowResize } from '../..';

// quick shorthand
export type Page = () => React.ReactNode;

/**
 * Defines what a route mapping should look like.
 */
interface RouteMapping {
	/**
	 * Public URL, relative to %PUBLIC_URL%, that will be mapped to a page.
	 */
	url: string,
	/**
	 * {@link Page} of content.
	 */
	page: Page,
	/**
	 * If a mapping does not have this property, it WILL NOT show up in menus and nav sections.
	 */
	name?: string,
	title: string
}

/**
 * How URLs are mapped to Pages for this site.
 */
const ROUTE_MAPPINGS: RouteMapping[] = [
	{
		url: '*',
		page: NotFoundPage,
		title: '404'
	},
	{
		url: '/',
		page: Landing,
		name: 'Home',
		title: 'Home'
	},
	/* 
	The components above are MANDATORY; sites will break without them.
	The components below are up for you to implement.
	*/
	{
		url: '/about',
		page: About,
		name: 'About',
		title: 'About Us'
	},
	{
		url: '/menu',
		page: Menu,
		name: 'Menu',
		title: 'Menu'
	},
	{
		url: '/delivery',
		page: Delivery,
		name: 'Delivery',
		title: 'Delivery Info'
	},
	{
		url: '/picker',
		page: ProductPicker,
		name: 'Product Picker',
		title: 'Product Picker'
	}
];

/**
 * Turn {@link ROUTE_MAPPINGS} to a list of {@link Route Routes}
 * @returns a list of routes ({@link Route Route[]})
 */
function getRoutes(): React.ReactElement[] {
	let result: React.ReactElement[] = [];
	for (let i = 0; i < ROUTE_MAPPINGS.length; i++) {
		const routeMapping = ROUTE_MAPPINGS[i];
		const element = <Route path={routeMapping.url} element={routeMapping.page()} key={i} />
		result.push(element);
	}
	return result;
}


export type DocumentDimensions = {
	width: number,
	height: number
}

function getBodyDims(): DocumentDimensions {
	return {
		width: document.body.clientWidth,
		height: document.body.clientHeight
	}
}

export const AppDimensionContext = createContext<DocumentDimensions>(getBodyDims())

const AppDimensionProvider = (props: any) => {
	const [dim, setDim] = useState(getBodyDims());

	useEffect(() => {
		onWindowResize(() => {
			setDim(getBodyDims());
		})
	}, [])

	return (
		<AppDimensionContext.Provider value={dim}>
			{props?.children}
		</AppDimensionContext.Provider>
	)
}

/**
 * Root component.
 * 
 * Supplies these event listeners:
 * - 'maincontent:focus'
 * - 'maincontent:loosefocus'
 * 
 * These events do as their names suggest.
 * @returns JSX that will be inserted into the HTML at div#root.
 */
function App() {
	const [inFocusMode, setInFocusMode] = useState(false);

	useEffect(() => {

		const onFocus = () => setInFocusMode(true);
		const onLeaveFocus = () => setInFocusMode(false);

		// Add an event listener for content focus
		document.addEventListener('maincontent:focus', onFocus)
		document.addEventListener('maincontent:loosefocus', onLeaveFocus)

		//Finally, remember to unbind the event listener on unmount
		return () => {
			document.removeEventListener('maincontent:focus', onFocus);
			document.removeEventListener('maincontent:loosefocus', onLeaveFocus);
		}
	}, []);

	return (
		<div className='all-encapsulating-element'>
			<AppDimensionProvider>
				<TopBanner />
				<div className={`routes-wrapper`}>
					<Routes>
						{getRoutes()}
					</Routes>
				</div>
				<div className='focus-screen' data-focusing={inFocusMode} onClick={() => {
					document.dispatchEvent(new Event('maincontent:loosefocus'));
					document.dispatchEvent(new Event('burgernav:forceclose'));
				}}>

				</div>
				<BottomBanner />
			</AppDimensionProvider>
		</div >
	);
}

export { ROUTE_MAPPINGS };
export default App;
