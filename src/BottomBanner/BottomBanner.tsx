import React, { FC } from 'react';
import './BottomBanner.scss';
import { LOCATIONS, Location as L, CUSTOM_HOURS_REQUIRED } from '../RESTAURANT_CONFIG';
import { arrayEquals } from '../App/App';
import Important from '../Important/Important';

interface LocationProps {
	location: L,
}

const Location: FC<LocationProps> = (props) => {
	const opens = props.location.hours.map(a => a.opens);
	const closes = props.location.hours.map(a => a.closes);

	const areHoursConsistent = arrayEquals(opens, closes);

	let hours: React.ReactElement;
	if (areHoursConsistent) {
		hours = (
			<>
				<ul className='schedule-ul'>
					<li>Opens</li>
					<li>@ {opens[0]}</li>
				</ul>
				<ul className='schedule-ul'>
					<li>Closes</li>
					<li>@ {closes[0]}</li>
				</ul>
			</>
		);
	} else if (!CUSTOM_HOURS_REQUIRED[0]) {
		hours = (
			<>
				<ul className='schedule-ul'>
					<li>Opens</li>
					<li>@ {opens[0]} (Mon-Fri), {opens[5]} (Sat-Sun)</li>
				</ul>
				<ul className='schedule-ul'>
					<li>Closes</li>
					<li>@ {closes[0]} (Mon-Fri), {closes[5]} (Sat-Sun)</li>
				</ul>
			</>
		)
	} else {
		hours = CUSTOM_HOURS_REQUIRED[1];
	}

	return (
		<div className='location-wrapper'>
			<div className='bottom-banner-location'>
				<div className='bottom-banner-name'>
					<Important weight={2}>
						<span className='location-li'>
							{props.location.city}
						</span>
					</Important>
				</div>
				<ul>
					<li>
						Call Us: {props.location.phone}
					</li>
					<li>
						Visit Us: {props.location.address}
					</li>
				</ul>
			</div>
			<div className='bottom-banner-hours'>
				<div>
					<Important>Hours:</Important>
				</div>
				<div>
					{hours}
				</div>
			</div>
		</div>
	);
}

export default function BottomBanner(): React.ReactElement {
	const locations = LOCATIONS.map((l, i) => <Location location={l} key={i}></Location>)

	return (
		<div className='bottom-banner-wrapper' data-length={LOCATIONS.length}>
			
			<div className='bottom-banner'>
				{locations}
			</div>
			<div className={`${LOCATIONS.length > 1 ? 'tilted-location-label' : 'location-label'}`} style={{display: 'flex' }}>
				<Important weight={LOCATIONS.length > 3 ? 6 : LOCATIONS.length > 2 ? 5 : 4}>{LOCATIONS.length === 1 ? <>Find Us&hellip;</> : <>Locations</>}</Important>
			</div>
			
		</div>
	);
}