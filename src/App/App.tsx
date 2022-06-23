import { Route, Routes } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

import TopBanner from '../TopBanner/TopBanner';
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import About from "../About/About";
import Landing from "../Landing/Landing";
import Menu from "../Menu/Menu";
import Delivery from "../Delivery/Delivery";
import BottomBanner from "../BottomBanner/BottomBanner";

import './App.scss';
import ProductPicker from '../ProductPicker/ProductPicker';

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
	name?: string
}

/**
 * How URLs are mapped to Pages for this site.
 */
const ROUTE_MAPPINGS: RouteMapping[] = [
	{
		url: '*',
		page: NotFoundPage
	},
	{
		url: '/',
		page: Landing,
		name: 'Home'
	},
	/* 
	The components above are MANDATORY; sites will break without them.
	The components below are up for you to implement.
	*/
	{
		url: '/about',
		page: About,
		name: 'About'
	},
	{
		url: '/menu',
		page: Menu,
		name: 'Menu'
	},
	{
		url: '/delivery',
		page: Delivery,
		name: 'Delivery'
	},
	{
		url: '/picker',
		page: ProductPicker,
		name: 'Product Picker'
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
		</div>
	);
}

export { ROUTE_MAPPINGS };
export default App;
