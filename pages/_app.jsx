/** npm packages */
import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import Router from 'next/router';
import withRedux from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga';
import styled, { ThemeProvider } from 'styled-components';

/** theme */
import theme from '../config/theme';

/** ui library */
import Normalize from 'y-ui/dist/helpers/normalize';
import Loader from 'y-ui/dist/elements/Loader';

/** global styles */
import GlobalStyles from '../helpers/globalStyles';

/** helpers */
import { initApp } from '../helpers/utils';

/** store */
import createStore from '../store';

const Loading = styled.div`
	position: fixed;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	background: rgba(255, 255, 255, 0.5);
	z-index: 99;
`;

function MyApp({ Component, pageProps, store }) {
	const {
		storeGeneral: {
			device: { isMobile },
		},
	} = store.getState();

	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		Router.events.on('routeChangeStart', () => {
			setIsLoading(true);
		});
		Router.events.on('routeChangeError', () => {
			setIsLoading(false);
		});
		Router.events.on('routeChangeComplete', () => {
			setIsLoading(false);
		});
	}, []);

	return (
		<Provider store={store}>
			<Normalize theme={theme} globalStyles={GlobalStyles} />
			<ThemeProvider theme={theme}>
				{isLoading && (
					<Loading>
						<Loader />
					</Loading>
				)}
				<Component {...pageProps} isMobile={isMobile} />
			</ThemeProvider>
		</Provider>
	);
}

MyApp.getInitialProps = async (appContext) => {
	const { Component, ctx } = appContext;
	const { store, isServer, req } = ctx;

	if (isServer) {
		initApp({
			userAgent: req.headers['user-agent'],
			dispatch: store.dispatch,
		});
	}

	let pageProps = {};

	if (Component.getInitialProps) {
		pageProps = await Component.getInitialProps({ ctx });
	}

	return { pageProps };
};

export default withRedux(createStore)(withReduxSaga(MyApp));
