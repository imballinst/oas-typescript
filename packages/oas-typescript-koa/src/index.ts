#!/usr/bin/env node
import { OpenAPIV3 } from 'openapi-types';
import { generateZodClientFromOpenAPI } from 'openapi-zod-client';
import { titleCase } from 'title-case';
import meow from 'meow';
import fs from 'fs/promises';
import path from 'path';

const cli = meow(
  `
	Usage
	  $ openapi-to-koa <path-to-openapi-json>

	Options
	  --output, -o  Specify a place for output, default to (pwd)/generated

	Examples
	  $ openapi-to-koa ./openapi/api.json --output src/generated
	  🌈 unicorns 🌈
`,
  {
    importMeta: import.meta,
    flags: {
      output: {
        type: 'string',
        shortFlag: 'o'
      }
    }
  }
);

async function main() {
  const cliInput = cli.input[0];
  const input = path.isAbsolute(cliInput)
    ? cliInput
    : path.join(process.cwd(), cliInput);

  const { output: cliOutput } = cli.flags;
  let output = path.join(process.cwd(), 'generated');

  if (cliOutput) {
    output = path.isAbsolute(cliOutput)
      ? cliOutput
      : path.join(process.cwd(), cliOutput);
  }

  // Start the process.
  const document: OpenAPIV3.Document = JSON.parse(
    await fs.readFile(input, 'utf-8')
  );

  await generateZodClientFromOpenAPI({
    openApiDoc: document as any,
    distPath: path.join(process.cwd(), 'src/client.ts'),
    templatePath: path.join(process.cwd(), 'src/templates/default.hbs')
  });

  // Generate the definitions only.
  const routers: string[] = [];

  const methods = ['get', 'post', 'put', 'delete', 'patch'] as const;
  const controllersInformation: Record<
    string,
    Array<{ parameterName: string; operationId: string }>
  > = {};
  let hasSecurity = false;

  for (const pathKey in document.paths) {
    const pathItem = document.paths[pathKey];
    if (!pathItem) continue;

    for (const methodKey of methods) {
      const operation = pathItem[methodKey];
      if (!operation) continue;

      const { tags = [], operationId, security } = operation;
      const [tag] = tags;

      if (!operationId) {
        throw new Error(
          `The operation ID for the method ${methodKey} of ${pathKey} is not defined. Define it, then try again.`
        );
      }

      const controllerName = `${titleCase(tag)}Controller`;
      if (!controllersInformation[controllerName]) {
        controllersInformation[controllerName] = [];
      }

      controllersInformation[controllerName].push({
        operationId,
        parameterName: `${capitalizeFirstCharacter(operationId)}Parameter`
      });

      const middlewares: string[] = [
        `
(ctx, next) => {
  const { } = ${controllerName}.${operationId}({})
  ctx.status = 200
}
      `.trim()
      ];

      if (security) {
        hasSecurity = true;
        middlewares.unshift('MiddlewareHelpers.createSecurityMiddleware');
      }

      routers.push(
        `
router.${methodKey}('${pathKey}', ${middlewares.join(', ')})
      `.trim()
      );
    }
  }

  const template = `
import Koa from 'koa'
import Router from '@koa/router'
import bodyParser from '@koa/bodyparser';
import { schemas } from './client'
import { MiddlewareHelpers } from './middleware-helpers'

${Object.keys(controllersInformation)
  .map((c) => `import { ${c} } from './controllers/${c}'`)
  .join('\n')}

const app = new Koa()
const router = new Router()

app.use(bodyParser());

${routers.join('\n\n')}

app
  .use(router.routes())
  .use(router.allowedMethods());
  `;

  await fs.writeFile(
    path.join(process.cwd(), 'src/server.ts'),
    template,
    'utf-8'
  );

  if (hasSecurity) {
    // Create the middleware-helpers.ts.
  }

  const allParameters: string[] = [];

  // Create controllers.
  for (const controllerKey in controllersInformation) {
    const pathToController = path.join(
      process.cwd(),
      `src/controllers/${controllerKey}.ts`
    );
    const controller = controllersInformation[controllerKey];
    const parameters = Object.values(controller).map((c) => c.parameterName);

    allParameters.push(...parameters);

    try {
      await fs.stat(pathToController);
      // If it doesn't throw, then it exists.
    } catch (err) {
      // It doesn't exist, so we need to create it first.
      await fs.mkdir(path.dirname(pathToController), { recursive: true });
    }

    // TODO: find some way to patch the controller if there are removed/added operations.
    await fs.writeFile(
      pathToController,
      `
import { 
  ${parameters.join(',\n  ')}
} from '../parameters'

export class ${controllerKey} {
${controller.map((c) => renderControllerMethod(c)).join('\n  ')}
}
    `.trim(),
      'utf-8'
    );
  }

  await fs.writeFile(
    path.join(process.cwd(), 'src/parameters.ts'),
    `
${allParameters.map((p) => `export interface ${p} {}`)}
  `.trim(),
    'utf-8'
  );
}

main();

// Helper functions.
function renderControllerMethod(controller: {
  parameterName: string;
  operationId: string;
}) {
  return `
static async ${controller.operationId}(params: ${controller.parameterName}) {

}
  `.trim();
}

function capitalizeFirstCharacter(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}
