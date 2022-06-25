import React, { CSSProperties, FC } from 'react';

import {
	LOCATIONS,
	Location as L,
} from '../../RESTAURANT_CONFIG';

import './BottomBanner.scss';

import Important from "../Important/Important";

export const AT = <span data-mobile-label-hidden>@</span>;

interface LocationProps {
	location: L,
}

/**
 * @param a array1
 * @param b array2
 * @returns whether the arrays are equal to eachother (by length and elements)
 */
export function arrayEquals(a: any[], b: any[]): boolean {
	return Array.isArray(a) && Array.isArray(b) && a.length === b.length
		&& a.every((val, index) => val === b[index]);
}

interface PhoneCallableProps {
	styled?: boolean,
	children: React.ReactNode
	number: string
}

/**
 * Anchor element that uses the "tel:" protocol to call a number.
 * @param props element properties.
 * @returns JSX
 */
export const PhoneCallable = (props: PhoneCallableProps): JSX.Element => {
	const styles = {
		// Hard-coded style.
		custom: {
			color: 'unset',
			fontSize: '120%'
		},
		// get rid of basic <a> stylings.
		none: {
			color: 'unset',
			textDecoration: 'none'
		}
	}

	const appliedStyles: CSSProperties = (!!props.styled) ? styles.custom : styles.none;

	return (
		<a href={`tel:${props.number}`} style={appliedStyles}>
			{props?.children}
		</a>
	);
}

const Location: FC<LocationProps> = React.memo((props) => {
	const opens = props.location.hours.map(a => a.opens);
	const closes = props.location.hours.map(a => a.closes);

	const areHoursConsistent = arrayEquals(opens, closes);

	let hours: React.ReactElement;

	if (props.location.specialHoursJSX) {
		hours = (props.location?.hoursJSX ?? <div></div> as React.ReactElement);
	} if (areHoursConsistent) {
		hours = (
			<>
				<ul className='schedule-ul'>
					<li data-mobile-label-hidden>Opens</li>
					<li>{AT} {opens[0]}</li>
				</ul>
				<ul className='schedule-ul'>
					<li data-mobile-label-hidden>Closes</li>
					<li>{AT} {closes[0]}</li>
				</ul>
			</>
		);
	} else {
		hours = (
			<>
				<ul className='schedule-ul'>
					<li data-mobile-label-hidden>Opens</li>
					<li>{AT} {opens[0]} (Mon-Fri), {opens[5]} (Sat-Sun)</li>
				</ul>
				<ul className='schedule-ul'>
					<li data-mobile-label-hidden>Closes</li>
					<li>{AT} {closes[0]} (Mon-Fri), {closes[5]} (Sat-Sun)</li>
				</ul>
			</>
		);
	}

	return (
		<div className='location-wrapper'>
			<div className='bottom-banner-location'>
				<div className='bottom-banner-name'>
					<Important weight={2}>
						<span className='location-li'>
							<i className="fa-solid fa-location-dot"></i>
							{props.location.city}
						</span>
					</Important>
				</div>
				<ul>
					<li>
						<span data-mobile-label-hidden>
							Call Us:&nbsp;
						</span>
						<PhoneCallable number={props.location.phone.replaceAll(/[-()]/g, '')} styled={true}>
							{props.location.phone}
						</PhoneCallable>
					</li>
					<li>
						<span data-mobile-label-hidden>
							Visit Us:&nbsp;
						</span>
						{props.location.address}
					</li>
				</ul>
			</div>
			<div className='bottom-banner-hours'>
				<div data-mobile-label-hidden>
					<Important>Hours:</Important>
				</div>
				<div>
					{hours}
				</div>
			</div>
		</div>
	);
});

const BottomBanner: FC<{}> = React.memo(() => {
	const locations = LOCATIONS.map((l, i) => <Location location={l} key={i}></Location>)

	return (
		<footer className='bottom-banner-wrapper-2'>
			<div className='bottom-banner-wrapper' data-length={LOCATIONS.length}>
				<div className='bottom-banner'>
					{locations}
				</div>
				<div className={`${LOCATIONS.length > 1 ? 'tilted-location-label' : 'location-label'}`}>
					<Important weight={LOCATIONS.length > 3 ? 6 : LOCATIONS.length > 2 ? 5 : 4}>
						{LOCATIONS.length === 1 ? <>
							Find Us In
							<span data-mobile-label-hidden>&hellip;</span>
						</> : <>
							Locations
						</>}
					</Important>
				</div>
			</div>
		</footer>
	);
});

export default BottomBanner;