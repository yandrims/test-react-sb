/** Local api for web client side */
/** npm packages */
const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const api = express();

api.use(bodyParser.urlencoded({ extended: true, limit: '500mb' }));

api.all('/', (req, res) => {
	try {
		const {
			headers: { endpoint, authorization, contenttype, accept },
		} = req;

		const headers = {
			...(contenttype && { 'Content-Type': contenttype }),
			...(accept && { Accept: accept }),
			...(authorization && { Authorization: authorization }),
		};

		const isEmptyObj = (object) =>
			!Object.getOwnPropertySymbols(object).length &&
			!Object.getOwnPropertyNames(object).length;

		const options = {
			url: endpoint,
			method: req.method,
			...(req.body && !isEmptyObj(req.body) && { data: req.body }),
			headers,
		};

		if (endpoint) {
			axios(options)
				.then((result) => {
					res.send(result.data);
				})
				.catch((error) => {
					let customResponse = null;

					if (error.response) {
						res.status(error.response.status);
						customResponse = error.response.data;
					} else if (error.code === 'ENOTFOUND') {
						res.status('404');
						customResponse = {
							message: 'Not Found',
							detail: error.stack,
						};
					}

					res.send({
						error,
						...(customResponse && { customResponse }),
					});
				});
		} else {
			res.send('api web');
		}
	} catch (error) {
		res.send({ error });
	}

	return true;
});

module.exports = api;
