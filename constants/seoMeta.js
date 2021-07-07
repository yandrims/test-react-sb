import ENV from '../config/env';
import GLOBAL from './global';
import IMAGES from './images';

const SEO_META = {
	DEFAULT: {
		TITLE: 'This is Title',
		DESC: 'This is Description',
		KEYWORDS: 'This is Keywords',
		CANONICAL_URL: ENV.BASE_URL,
		OG_LOCALE: 'Id_ID',
		OG_TITLE: 'This is OG Title',
		OG_DESC: 'This is OG Description',
		OG_TYPE: 'Website',
		OG_SITENAME: GLOBAL.NAME,
		OG_URL: ENV.BASE_URL,
		OG_IMAGE: IMAGES.LOGO,
		OG_IMAGE_URL: IMAGES.LOGO,
		OG_IMAGE_TYPE: 'png',
		OG_IMAGE_WIDTH: 'Auto',
		OG_IMAGE_HEIGHT: 'Auto',
		OG_IMAGE_ALT: 'This is Image Alt',
		OG_TWITTER_CARD: 'Summary',
		OG_TWITTER_TITLE: 'This is Twitter Title',
		OG_TWITTER_DESC: 'This is Twitter Desc',
		OG_TWITTER_SITE: '@twitter',
	},
};

export default SEO_META;
