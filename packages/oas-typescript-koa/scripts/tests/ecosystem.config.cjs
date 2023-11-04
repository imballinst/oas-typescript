module.exports = {
  apps: [
    {
      name: 'oas-typescript-koa-test-server',
      script: 'generated/server.ts',
      watch: ['generated'],
      interpreter: 'node',
      interpreter_args: '--loader ts-node/esm',
      cwd: process.cwd(),
      watch_delay: 1000,
      ignore_watch: ['node_modules']
    }
  ]
};
