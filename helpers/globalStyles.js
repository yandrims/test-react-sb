/** constants */
import ROUTES from '../constants/routes';

const FONT_PATH = ROUTES.PUBLIC.url;

const Styles = `
	@font-face {
		font-family: 'Nunito';
		font-style: normal;
		font-weight: 300;
		font-display: swap;
		src: local('Nunito Light'), local('Nunito-Light'),
			url('${FONT_PATH}/fonts/nunito/light.woff2') format('woff2');
	}

	@font-face {
		font-family: 'Nunito';
		font-style: normal;
		font-weight: 400;
		font-display: swap;
		src: local('Nunito Regular'), local('Nunito-Regular'),
			url('${FONT_PATH}/fonts/nunito/regular.woff2') format('woff2');
	}

	@font-face {
		font-family: 'Nunito';
		font-style: normal;
		font-weight: 600;
		font-display: swap;
		src: local('Nunito SemiBold'), local('Nunito-SemiBold'),
			url('${FONT_PATH}/fonts/nunito/semiBold.woff2') format('woff2');
	}

	@font-face {
		font-family: 'Nunito';
		font-style: normal;
		font-weight: 700;
		font-display: swap;
		src: local('Nunito Bold'), local('Nunito-Bold'),
			url('${FONT_PATH}/fonts/nunito/bold.woff2') format('woff2');
	}

	body {
		font-family: 'Nunito', sans-serif, -apple-system, BlinkMacSystemFont, 'Segoe UI',
		Roboto, 'Helvetica Neue', sans-serif;
	}

	strong {
		font-family: 'Nunito';
		font-weight: 700;
	}
`;

export default Styles;
