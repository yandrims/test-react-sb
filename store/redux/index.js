/** npm packages */
import { combineReducers } from 'redux';

// G
import storeGeneral from './general';
// M
import storeMovieDetail from './movieDetail';
import storeMovieList from './movieList';

const rootReducer = combineReducers({
	// G
	storeGeneral,
	// M
	storeMovieDetail,
	storeMovieList,
});

export default rootReducer;
