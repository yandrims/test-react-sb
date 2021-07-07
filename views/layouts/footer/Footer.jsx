/** npm packages */
import React from 'react';
import propTypes from 'prop-types';

/** components */
import FooterDesktop from './FooterDesktop';

function Footer({ isMobile, dispatch }) {
	const props = { isMobile, dispatch };

	return <FooterDesktop {...props} />;
}

Footer.propTypes = {
	isMobile: propTypes.bool.isRequired,
};

export default Footer;
