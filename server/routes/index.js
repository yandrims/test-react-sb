/** constants */
const express = require('express');
const ROUTES = require('../../constants/routes');

const router = express.Router();

/** route for INDEX page */
router.get(ROUTES.INDEX.route, (req, res) => {
	req.app.render(
		req,
		res,
		ROUTES.INDEX.href,
		Object.assign(req.query, req.params),
	);
});

module.exports = router;
