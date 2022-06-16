import React from "react";

/**
 * Set the business' name here.
 */
export const RESTAURANT_NAME: string = 'Compari\'s'

/**
 * Whether to use the shorthand version of days or not. (ie. "Monday" turns into "Mon")
 */
export const PREFER_SHORTENED_DAYS_OF_WEEK: boolean = true;

/**
 * If the business has ony main phone number they take all their calls with.
 */
export const HAS_MAIN_PHONE: [boolean, string] = [false, '']

/**
 * Standard assertion function.
 * @param bool a condition.
 */
const _assert: (arg0: boolean) => void = (bool: boolean) => {
	if (!bool) throw new Error("AssertionError");
}

/**
 * Build a phone number to this website's standards.
 * @param countryCode this will probably always be 1
 * @param areaCode three digits (ie. 424, 310)
 * @param number the last 7 digits.
 * @returns a number with this format: +1 (310) 377-7978
 */
export function buildPhoneNumber(countryCode: number = 1, areaCode: number, number: number) {
	// Safeguards
	_assert(number > 0);
	_assert(areaCode.toString().length === 3);
	_assert(number.toString().length === 7);
	// END Safeguards

	let str: string = number.toString();
	return `+${countryCode} (${areaCode}) ${str.substring(0, 3)}-${str.substring(3, 7)}`;
}

/**
 * Information about a business' residence.
 */
export interface Location {
	city: string,
	hours: Hours[],
	address: string,
	phone: string,
}

interface OperatingHours {
	opens: string,
	closes: string
}

/**
 * Information about a place's operating hours.
 */
export interface Hours extends OperatingHours {
	day?: day | string
}

/**
 * Days of the week.
 */
export type day = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

export const weekdays: day[]   = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
export const weekdaysShortened = weekdays.map(day => day.substring(0, 2));


class DaysOfWeekBuilder {
	_hours?: Hours[];

	constructor(prev?: DaysOfWeekBuilder) {
		this._hours = prev?._hours ?? [];
	}

	every(day: day) {
		return new OpensBuilder(this, day)
	}

	thatsAll(): Hours[] {
		if (this?._hours === undefined) throw new Error(); 
		return this._hours;
	}
}

class OpensBuilder {
	_opens: string | undefined;
	_closes: string | undefined;
	_oldDaysOfWeekBuilder: DaysOfWeekBuilder;
	_day: day;

	constructor(daysOfWeekBuilder: DaysOfWeekBuilder, day: day) {
		this._oldDaysOfWeekBuilder = daysOfWeekBuilder;
		this._day = day;
	}

	opens(at: string) {
		this._opens = at;
		return this;
	}

	and(): OpensBuilder {
		return this;
	}

	while(): DaysOfWeekBuilder {
		if (this._opens !== undefined && this._closes !== undefined) {
			this._oldDaysOfWeekBuilder._hours?.push({
				opens: this._opens,
				closes: this._closes,
				day: this._day
			});
			return this._oldDaysOfWeekBuilder;
		} else {
			throw Error('set an opening and closing time first.');
		}
	}

	closes(at: string) {
		this._closes = at;
		return this;
	}
}

const startScheduling = () => new DaysOfWeekBuilder();

/**
 * Function to imperatively build the days of the week.
 * @param open 
 * @param close 
 * @returns 
 */
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
function constantWeeklyHours(open: string, close: string): Hours[] {
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
		hours: startScheduling()
				.every("Monday").opens('8AM').and().closes('9PM').while()
				.every("Tuesday").opens('8AM').and().closes('9PM').while()
				.every("Wednesday").opens('8AM').and().closes('9PM').while()
				.every("Thursday").opens('8AM').and().closes('9PM').while()
				.every("Friday").opens('10AM').and().closes('12AM').while()
				.every("Saturday").opens('10AM').and().closes('12AM').while()
				.every("Sunday").opens('9AM').and().closes('10PM').while()
				.thatsAll(),
		address: '1234 W. Pico Avenue, Los Angeles, CA.',
		phone: buildPhoneNumber(1, 123, 4567890)
	},
	{
		city: 'Marina Del Rey',
		hours: constantWeeklyHours('9AM', '10PM'),
		address: '4321 E. Sepulveda Avenue, Marina Del Ray, Ca.',
		phone: '+1 (321) 654-0987'
	},
	// ADD LOCATIONS HERE AS YOU WISH
]

/**
 * You MUST update the JSX here if either:
 * 1. the business' hours are not consistent every day of the week.
 * 2. Mon-Fri are not consistent or Sat & Sun are not consistent.
 */
export const CUSTOM_HOURS_REQUIRED: [boolean, React.ReactElement] = [false, <div></div>];
