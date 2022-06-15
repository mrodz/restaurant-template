import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import AnimatedUnderline from '../AnimatedUnderline/AnimatedUnderline';
import { Twirl as Hamburger } from 'hamburger-react'
import './TopBanner.scss';
import map from './map.png';
import { ROUTE_MAPPINGS } from '../App/App';

const TopBanner: FC<any> = () => {
	const [isHamburgerOpen, setHamburgerOpen] = useState(false);

	const burgerRoutes = ROUTE_MAPPINGS.filter(m => m.name !== undefined) .map((mapping, i) =>
		<Link to={mapping.url} key={i} onClick={() => { setHamburgerOpen(false) }}>{mapping?.name}</Link>);
	
	// FIXME - Overlaps main content - 6/15/2022
	return (
		<>
			<div className='top-banner'>
				<div className='top-banner-elements'>
					<AnimatedUnderline colors={{ from: '#e32626', to: '#e32626' }}>
						<Link to='/' style={{ textDecoration: 'none', color: 'unset' }}>
							<div className='logo-text'>Compari's</div>
						</Link>
					</AnimatedUnderline>

					<div className='mobile-view'>
						<Hamburger toggled={isHamburgerOpen} toggle={setHamburgerOpen} />
					</div>
				</div>
			</div>
			<div className='burger-nav-wrapper'>
				<nav className={`hamburger-nav ${isHamburgerOpen ? 'burger-nav-open' : 'burger-nav-close'}`} style={!isHamburgerOpen ? { opacity: '0', zIndex: '-100' } : {}}>
					<div className='burger-link-wrapper' style={{ textAlign: 'center' }}>
						{ burgerRoutes }
					</div>
					<div style={{ textAlign: 'center' }}>
						<img src={map} id='map-img' alt='nav' />
					</div>
				</nav>
			</div>

		</>
	);
}

export default TopBanner;