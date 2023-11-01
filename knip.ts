import type { KnipConfig } from 'knip';

const config: KnipConfig = {
  entry: ['packages/oas-typescript-koa/src/index.ts'],
  project: ['packages/oas-typescript-koa/src/**/*.ts'],
  ignore: [
    'packages/oas-swagger-ui/dist',
    'packages/oas-typescript-axios/generated',
    'packages/oas-typescript-axios/generated-with-headers',
    'packages/oas-typescript-koa/generated',
    'packages/oas-typescript-koa/templates'
  ]
};

export default config;
