/* eslint-disable import/no-dynamic-require */
/** npm packages */
const express = require('express');
const next = require('next');
const bodyParser = require('body-parser');
const cors = require('cors');
const boxen = require('boxen');

const nextServerWrapper = require('./nextServerWrapper');
const errorHandler = require('./errorHandler');

const server = express();

/** current environment */
const {
	ENV: currentEnv = 'production',
	NODE_ENV,
	PORT: port = 3000,
	npm_package_description: appName = 'Server',
} = process.env;

/** environments */
const ENV = require(`../config/env/${currentEnv}`);
const { BASE_URL = `http://localhost:${port}` } = ENV;

const app = next({ dev: NODE_ENV !== 'production' });

/** constants */
const ROUTES = require('../constants/routes');

/** routes */
const api = require('./api');
const moviesRoutes = require('./routes/movies');
const indexRoutes = require('./routes/index');

/** combine routes */
const routes = [moviesRoutes, indexRoutes];

server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cors());

app.prepare().then(() => {
	const publicFolder = ROUTES.PUBLIC.route;
	const publicPath = `${__dirname}/..${publicFolder}`;
	const publicFiles = ['/favicon.ico'];
	server.use(nextServerWrapper(app));
	server.use(publicFolder, express.static(publicPath));

	/** Public files */
	if (publicFiles && publicFiles.length) {
		publicFiles.forEach((elm) => {
			server.all(`/${elm}`, (req, res) =>
				res.status(200).sendFile(elm, {
					root: `${publicPath}/`,
				}),
			);
		});
	}

	/** Local API route */
	server.use(ROUTES.API.route, api);

	/** Pages route */
	if (routes && routes.length) {
		routes.forEach((elm) => {
			server.use(elm);
		});
	}

	/** Error page route */
	server.use(errorHandler());

	/** Listen the server */
	server.listen(port, () => {
		const appInfo = `${appName
			.replace(/-/g, ' ')
			.toUpperCase()} is running on port ${port}\n\nListening on: ${BASE_URL}`;

		console.log(
			boxen(appInfo, {
				padding: 1,
				margin: 1,
				borderStyle: 'round',
				borderColor: 'cyan',
			}),
		);
	});
});

module.exports.app = app;
