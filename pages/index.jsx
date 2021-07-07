/** npm packages */
import React from 'react';
import { connect } from 'react-redux';

/** components */
import MainLayout from '../views/layouts/MainLayout';
import HeadContent from '../views/layouts/heads/HeadContent';
import HomeContainer from '../views/containers/home/HomeContainer';

/** constants */
import ACTION_TYPES from '../constants/actionTypes';
import SEO_META from '../constants/seoMeta';
import SEO_MICRODATA from '../constants/seoMicrodata';

/** helpers */
import { mobileDetectFromInitialProps } from '../helpers/utils';

function Index({
	isMobile,
	dispatch,
	queryParams,

	storeMovieList,
}) {
	const meta = {
		...SEO_META.DEFAULT,
		TITLE: 'Home',
	};
	const microdata = SEO_MICRODATA.INDEX || [];
	const layoutProps = {
		isMobile,
		dispatch,
		queryParams,
	};

	return (
		<MainLayout {...layoutProps}>
			<HeadContent seoContent={{ meta, microdata }} />
			<HomeContainer {...layoutProps} storeMovieList={storeMovieList} />
		</MainLayout>
	);
}

Index.getInitialProps = async (props) => {
	const { store, isServer, query, req } = props.ctx;
	const isMobile = mobileDetectFromInitialProps(isServer, req);
	const { page = 1, q = '', year = null } = query;

	store.dispatch({
		type: ACTION_TYPES.MOVIE_LIST.GET,
		payload: {
			isServer,
			isMobile,
			params: {
				page,
				q,
				year,
			},
		},
	});

	return { queryParams: query };
};

export default connect((state) => state)(Index);
