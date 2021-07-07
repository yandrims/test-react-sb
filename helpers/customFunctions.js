/* eslint-disable no-restricted-globals */
/** npm packages */
import { format } from 'date-fns';

/** constants */
import DATE_TIME from '../constants/dateTime';

/** check is function */
export function isFunction(name) {
	return name && typeof name === 'function';
}

/** check if item is object */
export function isObject(item) {
	return item && typeof item === 'object' && !Array.isArray(item);
}

/** check the date is valid or not */
export function isValidDate(date) {
	if (date) {
		const dt = new Date(date);
		return dt instanceof Date && !isNaN(dt);
	}
	return false;
}

/** format date */
export function formatDate(date = null, pattern = 'dd-MM-yyyy', lang = 'en') {
	if (date && isValidDate(date)) {
		const { DAYS, MONTHS } = DATE_TIME[lang];
		let newDate = format(date, pattern);

		if (pattern.includes('dddd')) {
			DATE_TIME.en.DAYS.forEach((elm, idx) => {
				newDate = newDate.replace(new RegExp(elm, 'g'), DAYS[idx]);
			});
		}

		if (pattern.includes('MMM')) {
			DATE_TIME.en.MONTHS.forEach((elm, idx) => {
				newDate = newDate.replace(
					new RegExp(elm.substring(0, 3), 'g'),
					MONTHS[idx].substring(0, 3),
				);
			});
		}

		return `${newDate}`;
	}
	return '';
}
