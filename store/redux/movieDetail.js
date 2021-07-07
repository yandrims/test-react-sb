/** constants */
import STATUS_TYPES from '../../constants/statusTypes';
import ACTION_TYPES from '../../constants/actionTypes';
import DEFAULT_STATES from '../../constants/defaultStates';

const modelName = 'MOVIE_DETAIL';
const defaultState = DEFAULT_STATES[modelName];
const { LOADING, SUCCESS, ERROR } = STATUS_TYPES;
const { GET_LOAD, GET_RES, GET_ERR } = ACTION_TYPES[modelName];

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

		default:
			return state;
	}
}

export default reducer;
