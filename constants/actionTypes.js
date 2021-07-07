/** Redux and saga action type */

// G
const GENERAL = {
	DEVICE_GET: 'device_get_general',
	DEVICE_GET_RES: 'device_get_result_general',

	TOAST_SET: 'toast_set_general',
	TOAST_SET_RES: 'toast_set_result_general',
};

// M
const MOVIES = {
	MOVIE_DETAIL: {
		GET: 'get_movie_detail',
		GET_LOAD: 'get_load_movie_detail',
		GET_RES: 'get_result_movie_detail',
		GET_ERR: 'get_error_movie_detail',
	},
	MOVIE_LIST: {
		GET: 'get_movie_list',
		GET_LOAD: 'get_load_movie_list',
		GET_RES: 'get_result_movie_list',
		GET_ERR: 'get_error_movie_list',
		GET_MORE: 'get_movie_list_more',
		GET_LOAD_MORE: 'get_load_movie_list_more',
		GET_RES_MORE: 'get_result_movie_list_more',
		GET_ERR_MORE: 'get_error_movie_list_more',
	},
};

export default {
	// A
	// ...
	// G
	GENERAL,
	// M
	...MOVIES,
};
