/* eslint-disable no-restricted-globals */
/** npm packages */
import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import { useRouter } from 'next/router';

/** components */
import HeaderDesktop from './HeaderDesktop';

function Header({ isMobile, dispatch, queryParams, storeGeneral }) {
	const { pathname } = useRouter();
	const [currentRoute, setCurrentRoute] = useState(pathname);

	useEffect(() => {
		setCurrentRoute(pathname === '/' ? '/index' : pathname);
	}, [pathname]);

	const props = {
		isMobile,
		dispatch,
		queryParams,
		storeGeneral,
		currentRoute,
	};

	return <HeaderDesktop {...props} />;
}

Header.propTypes = {
	isMobile: propTypes.bool.isRequired,
};

export default Header;
