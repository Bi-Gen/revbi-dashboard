// PM2 Configuration for RevBI Dashboard
module.exports = {
  apps: [
    {
      name: 'revbi-dashboard',
      script: 'node_modules/.bin/next',
      args: 'start -p 3005',
      cwd: '/var/www/revbi',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '500M',
      env: {
        NODE_ENV: 'production',
        PORT: 3005
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 3005
      },
      error_file: '/var/log/pm2/revbi-error.log',
      out_file: '/var/log/pm2/revbi-out.log',
      merge_logs: true,
      time: true
    }
  ]
};
