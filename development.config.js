module.exports = {
  apps: [
    {
      name: 'node-pi',
      script: 'server.js',
      watch: true,
      env: {
        NODE_ENV: 'development'
      }
    }
  ]
};