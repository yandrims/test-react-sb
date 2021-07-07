/** npm packages */
import { put, takeEvery } from 'redux-saga/effects';

/** constants */
import ACTION_TYPES from '../../constants/actionTypes';

const modelName = 'GENERAL';
const { DEVICE_GET_RES, TOAST_SET_RES, DEVICE_GET, TOAST_SET } =
	ACTION_TYPES[modelName];

function* getDevice(params = {}) {
	try {
		yield put({
			type: DEVICE_GET_RES,
			payload: params.payload,
		});
	} catch (error) {
		console.log('Error get device', error);
	}
}

function* setToastNotification(params = {}) {
	try {
		yield put({
			type: TOAST_SET_RES,
			payload: params.payload,
		});
	} catch (error) {
		console.log('Error setToastNotification', error);
	}
}

export default function* rootSaga() {
	yield takeEvery(DEVICE_GET, getDevice);
	yield takeEvery(TOAST_SET, setToastNotification);
}
