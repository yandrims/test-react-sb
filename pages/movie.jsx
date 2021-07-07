/** npm packages */
import React from 'react';
import { connect } from 'react-redux';

/** components */
import MainLayout from '../views/layouts/MainLayout';
import HeadContent from '../views/layouts/heads/HeadContent';
import DetailContainer from '../views/containers/movies/DetailContainer';

/** constants */
import SEO_META from '../constants/seoMeta';
import ACTION_TYPES from '../constants/actionTypes';

/** helpers */
import { mobileDetectFromInitialProps } from '../helpers/utils';

function Index({
	isMobile,
	dispatch,
	queryParams,

	storeMovieDetail,
}) {
	const meta = {
		...SEO_META.DEFAULT,
		TITLE: 'Album Detail',
	};
	const layoutProps = {
		isMobile,
		dispatch,
		queryParams,
	};

	return (
		<MainLayout {...layoutProps}>
			<HeadContent seoContent={{ meta }} />
			<DetailContainer {...layoutProps} storeMovieDetail={storeMovieDetail} />
		</MainLayout>
	);
}

Index.getInitialProps = async (props) => {
	const { store, isServer, query, req } = props.ctx;
	const isMobile = mobileDetectFromInitialProps(isServer, req);
	const { id = null } = query;

	store.dispatch({
		type: ACTION_TYPES.MOVIE_DETAIL.GET,
		payload: {
			isServer,
			isMobile,
			id,
		},
	});

	return { queryParams: query };
};

export default connect((state) => state)(Index);
