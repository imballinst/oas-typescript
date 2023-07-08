module.exports = {
  apps: [
    {
      name: 'petstore',
      script: 'dist/server.js',
      watch: ['dist/server.js'],
      watch_delay: 1000,
      ignore_watch: ['node_modules']
    }
  ]
};
