import React from "react";

export const PREFER_SHORTENED_DAYS_OF_WEEK = true;

export interface Location {
	city: string,
	hours: Hours[],
	address: string,
	phone: string,
}

export interface Hours {
	day?: string,
	opens: string,
	closes: string
}

export declare type day = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

const weekdays: day[]   = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const weekdaysShortened = weekdays.map(day => day.substring(0, 2));

function mondayThroughFriday(open: string, close: string): Hours[] {
	let result: Hours[] = [];
	for (let day of PREFER_SHORTENED_DAYS_OF_WEEK ? weekdaysShortened : weekdays) {
		result.push({
			day: day,
			opens: open,
			closes: close
		});
	}
	return result;
}

const weekends: day[]   = ['Saturday', 'Sunday'];
const weekendsShortened = weekends.map(day => day.substring(0, 2));

/**
 * Set the start time and closing time for the weekend.
 * @param open 
 * @param close 
 * @returns 
 */
function saturdayAndSunday(open: string, close: string): Hours[] {
	let result: Hours[] = [];
	for (let day of PREFER_SHORTENED_DAYS_OF_WEEK ? weekendsShortened : weekends) {
		result.push({
			day: day,
			opens: open,
			closes: close
		});
	}
	return result;
}

/**
 * Every day of the week has the same start and close times
 * @param open the time at which this establishment opens
 * @param close the time at which this establishment closes
 * @returns an 
 */
function constantHours(open: string, close: string): Hours[] {
	let result: Hours[] = [];
	for (let day of PREFER_SHORTENED_DAYS_OF_WEEK ? weekendsShortened.concat(weekdaysShortened) : weekends.concat(weekdays)) {
		result.push({
			day: day,
			opens: open,
			closes: close
		});
	}
	return result;
}

export const LOCATIONS: Location[] = [
	{
		city: 'Westchester',
		hours: mondayThroughFriday('8AM', '9PM').concat(saturdayAndSunday('10AM', '12PM')),
		address: '1234 W. Pico Avenue, Los Angeles, CA.',
		phone: '+1 (123) 456-7890'
	},
	{
		city: 'Marina Del Rey',
		hours: constantHours('9AM', '10PM'),
		address: '4321 E. Sepulveda Avenue, Marina Del Ray, Ca.',
		phone: '+1 (321) 654-0987'
	},
	// ADD LOCATIONS HERE AS YOU WISH
]

export const CUSTOM_HOURS_REQUIRED: [boolean, React.ReactElement] = [false, <div></div>];
