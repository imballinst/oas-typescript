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
  const controllers: {
    name: string;
    fnParameterName: string;
  }[] = [];

  const methods = ['get', 'post', 'put', 'delete', 'patch'] as const;
  let hasSecurity = false;

  for (const pathKey in document.paths) {
    const pathItem = document.paths[pathKey];
    if (!pathItem) continue;

    for (const methodKey of methods) {
      const operation = pathItem[methodKey];
      if (!operation) continue;

      const { tags = [], operationId, security } = operation;
      const [tag] = tags;
      const controllerName = `${titleCase(tag)}Controller`;
      const controllerObject = {
        name: controllerName,
        fnParameterName: `${operationId}Parameter`
      };
      controllers.push(controllerObject);

      const middlewares: string[] = [
        `
(ctx, next) => {
  const { } = ${controllerName}.${operationId}()
  ctx.status = 200
}
      `.trim()
      ];

      if (security) {
        hasSecurity = true;

        middlewares.unshift(
          `
async (ctx, next) => {
  const { status } = await MiddlewareHelpers.doAdditionalSecurityValidation(ctx)
  
  if (status !== 200) {
    ctx.status = status
    return  
  }

  next()
}
        `.trim()
        );
      }

      routers.push(
        `
router.${methodKey}('${pathKey}', ${middlewares.join(', ')})
      `.trim()
      );
    }
  }

  const uniqueControllers = Array.from(new Set(controllers.map((c) => c.name)));
  const template = `
import Koa from 'koa'
import Router from '@koa/router'
import bodyParser from '@koa/bodyparser';
import { schemas } from './client'
import { MiddlewareHelpers } from './middleware-helpers'

${uniqueControllers
  .map((c) => `import ${c} from './controllers/${c}'`)
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
}

main();
