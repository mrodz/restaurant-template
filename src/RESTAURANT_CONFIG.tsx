import React from "react";

/**
 * Standard assertion function.
 * @param bool a condition.
 */
const _assert: (arg0: boolean) => void = (bool: boolean) => {
	if (!bool) throw new Error("AssertionError");
}

/**
 * Set the business' name here.
 */
export const RESTAURANT_NAME: string = 'The Spot';


export const BANNER_TOP_DESC: React.ReactElement[] = [
	<div data-hide-on="1000"><i className="fa-solid fa-angles-right"></i> Cafe &amp; Lounge</div>,
	<div><i className="fa-solid fa-angles-right" data-hide-on="800"></i> <span data-hide-on="1100">Culver City</span> <i className="fa-solid fa-phone" style={{ marginLeft: '.2rem' }} data-hide-on="800"></i> <span data-hide-on="800">{buildPhoneNumber(1, 310, 5598868)}</span></div>,
];

/**
 * Whether to use the shorthand version of days or not. (ie. "Monday" turns into "Mon")
 */
export const PREFER_SHORTENED_DAYS_OF_WEEK: boolean = true;

/**
 * If the business has ony main phone number they take all their calls with.
 */
export const HAS_MAIN_PHONE: [boolean, string] = [false, '']

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
	specialHoursJSX: boolean,
	hoursJSX?: React.ReactElement
}

interface OperatingHours {
	opens: string,
	closes: string
}

const DEFAULT_OPERATING_HOURS = { opens: 'Never', closes: 'Never' }

/**
 * Information about a place's operating hours.
 */
export interface Hours extends OperatingHours {
	day: day | string
}

/**
 * Days of the week.
 */
export type day = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

export const weekdays: day[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
export const weekdaysShortened = weekdays.map(day => day.substring(0, 2));

/**
 * Factory class for building a business' schedule.
 */
class DaysOfWeekBuilder {
	_hours?: Hours[];

	/**
	 * Private, shouldn't really be touched.
	 * Enter the factory via {@link startScheduling startScheduling()} 
	 * instead.
	 * @param prev an already-existing {@link DaysOfWeekBuilder}.
	 */
	constructor(prev?: DaysOfWeekBuilder) {
		this._hours = prev?._hours ?? [];
	}

	/**
	 * Supply a valid {@link day}
	 * @param day is the day of the week you'll be working with.
	 * @returns a chain to {@link OpensBuilder}. (it's expected that 
	 * you'll call {@link OpensBuilder.opens opens()} or {@link OpensBuilder.closes closes()}
	 * on this chained object).
	 */
	every(day: day) {
		return new OpensBuilder(this, day)
	}

	/**
	 * Collect all days added thus far.
	 * @returns an array of {@link Hours}
	 */
	thatsAll(): Hours[] {
		if (this?._hours === undefined) throw new Error();
		return this._hours;
	}
}

/**
 * Factory class for getting a day's opening and closing times.
 * This serves as a link in the {@link DaysOfWeekBuilder} production chain.
 * 
 * Meant to read like a sentence:
 * 
 * "every Monday opens at 10:00AM and closes at 10:00PM,
 * while every Tuesday opens at 9:15AM and closes at 12:00AM."
 * 
 * Translates to:
 * 
 * every("Monday").opens("10:00AM").and().closes("10:00PM")
 * .while().every("Tuesday").opens("9:15AM").and().closes("12:00AM")
 * .while().thatsAll();
 */
class OpensBuilder {
	_opens: string | undefined;
	_closes: string | undefined;
	_oldDaysOfWeekBuilder: DaysOfWeekBuilder;
	_day: day;

	/**
	 * PRIVATE - called EXCLUSIVELY through {@link DaysOfWeekBuilder}
	 * @param daysOfWeekBuilder origin
	 * @param day the day that was selected
	 */
	constructor(daysOfWeekBuilder: DaysOfWeekBuilder, day: day) {
		this._oldDaysOfWeekBuilder = daysOfWeekBuilder;
		this._day = day;
	}

	/**
	 * Set the time a business opens.
	 * @param at any time.
	 * @returns this object to continue the chain.
	 */
	opens(at: string) {
		this._opens = at;
		return this;
	}

	/**
	 * Set the time a business closes.
	 * @param at any time.
	 * @returns this object to continue the chain.
	 */
	closes(at: string) {
		this._closes = at;
		return this;
	}

	/**
	 * Syntactic Sugar :)
	 * 
	 * I added this just so you could do:
	 * - every("Monday").opens("10AM").and().closes("10PM");
	 * Even though the following works as well.
	 * - every("Monday").opens("10AM").closes("10PM");
	 * @returns this
	 */
	and(): OpensBuilder {
		return this;
	}

	/**
	 * Exit this branching-off of the {@link DaysOfWeekBuilder}; insert the 
	 * days back into the original chain.
	 * @returns {@link _oldDaysOfWeekBuilder}
	 */
	while(): DaysOfWeekBuilder {
		if (this._opens !== undefined && this._closes !== undefined) {
			this._oldDaysOfWeekBuilder._hours?.push({
				opens: this._opens,
				closes: this._closes,
				day: this._day
			});
			return this._oldDaysOfWeekBuilder;
		} else {
			throw Error('set both an opening and closing time first.');
		}
	}
}

/**
 * Create a schedule factory
 */
const startScheduling = () => new DaysOfWeekBuilder();

/**
 * Function to imperatively build the days of the week.
 * @param open 
 * @param close 
 * @returns 
 */
// eslint-disable-next-line
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

export const weekends: day[] = ['Saturday', 'Sunday'];
export const weekendsShortened = weekends.map(day => day.substring(0, 2));

/**
 * Set the start time and closing time for the weekend.
 * @param open opening time
 * @param close closing time
 * @returns an array of {@link Hours}
 */
// eslint-disable-next-line
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
 * @returns an array of {@link Hours} with said times.
 */
// eslint-disable-next-line
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

function findHoursFromDay(day: day, ...hours: Hours[]): OperatingHours | undefined {
	for (let hour of hours) {
		if (hour.day === day) return { opens: hour.opens, closes: hour.closes }
	}
	return undefined;
}

export const LOCATIONS: Location[] = [
	{
		city: 'Culver City',
		hours: mondayThroughFriday('7AM', '5PM').concat(startScheduling()
			.every('Saturday').opens('8AM').and().closes('3PM').while()
			.every('Sunday').opens('8AM').and().closes('2:30PM').while()
			.thatsAll()),
		specialHoursJSX: true,
		get hoursJSX() {
			const monday: OperatingHours = findHoursFromDay('Monday', ...this.hours) ?? DEFAULT_OPERATING_HOURS
			const saturday: OperatingHours = findHoursFromDay('Saturday', ...this.hours) ?? DEFAULT_OPERATING_HOURS
			const sunday: OperatingHours = findHoursFromDay('Sunday', ...this.hours) ?? DEFAULT_OPERATING_HOURS

			return (
				<>
					<ul className='schedule-ul'>
						<li>Opens</li>
						<li>@ {monday.opens} (Mon-Fri), {saturday.opens} (Sat-Sun)</li>
					</ul>
					<ul className='schedule-ul'>
						<li>Closes</li>
						<li>@ {monday.closes} (Mon-Fri), {saturday.closes} (Sat), {sunday.closes} (Sun)</li>
					</ul>
				</>
			);
		},
		address: '4455 Overland Ave, Culver City, CA',
		phone: buildPhoneNumber(1, 310, 5598868)
	}
]
