/** constants */
import STATUS_TYPES from '../../constants/statusTypes';
import ACTION_TYPES from '../../constants/actionTypes';
import DEFAULT_STATES from '../../constants/defaultStates';

const modelName = 'MOVIE_LIST';
const defaultState = DEFAULT_STATES[modelName];
const { LOADING, SUCCESS, ERROR } = STATUS_TYPES;
const {
	GET_LOAD,
	GET_RES,
	GET_ERR,
	GET_LOAD_MORE,
	GET_RES_MORE,
	GET_ERR_MORE,
} = ACTION_TYPES[modelName];

function reducer(state = defaultState, { type, payload, error }) {
	switch (type) {
		case GET_LOAD:
			return {
				...state,
				status: LOADING,
				error: null,
			};

		case GET_RES:
			return {
				...state,
				status: SUCCESS,
				error: null,
				meta: payload.meta || defaultState.meta,
				data: payload.data || defaultState.data,
			};

		case GET_ERR:
			return {
				...state,
				status: ERROR,
				error,
			};

		/* LOAD MORE */
		case GET_LOAD_MORE:
			return {
				...state,
				statusLoadMore: LOADING,
				errorLoadMore: null,
			};

		case GET_RES_MORE:
			return {
				...state,
				statusLoadMore: SUCCESS,
				errorLoadMore: null,
				data: [...state.data, ...payload.data],
			};

		case GET_ERR_MORE:
			return {
				...state,
				statusLoadMore: ERROR,
				errorLoadMore: error,
			};

		default:
			return state;
	}
}

export default reducer;
