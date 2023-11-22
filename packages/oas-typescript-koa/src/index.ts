#!/usr/bin/env node
import { generateRestServerStubs } from '@oast/shared-cli-rest';

import commandsRecord from './constants/help-text.json';
import { utilsTs } from './templates.js';
import { generateTemplateRouter } from './helpers/templates/router.js';
import { generateRouteMiddleware } from './helpers/templates/middleware.js';

async function main() {
  await generateRestServerStubs({
    commandsRecord,
    usageText:
      'openapi-to-koa generate <path-to-openapi-json-or-yaml> [...options]',
    templateFunctions: {
      router: generateTemplateRouter,
      routerMiddleware: generateRouteMiddleware,
      securityMiddlewareInvocation: (securityName) =>
        `KoaGeneratedUtils.createSecurityMiddleware(${securityName})`
    },
    templates: {
      routeMiddlewareHelpersTs: utilsTs
    }
  });
}

main();
