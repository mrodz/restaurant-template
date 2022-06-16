import {
	FC,
	useState,
	useEffect
} from 'react';

import { Link } from 'react-router-dom';
import { Twirl as Hamburger } from 'hamburger-react'

import AnimatedUnderline from "../AnimatedUnderline/AnimatedUnderline";
import Important from "../Important/Important";

import {
	RESTAURANT_NAME,
	BANNER_TOP_DESC
} from '../RESTAURANT_CONFIG';

import { ROUTE_MAPPINGS } from '../App/App';

import './TopBanner.scss';
import styles from '../designs.scss';
import '../designs.scss';

const SVG_DATA: string = "M18.69,73.37,59.18,32.86c2.14-2.14,2.41-2.23,4.63,0l40.38,40.51V114h-30V86.55a3.38,3.38,0,0,0-3.37-3.37H52.08a3.38,3.38,0,0,0-3.37,3.37V114h-30V73.37ZM60.17.88,0,57.38l14.84,7.79,42.5-42.86c3.64-3.66,3.68-3.74,7.29-.16l43.41,43,14.84-7.79L62.62.79c-1.08-1-1.24-1.13-2.45.09Z";

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
	const [hamburgerCloses, setHamburgerCloses] = useState(0);

	useEffect(() => {
		const forceOpen = () => setHamburgerOpen(true);
		const foreClose = () => setHamburgerOpen(false);

		// Add an event listener
		document.addEventListener('burgernav:forceopen', forceOpen);
		document.addEventListener('burgernav:forceclose', foreClose);

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

	const getBurgerClass = () => {
		if (isHamburgerOpen) {
			return 'burger-nav-open';
		} else if (hamburgerCloses === 0) {
			return '';
		}
		return 'burger-nav-close';
	}

	/**
	 * Navigation Bar.
	 * 
	 * @fixme 6/16/22 - @mateo - this is ugly, make it prettier.
	 * @returns 
	 */
	const Nav: FC<{}> = () => {
		return (
			<div className='burger-nav-wrapper'>
				<nav className={`hamburger-nav ${getBurgerClass()}`} style={!isHamburgerOpen ? { opacity: '0', zIndex: '-100' } : {}}>
					<div className='burger-link-wrapper' style={{ textAlign: 'center' }}>
						{burgerRoutes}
					</div>
					<div className='nav-home-link'>
						<Link to="/" onClick={closeBurger}>
							<svg id="map-img" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.88 113.97">
								<path fill={styles.popColor} d={SVG_DATA} />
								Home {/* This will render if inline SVGs are not supported. */}
							</svg>
						</Link>
					</div>
				</nav>
			</div>
		);
	}

	return (
		<>
			<div className='top-banner'>
				<div className='top-banner-elements'>
					<AnimatedUnderline colors={{ from: styles.popColor, to: styles.popColor }} className="logo-underliner">
						<Link to="/" style={{ textDecoration: 'none', color: 'unset' }}>
							<div className='logo-text'>{RESTAURANT_NAME}</div>
						</Link>
					</AnimatedUnderline>
					<div className='other-info'>
						{BANNER_TOP_DESC.map((e, i) => {
							return <div key={i} className="other-info-item">{e}</div>
						})}

						{ /* TODO - Add more options here, take into account that you'll have to use @media querries to fix for mobile :D */}
					</div>
					<div className='mobile-view'>
						<div className='burger-wrapper'>
							<Important className='burger-label'>
								<span data-hide-on="500">EXPLORE</span>
							</Important>
							<Hamburger toggled={isHamburgerOpen} toggle={setHamburgerOpen} onToggle={() => {
								if (!isHamburgerOpen) {
									document.dispatchEvent(new Event('maincontent:focus'));
								} else {
									document.dispatchEvent(new Event('maincontent:loosefocus'));
									setHamburgerCloses(hamburgerCloses + 1);
								}
							}} />
						</div>
					</div>
				</div>
			</div>
			<Nav/>
		</>
	);
}

export default TopBanner;