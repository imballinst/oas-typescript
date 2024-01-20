module.exports = {
  apps: [
    {
      name: 'oas-typescript-koa-test-server',
      script: 'generated/server.ts',
      watch: ['generated'],
      interpreter: 'yarn',
      interpreter_args: 'tsx',
      cwd: process.cwd(),
      watch_delay: 1000,
      ignore_watch: ['node_modules']
    },
    {
      name: 'oas-typescript-koa-test-server-cjs',
      script: '../test-oas-typescript-koa-cjs/generated/server.ts',
      watch: ['../test-oas-typescript-koa-cjs/generated'],
      interpreter: 'yarn',
      interpreter_args: 'tsx',
      env_development: {
        PORT: 3001
      },
      cwd: process.cwd(),
      watch_delay: 1000,
      ignore_watch: ['../test-oas-typescript-koa-cjs/node_modules']
    }
  ]
};
