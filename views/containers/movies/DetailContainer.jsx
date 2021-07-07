/** npm packages */
import React from 'react';
import Router from 'next/router';
import propTypes from 'prop-types';

/** components */
import DetailTemplateDesktop from './DetailTemplateDesktop';

function Index({
	isMobile,
	queryParams,
	dispatch,

	storeMovieDetail,
}) {
	const props = {
		isMobile,
		queryParams,
		dispatch,

		storeMovieDetail,
		backPage,
	};

	return <DetailTemplateDesktop {...props} />;

	function backPage() {
		Router.back();
	}
}

Index.propTypes = {
	isMobile: propTypes.bool.isRequired,
};

export default Index;
