/** config */
import ENV from '../config/env';

/** constant */
import IMAGES from './images';
import GLOBAL from './global';

const { BASE_URL } = ENV;

const MICRODATA = {
	GLOBAL: [
		{
			'@context': 'http://schema.org',
			'@type': 'Organization',
			name: GLOBAL.NAME,
			url: BASE_URL,
			logo: IMAGES.LOGO,
			sameAs: [
				'https://www.facebook.com/',
				'https://twitter.com',
				'https://www.instagram.com/',
				'https://www.linkedin.com/',
			],
		},
	],
	INDEX: [
		{
			'@context': 'http://schema.org',
			'@type': 'WebSite',
			url: BASE_URL,
		},
	],
};

export default MICRODATA;
