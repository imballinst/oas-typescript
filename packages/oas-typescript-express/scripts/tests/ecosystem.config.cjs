module.exports = {
  apps: [
    {
      name: 'oas-typescript-express-test-server',
      script: 'generated/server.ts',
      watch: ['generated'],
      interpreter: 'node',
      interpreter_args: '--loader ts-node/esm',
      cwd: process.cwd(),
      watch_delay: 1000,
      ignore_watch: ['node_modules']
    },
    {
      name: 'oas-typescript-express-test-server-cjs',
      script: '../test-oas-typescript-express-cjs/generated/server.ts',
      watch: ['../test-oas-typescript-express-cjs/generated'],
      interpreter: 'yarn',
      interpreter_args: 'ts-node',
      env_development: {
        PORT: 3001
      },
      cwd: process.cwd(),
      watch_delay: 1000,
      ignore_watch: ['../test-oas-typescript-express-cjs/node_modules']
    }
  ]
};
