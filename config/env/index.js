/* eslint-disable import/no-dynamic-require */
/** config */
import getConfig from 'next/config';

/** constants */
import ROUTES from '../../constants/routes';

const { publicRuntimeConfig } = getConfig();

/** current environment */
const CURRENT_ENV = publicRuntimeConfig.ENV || 'production';
const CURRENT_API = publicRuntimeConfig.API || 'production';

/** environments */
const ENV = require(`./${CURRENT_ENV}`);
const API_ENV = require(`./${CURRENT_API}`);

const { BASE_URL, API_KEY } = ENV;

const { API_URL } = API_ENV;

const API = {
	LOCAL: ROUTES.API.url,
	SERVER: API_URL,
};

const TIMEOUT = {
	REQUEST: 30000,
};

export default {
	API,
	CURRENT_ENV,
	TIMEOUT,
	BASE_URL,
	API_KEY,
};
