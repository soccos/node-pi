module.exports = {
  apps: [
    {
      name: 'node-pi',
      script: 'server.js',
      instances: '2',
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production'
      }
    }
  ]
};