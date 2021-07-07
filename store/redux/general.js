/** constants */
import ACTION_TYPES from '../../constants/actionTypes';
import DEFAULT_STATES from '../../constants/defaultStates';

const modelName = 'GENERAL';
const defaultState = DEFAULT_STATES[modelName];
const { DEVICE_GET_RES, TOAST_SET_RES } = ACTION_TYPES[modelName];

function reducer(state = defaultState, { type, payload }) {
	switch (type) {
		case DEVICE_GET_RES:
			return {
				...state,
				device: { isMobile: payload },
			};

		case TOAST_SET_RES:
			return {
				...state,
				toast: payload,
			};

		default:
			return state;
	}
}

export default reducer;
