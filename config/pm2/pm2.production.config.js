module.exports = {
	apps: {
		name: 'test-react-sb',
		script: 'server/app.js',
		instances: 6,
		exec_mode: 'cluster',
		autorestart: true,
		watch: false,
		max_memory_restart: '4G',
		env: {
			NODE_ENV: 'production',
			ENV: 'production',
			API: 'production',
			PORT: 8020,
		},
		env_production: {
			NODE_ENV: 'production',
			ENV: 'production',
			API: 'production',
			PORT: 8020,
		},
	},
};
