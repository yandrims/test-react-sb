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
const modelName = 'MOVIE_LIST';
const {
	GET_LOAD,
	GET_RES,
	GET_ERR,
	GET,
	GET_LOAD_MORE,
	GET_RES_MORE,
	GET_ERR_MORE,
	GET_MORE,
} = ACTION_TYPES[modelName];

/** Fetch data */
function* getMainData({ payload, callback }) {
	try {
		const { isServer = false, params = {}, isLoadMore = false } = payload;
		const { page = 1, q = '', year = null } = params;
		const endpointParams = paramsToString({
			apikey: API_KEY,
			page,
			s: q,
			y: year,
		});
		const uri = `${API.SERVER}${endpointParams}`;
		const options = {
			url: isServer ? uri : API.LOCAL,
			headers: setHeaderAPI(payload, uri),
			method: 'GET',
		};

		yield put({
			type: isLoadMore ? GET_LOAD_MORE : GET_LOAD,
		});

		const { timeout, response } = yield race({
			timeout: delay(ENV.TIMEOUT.REQUEST),
			response: call(axios, options),
		});

		if (timeout) {
			yield put({
				type: isLoadMore ? GET_ERR_MORE : GET_ERR,
				error: ERROR_TYPES.TIMEOUT,
			});

			if (isFunction(callback)) {
				callback(ERROR_TYPES.TIMEOUT);
			}
		} else if (response.data.stack) {
			yield put({
				type: isLoadMore ? GET_ERR_MORE : GET_ERR,
				error: response.data.message,
			});

			if (isFunction(callback)) {
				callback(response.data.message);
			}
		} else {
			const result = response.data;
			const {
				Search = [],
				totalResults = 0,
				Response = '',
				Error = '',
			} = result;

			yield put({
				type: isLoadMore ? GET_RES_MORE : GET_RES,
				payload: {
					meta: { totalResults, status: Response, errorMessage: Error },
					data: Search,
				},
			});

			if (isFunction(callback)) {
				callback(null, result);
			}
		}
	} catch (err) {
		const { isLoadMore } = payload;

		yield put({
			type: isLoadMore ? GET_ERR_MORE : GET_ERR,
			error: getErrorMessage(err),
		});

		if (isFunction(callback)) {
			callback(getErrorMessage(err));
		}
	}
}

export default function* combineSaga() {
	yield takeEvery(GET, getMainData);
	yield takeEvery(GET_MORE, getMainData);
}
