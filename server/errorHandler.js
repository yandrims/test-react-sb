module.exports = () => (req, res) => {
	req.app.render(req, res, '/errorPage', Object.assign(req.query, req.params));
};
