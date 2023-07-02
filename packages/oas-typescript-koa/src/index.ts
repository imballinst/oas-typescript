#!/usr/bin/env node
import { OpenAPIV3 } from 'openapi-types';
import {
  generateZodClientFromOpenAPI,
  getHandlebars
} from 'openapi-zod-client';
import { titleCase } from 'title-case';
import meow from 'meow';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

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

const DIRNAME = path.dirname(fileURLToPath(import.meta.url));

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

  // Copy the utility and the middleware helpers.
  await fs.mkdir(output, { recursive: true });
  await Promise.all([
    fs.copyFile(
      path.join(DIRNAME, 'templates/typescript/utils.ts'),
      path.join(output, 'utils.ts')
    ),
    fs.copyFile(
      path.join(DIRNAME, 'templates/typescript/middleware-helpers.ts'),
      path.join(output, 'middleware-helpers.ts')
    )
  ]);

  // Start the process.
  const document: OpenAPIV3.Document = JSON.parse(
    await fs.readFile(input, 'utf-8')
  );

  const handlebars = getHandlebars();
  handlebars.registerHelper(
    'ifEquals',
    function (arg1: any, arg2: any, options: any) {
      return arg1 == arg2 ? options.fn(this) : options.inverse(this);
    }
  );
  handlebars.registerHelper('capitalizeFirstLetter', function (options: any) {
    return capitalizeFirstCharacter(options.fn(this));
  });

  await generateZodClientFromOpenAPI({
    openApiDoc: document as any,
    distPath: path.join(output, 'client.ts'),
    templatePath: path.join(DIRNAME, 'templates/handlebars/default.hbs'),
    handlebars
  });

  // Generate the definitions only.
  const routers: string[] = [];

  const methods = ['get', 'post', 'put', 'delete', 'patch'] as const;
  const controllersInformation: Record<
    string,
    Array<{ parameterName: string; operationId: string }>
  > = {};
  const parametersImportsPerController: Record<string, string[]> = {};
  const allServerSecurityImports: string[] = [];

  let hasSecurity = false;

  for (const pathKey in document.paths) {
    const pathItem = document.paths[pathKey];
    if (!pathItem) continue;

    for (const methodKey of methods) {
      const operation = pathItem[methodKey];
      if (!operation) continue;

      const { tags = [], operationId, security } = operation;
      const [tag] = tags;

      if (!tag) {
        throw new Error(
          `The tag for the method ${methodKey} of ${pathKey} is not defined. Define it, then try again.`
        );
      }

      if (!operationId) {
        throw new Error(
          `The operation ID for the method ${methodKey} of ${pathKey} is not defined. Define it, then try again.`
        );
      }

      const controllerName = `${titleCase(tag)}Controller`;
      if (!controllersInformation[controllerName]) {
        controllersInformation[controllerName] = [];
      }

      if (!parametersImportsPerController[controllerName]) {
        parametersImportsPerController[controllerName] = [];
      }

      const parameterName = `${capitalizeFirstCharacter(
        operationId
      )}Parameters`;

      controllersInformation[controllerName].push({
        operationId,
        parameterName
      });

      parametersImportsPerController[controllerName].push(parameterName);

      const middlewares: string[] = [
        `
(ctx, next) => {
  const parsedRequestInfo = KoaGeneratedUtils.parseRequestInfo({ 
    ctx,
    oasParameters: ${parameterName}
  })
  if (!parsedRequestInfo) {
    ctx.status = 400
    return
  }

  const { } = ${controllerName}.${operationId}(parsedRequestInfo)
  ctx.status = 200
}
      `.trim()
      ];

      if (security) {
        const securityName = `${capitalizeFirstCharacter(operationId)}Security`;
        allServerSecurityImports.push(securityName);

        hasSecurity = true;
        middlewares.unshift(
          `KoaGeneratedUtils.createSecurityMiddleware(${securityName})`
        );
      }

      routers.push(
        `
router.${methodKey}('${pathKey}', ${middlewares.join(', ')})
      `.trim()
      );
    }
  }

  // Create controllers.
  for (const controllerKey in controllersInformation) {
    const pathToController = path.join(
      output,
      `controllers/${controllerKey}.ts`
    );
    const controller = controllersInformation[controllerKey];

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
  ${parametersImportsPerController[controllerKey].join(',\n  ')}
} from '../client'
import { ParsedRequestInfo } from '../utils';

export class ${controllerKey} {
${controller.map((c) => renderControllerMethod(c)).join('\n  ')}
}
    `.trim(),
      'utf-8'
    );
  }

  // Output security schemes.
  if (document.components?.securitySchemes) {
    await fs.writeFile(
      path.join(output, 'security-schemes.ts'),
      `export const securitySchemes = ${JSON.stringify(
        document.components?.securitySchemes,
        null,
        2
      )} as const`,
      'utf-8'
    );
  }

  const template = `
import Koa from 'koa'
import Router from '@koa/router'
import bodyParser from '@koa/bodyparser';
import { 
  ${allServerSecurityImports
    .concat(Object.values(parametersImportsPerController).flat())
    .join(',\n  ')}
} from './client.js'
import { KoaGeneratedUtils } from './utils.js'

${Object.keys(controllersInformation)
  .map((c) => `import { ${c} } from './controllers/${c}.js'`)
  .join('\n')}

const app = new Koa()
const router = new Router()

app.use(bodyParser());

${routers.join('\n\n')}

app
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(3000);
  `;

  await fs.writeFile(path.join(output, 'server.ts'), template, 'utf-8');

  if (hasSecurity) {
    // Create the middleware-helpers.ts.
  }
}

main();

// Helper functions.
function renderControllerMethod(controller: {
  parameterName: string;
  operationId: string;
}) {
  return `
static async ${controller.operationId}(params: ParsedRequestInfo<typeof ${controller.parameterName}>) {

}
  `.trim();
}

function capitalizeFirstCharacter(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}
