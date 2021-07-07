/** constants */
const express = require('express');
const ROUTES = require('../../constants/routes');

const router = express.Router();

/** route for movie detail page */
router.get(ROUTES.MOVIE.route, (req, res) => {
	req.app.render(
		req,
		res,
		ROUTES.MOVIE.href,
		Object.assign(req.query, req.params),
	);
});

module.exports = router;
