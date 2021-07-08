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

/** convert query params to string */
export function paramsToString(
	params = null,
	excludeEmptyValue = true,
	sort = true,
) {
	const paramsArray = [];

	if (params) {
		Object.entries(params).forEach((param) => {
			if (excludeEmptyValue) {
				if (param[1]) {
					paramsArray.push(`${param[0]}=${encodeURIComponent(param[1])}`);
				}
			} else {
				paramsArray.push(`${param[0]}=${encodeURIComponent(param[1])}`);
			}
		});

		if (sort) {
			paramsArray.sort();
		}
	}

	return paramsArray.length ? `?${paramsArray.join('&')}` : '';
}

/** get data custom from html tag attribute */
export function getDataCustom(target) {
	return (
		(target &&
			target.dataset &&
			target.dataset.custom &&
			JSON.parse(target.dataset.custom)) ||
		null
	);
}

/** check is bottom page */
export function isBottomPage(params = {}) {
	const { bottomOffset = 50 } = params;
	const {
		body: { scrollHeight = 0, offsetHeight = 0 },
		documentElement: html,
	} = document;

	const getHeight = (elm) =>
		Math.max(elm.clientHeight, elm.scrollHeight, elm.offsetHeight);

	const height = Math.max(scrollHeight, offsetHeight, getHeight(html));
	const vh = window.innerHeight;
	const isBottom = !!(Math.ceil(vh + window.scrollY) >= height - bottomOffset);

	return isBottom;
}
