#!/usr/bin/env node
import { generateRestServerStubs } from '@oast/shared-cli-rest';

import commandsRecord from './constants/help-text.json';
import { middlewareHelpersTs, utilsTs, typesTs } from './templates.js';
import { generateTemplateRouter } from './helpers/templates/router.js';
import { generateRouteMiddleware } from './helpers/templates/middleware.js';

async function main() {
  await generateRestServerStubs({
    commandsRecord,
    usageText:
      'openapi-to-koa generate <path-to-openapi-json-or-yaml> [...options]',
    templateFunctions: {
      router: generateTemplateRouter,
      routerMiddleware: generateRouteMiddleware
    },
    templates: {
      routeMiddlewareHelpersTs: utilsTs,
      securityMiddlewareHelpersTs: middlewareHelpersTs,
      typesTs
    }
  });
}

main();
