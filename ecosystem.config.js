module.exports = {
  apps: [
    {
      name: 'trutha-ai',
      script: '.next/standalone/server.js',
      cwd: '/home/ubuntu/trutha-ai',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
    },
  ],
};
