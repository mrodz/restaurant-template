import './App.scss';
import { Route, Routes } from 'react-router-dom';
import TopBanner from '../TopBanner/TopBanner';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import About from '../About/About';
import Landing from '../Landing/Landing';
import Menu from '../Menu/Menu';
import Delivery from '../Delivery/Delivery';
import React from 'react';
import BottomBanner from '../BottomBanner/BottomBanner';

export declare type Page = () => React.ReactNode;

export function arrayEquals(a: any[], b: any[]) {
	return Array.isArray(a) && Array.isArray(b) && a.length === b.length
		&& a.every((val, index) => val === b[index]);
}

export const ROUTE_MAPPINGS: { url: string, page: Page, name?: string }[] = [
	{
		url: '*',
		page: NotFoundPage // << REQUIRED!!!!!
	},
	{
		url: '/',
		page: Landing,     // << REQUIRED!!!!!
		name: 'Home'
	},
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
	}

	// POSIBLE IDEAS:
	/*
	{
		url: '/kitchen',
		page: Kitchen
	},
	
	*/
];


function getRoutes(): React.ReactElement[] {
	let result: React.ReactElement[] = [];
	for (let i = 0; i < ROUTE_MAPPINGS.length; i++) {
		const routeMapping = ROUTE_MAPPINGS[i];
		const element = <Route path={routeMapping.url} element={routeMapping.page()} key={i} />
		result.push(element);
	}
	return result;
}

function App() {
	return (
		<div className='all-encapsulating-element'>
			<TopBanner />
			<div className='routes-wrapper'>
				<Routes>
					{getRoutes()}
				</Routes>
			</div>
			<BottomBanner />
		</div>
	);
}

export default App;
