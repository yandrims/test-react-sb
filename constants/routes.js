const MOVIE = {
	href: '/movie',
	route: '/movie/:id',
	url: '/movie',
};

const SPECIAL_ROUTES = {
	API: { href: '/api', route: '/api', url: '/api' },
	PUBLIC: { href: '/public', route: '/public', url: '/public' },
};

module.exports = {
	MOVIE,

	...SPECIAL_ROUTES,
	INDEX: { href: '/index', route: '/', url: '/' },
};
