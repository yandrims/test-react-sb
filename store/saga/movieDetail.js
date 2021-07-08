/* eslint-disable no-lonely-if */
/** npm packages */
import axios from 'axios';
import { race, call, delay, put, takeEvery } from 'redux-saga/effects';

/** config */
import ENV from '../../config/env';

/** constants */
import ACTION_TYPES from '../../constants/actionTypes';
import ERROR_TYPES from '../../constants/errorTypes';

/** helpers */
import { setHeaderAPI, getErrorMessage } from '../../helpers/utils';
import { isFunction, paramsToString } from '../../helpers/customFunctions';

const { API, API_KEY } = ENV;
const modelName = 'MOVIE_DETAIL';
const { GET_LOAD, GET_RES, GET_ERR, GET } = ACTION_TYPES[modelName];

/** Fetch adata */
function* getMainData({ payload, callback }) {
	try {
		const { isServer = false, id = null } = payload;
		const endpointParams = paramsToString({
			apikey: API_KEY,
			i: id,
		});
		const uri = `${API.SERVER}${endpointParams}`;
		const options = {
			url: isServer ? uri : API.LOCAL,
			headers: setHeaderAPI(payload, uri),
			method: 'GET',
		};

		yield put({
			type: GET_LOAD,
		});

		const { timeout, response } = yield race({
			timeout: delay(ENV.TIMEOUT.REQUEST),
			response: call(axios, options),
		});

		if (timeout) {
			yield put({
				type: GET_ERR,
				error: ERROR_TYPES.TIMEOUT,
			});

			if (isFunction(callback)) {
				callback(ERROR_TYPES.TIMEOUT);
			}
		} else if (response.data.stack) {
			yield put({
				type: GET_ERR,
				error: response.data.message,
			});

			if (isFunction(callback)) {
				callback(response.data.message);
			}
		} else {
			const result = { meta: {}, data: response.data };

			yield put({
				type: GET_RES,
				payload: result,
			});

			if (isFunction(callback)) {
				callback(null, result);
			}
		}
	} catch (err) {
		yield put({
			type: GET_ERR,
			error: getErrorMessage(err),
		});

		if (isFunction(callback)) {
			callback(getErrorMessage(err));
		}
	}
}

export default function* combineSaga() {
	yield takeEvery(GET, getMainData);
}
