/* eslint-disable no-lonely-if */
/** npm packages */
import MobileDetect from 'mobile-detect';

/** constants */
import ACTION_TYPES from '../constants/actionTypes';
import ERROR_TYPES from '../constants/errorTypes';

/** initiate app */
export function initApp({ userAgent, dispatch }) {
	initMobileDevice({ userAgent, dispatch });
}

/** check if device type is mobile */
export function initMobileDevice({ userAgent, dispatch }) {
	const mobileDetect = checkIsMobileDevice(userAgent);
	dispatch({
		type: ACTION_TYPES.GENERAL.DEVICE_GET,
		payload: !!mobileDetect,
	});
}

/** check is mobile device */
export function checkIsMobileDevice(userAgent = '') {
	return (userAgent && !!new MobileDetect(userAgent).mobile()) || false;
}

/** mobile detect from initial props */
export function mobileDetectFromInitialProps(isServer, req) {
	const userAgent = isServer
		? (req && req.headers && req.headers['user-agent']) || ''
		: (navigator && navigator.userAgent) || '';

	return checkIsMobileDevice(userAgent);
}

/** set toast notification */
export function setToastNotification({ content, type, dispatch }) {
	dispatch({
		type: ACTION_TYPES.GENERAL.TOAST_SET,
		payload: { content, type },
	});
}

/** set header for api fetch */
export function setHeaderAPI(payload = null, uri = '') {
	const { isServer = false, authorization = '' } = payload;

	const endpoint = !isServer ? uri : null;

	const header =
		(payload &&
			endpoint && {
				endpoint,
				...((endpoint && { contenttype: 'application/json' }) || {
					'Content-Type': 'application/json',
				}),
				...((endpoint && { accept: '*/*' }) || { Accept: '*/*' }),
				...(authorization && { Authorization: authorization }),
			}) ||
		{};

	return header;
}

/** get error message */
export function getErrorMessage(err) {
	let errorMessage = 'Error';
	if (err.response) {
		const {
			statusText = '',
			data: { message = '', customResponse = {} },
		} = err.response;
		if (customResponse && customResponse.message) {
			errorMessage = customResponse.message;
		} else if (message) {
			errorMessage = message;
		} else if (statusText) {
			errorMessage = statusText;
		}
	} else {
		const error = JSON.parse(JSON.stringify(err));
		if (error) {
			const { message, code } = error;
			if (message) {
				errorMessage = message;
			}
			if (code) {
				switch (code) {
					case 'ECONNABORTED':
						errorMessage = ERROR_TYPES.TIMEOUT;
						break;
					case 'ENOTFOUND':
						errorMessage = ERROR_TYPES.NOT_FOUND;
						break;
					default:
						break;
				}
			}
		}
	}

	return errorMessage;
}
