/** npm packages */
import React from 'react';
import { connect } from 'react-redux';

/** constants and helpers */
import { initMobileDevice } from '../helpers/utils';

function ErrorPage({ statusCode }) {
	return <div>ERROR {statusCode}</div>;
}

ErrorPage.getInitialProps = async (props) => {
	const { store, req } = props.ctx;

	const userAgent = req.headers['user-agent'];
	const { dispatch } = store;

	initMobileDevice({ userAgent, dispatch });

	return { statusCode: 404 };
};

export default connect((state) => state)(ErrorPage);
