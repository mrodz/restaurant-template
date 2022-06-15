import './App.css';
import { Route, Routes } from 'react-router-dom';
import TopBanner from '../TopBanner/TopBanner';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import About from '../About/About';
import Landing from '../Landing/Landing';
import React from 'react';
import BottomBanner from '../BottomBanner/BottomBanner';

export declare type Page = () => React.ReactNode;

export function arrayEquals(a: any[], b: any[]) {
	return Array.isArray(a) && Array.isArray(b) && a.length === b.length
		&& a.every((val, index) => val === b[index]);
}

const ROUTE_MAPPINGS: { url: string, page: Page }[] = [
	{
		url: '*',
		page: NotFoundPage // << REQUIRED!!!!!
	},
	{
		url: '/',
		page: Landing      // << REQUIRED!!!!!
	},
	{
		url: '/about',
		page: About
	},
	// POSIBLE IDEAS:
	/*
	{
		url: '/menu',
		page: Menu
	},
	{
		url: '/kitchen',
		page: Kitchen
	},
	{
		url: '/delivery',
		page: Delivery
	}
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
