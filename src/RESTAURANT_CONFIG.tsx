import React from "react";
// export { ROUTE_MAPPINGS } from './App/App';

export const RESTAURANT_NAME: string = 'Compari\'s'
export const PREFER_SHORTENED_DAYS_OF_WEEK: boolean = true;
export const HAS_MAIN_PHONE: [boolean, string] = [false, '']

const _assert: (arg0: boolean) => void = (bool: boolean) => {
	if (!bool) throw new Error("AssertionError");
}
export function buildPhoneNumber(countryCode: number = 1, areaCode: number, number: number) {
	_assert(number > 0);
	_assert(areaCode.toString().length === 3);
	_assert(number.toString().length === 7);

	let str: string = number.toString();
	return `+${countryCode} (${areaCode}) ${str.substring(0, 3)}-${str.substring(3, 7)}`;
}

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

export type day = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

export const weekdays: day[]   = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
export const weekdaysShortened = weekdays.map(day => day.substring(0, 2));

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

export const weekends: day[]   = ['Saturday', 'Sunday'];
export const weekendsShortened = weekends.map(day => day.substring(0, 2));

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
		phone: buildPhoneNumber(1, 123, 4567890)
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
