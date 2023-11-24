#!/usr/bin/env node
import { generateRestServerStubs } from '@oas-typescript/shared-cli-http-server';

import commandsRecord from './constants/help-text.json';
import { utilsTs } from './templates.js';
import { generateTemplateRouter } from './helpers/templates/router.js';
import { generateRouteMiddlewares } from './helpers/templates/middleware.js';

async function main() {
  await generateRestServerStubs({
    commandsRecord,
    usageText:
      'openapi-to-koa generate <path-to-openapi-json-or-yaml> [...options]',
    templateFunctions: {
      router: generateTemplateRouter,
      routerMiddlewares: generateRouteMiddlewares,
      securityMiddlewareInvocation: (securityName) =>
        `KoaGeneratedUtils.createSecurityMiddleware(${securityName})`
    },
    templates: {
      routeMiddlewareHelpersTs: utilsTs
    }
  });
}

main();
