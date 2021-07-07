module.exports = (nextjs) => (req, res, next) => {
	req.app = nextjs;
	next();
};
