module.exports = {
	apps: [
		{
			name: 'test-react-sb-local',
			script: 'server/app.js',
			instances: 1,
			exec_mode: 'cluster',
			autorestart: true,
			watch: false,
			max_memory_restart: '1G',
			env: {
				NODE_ENV: 'production',
				ENV: 'local',
				API: 'stg',
				PORT: 3000,
			},
			env_local: {
				NODE_ENV: 'production',
				ENV: 'local',
				API: 'stg',
				PORT: 3000,
			},
		},
	],
};
