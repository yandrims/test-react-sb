/** npm packages */
import { fork } from 'redux-saga/effects';

/** sagas */
// G
import sagaGeneral from './general';
// M
import sagaMovieDetail from './movieDetail';
import sagaMovieList from './movieList';

export default function* rootSaga() {
	// G
	yield fork(sagaGeneral);
	// M
	yield fork(sagaMovieDetail);
	yield fork(sagaMovieList);
}
