module.exports = {
  apps: [
    {
      name: 'petstore',
      script: 'ts-node --esm generated/server.ts',
      watch: ['generated'],
      // Delay between restart
      watch_delay: 1000,
      ignore_watch: ['node_modules']
    }
  ]
};
