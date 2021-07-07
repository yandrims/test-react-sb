const withBundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: process.env.ANALYZE === 'true',
});

const withSass = require('@zeit/next-sass');

const { PORT, API, ENV } = process.env;

module.exports = withBundleAnalyzer(
	withSass({
		useFileSystemPublicRoutes: false,
		serverRuntimeConfig: {},
		publicRuntimeConfig: {
			PORT,
			API,
			ENV,
		},
	}),
);
