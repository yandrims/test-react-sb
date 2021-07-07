/** npm packages */
import React from 'react';
import NextDocument, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

/** helpers */
import { checkIsMobileDevice } from '../helpers/utils';

export default class Document extends NextDocument {
	static async getInitialProps(ctx) {
		const sheet = new ServerStyleSheet();
		const originalRenderPage = ctx.renderPage;
		const userAgent = ctx.req.headers['user-agent'];
		const isMobile = checkIsMobileDevice(userAgent);

		try {
			ctx.renderPage = () =>
				originalRenderPage({
					enhanceApp: (App) => (props) =>
						sheet.collectStyles(<App {...props} isMobile={isMobile} />),
					enhanceComponent: (Component) => Component,
				});

			const initialProps = await NextDocument.getInitialProps(ctx);

			return {
				...initialProps,
				styles: (
					<>
						{initialProps.styles}
						{sheet.getStyleElement()}
					</>
				),
			};
		} finally {
			sheet.seal();
		}
	}

	render() {
		return (
			<Html>
				<Head />
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}
