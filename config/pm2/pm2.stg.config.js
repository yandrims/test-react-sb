module.exports = {
	apps: [
		{
			name: 'test-react-sb-stg',
			script: 'server/app.js',
			instances: 1,
			exec_mode: 'cluster',
			autorestart: true,
			watch: false,
			max_memory_restart: '1G',
			env: {
				NODE_ENV: 'production',
				ENV: 'stg',
				API: 'stg',
				PORT: 3010,
			},
			env_stg: {
				NODE_ENV: 'production',
				ENV: 'stg',
				API: 'stg',
				PORT: 3010,
			},
		},
	],
};
