/** constants */
import STATUS_TYPES from './statusTypes';

const { INIT } = STATUS_TYPES;
const dataArray = {
	status: INIT,
	error: null,
	meta: {},
	data: [],
};
const dataObject = {
	status: INIT,
	error: null,
	meta: {},
	data: {},
};

// G
const GENERAL = {
	device: { isMobile: false },
	toast: null,
};

// M
const MOVIES = {
	MOVIE_DETAIL: { ...dataObject },
	MOVIE_LIST: { ...dataArray, statusLoadMore: INIT, errorLoadMore: null },
};

export default {
	// A
	// ...
	// G
	GENERAL,
	// M
	...MOVIES,
};
