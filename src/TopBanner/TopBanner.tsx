import { FC, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Twirl as Hamburger } from 'hamburger-react'

import AnimatedUnderline from "../AnimatedUnderline/AnimatedUnderline";
import Important from "../Important/Important";

import {
	RESTAURANT_NAME,
} from '../RESTAURANT_CONFIG';

import { ROUTE_MAPPINGS } from '../App/App';

import homepage from './homepage.png';
import './TopBanner.scss';

/**
 * The topmost banner. It is static and sticks to the top of the page.
 * Contains a navigation menu.
 * 
 * Supplies these event listeners:
 * - 'burgernav:forceopen'
 * - 'burgernav:forceclose'
 * 
 * These events do as their names suggest.
 * 
 * @returns JSX
 */
const TopBanner: FC<{}> = () => {
	const [isHamburgerOpen, setHamburgerOpen] = useState(false);

	useEffect(() => {
		const forceOpen = () => setHamburgerOpen(true);
		const foreClose = () => setHamburgerOpen(false);

		// Add an event listener
		document.addEventListener('burgernav:forceopen', forceOpen)
		document.addEventListener('burgernav:forceclose', foreClose)

		//Finally, remember to unbind the event listener on unmount
		return () => {
			document.removeEventListener('burgernav:forceopen', forceOpen);
			document.removeEventListener('burgernav:forceopen', forceOpen);
		}
	}, [/* run ONLY on component mount/unmount */]);

	const closeBurger = () => { setHamburgerOpen(false); document.dispatchEvent(new Event('maincontent:loosefocus')) };

	const burgerRoutes = ROUTE_MAPPINGS
		.filter(m => m?.name !== undefined && m.url !== '/') // get rid of hidden routes (no name) and the home route
		.map((mapping, i) => <Link to={mapping.url} key={i} onClick={closeBurger} className='burger-link'>{mapping?.name}</Link>);

	return (
		<>
			<div className='top-banner'>
				<div className='top-banner-elements'>
					<AnimatedUnderline colors={{ from: '#e32626', to: '#e32626' }} className="logo-underliner">
						<Link to='/' style={{ textDecoration: 'none', color: 'unset' }}>
							<div className='logo-text'>{RESTAURANT_NAME}</div>
						</Link>
					</AnimatedUnderline>
					<div className='other-info'>
						<i className="fa-solid fa-angles-right"></i>
					</div>
					<div className='mobile-view'>
						<div className='burger-wrapper'>
							<Important className='burger-label'>
								EXPLORE
							</Important>
							<Hamburger toggled={isHamburgerOpen} toggle={setHamburgerOpen} onToggle={() => {
								if (!isHamburgerOpen) {
									document.dispatchEvent(new Event('maincontent:focus'));
								} else {
									document.dispatchEvent(new Event('maincontent:loosefocus'));
								}
							}} />
						</div>
					</div>

				</div>
			</div>
			<div className='burger-nav-wrapper'>
				<nav className={`hamburger-nav ${isHamburgerOpen ? 'burger-nav-open' : 'burger-nav-close'}`} style={!isHamburgerOpen ? { opacity: '0', zIndex: '-100' } : {}}>
					<div className='burger-link-wrapper' style={{ textAlign: 'center' }}>
						{burgerRoutes}
					</div>
					<div className='nav-home-link'>
						<Link to="/" onClick={closeBurger}>
							<img src={homepage} id='map-img' alt='nav' />
						</Link>
					</div>
				</nav>
			</div>
		</>
	);
}

export default TopBanner;