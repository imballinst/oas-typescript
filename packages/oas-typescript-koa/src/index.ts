#!/usr/bin/env node
import { OpenAPIV3 } from 'openapi-types';
import { tmpdir } from 'os';
import {
  generateZodClientFromOpenAPI,
  getHandlebars
  // @ts-ignore
} from './entry.js';
import { titleCase } from 'title-case';
import meow from 'meow';
import fs from 'fs/promises';
import path from 'path';
import { execSync } from 'child_process';

import {
  defaultHandlebars,
  middlewareHelpersTs,
  utilsTs
} from './templates.js';
import { ControllerInfo } from './helpers/templates/types.js';
import { generateRouteMiddleware } from './helpers/templates/middleware.js';
import { generateTemplateController } from './helpers/templates/controller.js';
import { generateTemplateRouter } from './helpers/templates/router.js';

const cli = meow(
  `
	Usage
	  $ openapi-to-koa <path-to-openapi-json>

	Options
	  --output, -o                 Specify a place for output, default to (pwd)/generated
	  --recreate-controllers, -rc  Recreate controllers if old ones exist, default to false

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
      },
      regenerateTemplateControllers: {
        type: 'boolean',
        shortFlag: 'rc'
      }
    }
  }
);

async function main() {
  const cliInput = cli.input[0];
  const input = path.isAbsolute(cliInput)
    ? cliInput
    : path.join(process.cwd(), cliInput);

  const {
    output: cliOutput,
    regenerateTemplateControllers: cliRegenerateTemplateControllers = false
  } = cli.flags;
  let output = path.join(process.cwd(), 'generated');

  if (cliOutput) {
    output = path.isAbsolute(cliOutput)
      ? cliOutput
      : path.join(process.cwd(), cliOutput);
  }

  // Copy the utility and the middleware helpers.
  const tmpFolder = path.join(tmpdir(), '@oast');
  const handlebarsFilePath = path.join(tmpFolder, 'koa/default.hbs');

  // Create the files in these folders.
  await Promise.all([
    fs.mkdir(path.dirname(handlebarsFilePath), { recursive: true }),
    fs.mkdir(tmpFolder, { recursive: true }),
    fs.mkdir(output, { recursive: true })
  ]);
  await Promise.all([
    fs.writeFile(handlebarsFilePath, defaultHandlebars, 'utf-8'),
    fs.writeFile(path.join(output, 'utils.ts'), utilsTs, 'utf-8'),
    fs.writeFile(
      path.join(output, 'middleware-helpers.ts'),
      middlewareHelpersTs,
      'utf-8'
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
    templatePath: handlebarsFilePath,
    handlebars
  });

  // Generate the definitions only.
  const routers: string[] = [];

  const methods = ['get', 'post', 'put', 'delete', 'patch'] as const;
  const controllerToOperationsRecord: Record<string, ControllerInfo[]> = {};
  const parametersImportsPerController: Record<string, string[]> = {};
  const allServerSecurityImports: string[] = [];

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
      if (!controllerToOperationsRecord[controllerName]) {
        controllerToOperationsRecord[controllerName] = [];
      }

      if (!parametersImportsPerController[controllerName]) {
        parametersImportsPerController[controllerName] = [];
      }

      const parameterName = `${capitalizeFirstCharacter(
        operationId
      )}Parameters`;

      controllerToOperationsRecord[controllerName].push({
        operationId,
        parameterName
      });

      parametersImportsPerController[controllerName].push(parameterName);

      const middlewares: string[] = [
        generateRouteMiddleware({
          controllerName,
          operationId,
          parameterName
        })
      ];

      if (security) {
        const securityName = `${capitalizeFirstCharacter(operationId)}Security`;
        allServerSecurityImports.push(securityName);

        middlewares.unshift(
          `KoaGeneratedUtils.createSecurityMiddleware(${securityName})`
        );
      }

      const koaPath = pathKey
        .split('/')
        .map(convertOpenApiPathToKoaPath)
        .join('/');

      routers.push(
        `
router.${methodKey}('${koaPath}', ${middlewares.join(', ')})
      `.trim()
      );
    }
  }

  // Create controllers.
  for (const controllerKey in controllerToOperationsRecord) {
    const pathToController = path.join(
      output,
      `controllers/${controllerKey}.ts`
    );
    const controllers = controllerToOperationsRecord[controllerKey];
    let isControllerExist = false;

    try {
      await fs.stat(pathToController);
      // If it doesn't throw, then it exists.
      isControllerExist = true;
    } catch (err) {
      // No-op.
    }

    if (isControllerExist && !cliRegenerateTemplateControllers) {
      continue;
    }

    // TODO: improve this so that we could append/delete as needed, instead of
    // having to move the old one to *.old.ts.
    if (isControllerExist) {
      await fs.rename(
        pathToController,
        pathToController.replace('.ts', '.old.ts')
      );
    } else {
      // It doesn't exist, so we need to create it first.
      await fs.mkdir(path.dirname(pathToController), { recursive: true });
    }

    await fs.writeFile(
      pathToController,
      generateTemplateController({
        controllerKey,
        controllers,
        parametersImportsPerController
      }),
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

  const template = generateTemplateRouter({
    allServerSecurityImports,
    controllerToOperationsRecord,
    parametersImportsPerController,
    routers
  });

  await fs.writeFile(path.join(output, 'server.ts'), template, 'utf-8');

  // Replace z.instanceof(File) (if any).
  const distClientPath = path.join(output, 'client.ts');
  let distClientContent = await fs.readFile(distClientPath, 'utf-8');
  if (distClientContent.includes('z.instanceof(File)')) {
    // Replace with z.any().
    distClientContent = distClientContent.replace(
      /z\.instanceof\(File\)/g,
      'z.any()'
    );
  }
  await fs.writeFile(distClientPath, distClientContent, 'utf-8');
  await fs.rm(tmpFolder, { recursive: true, force: true });

  // Hijack the prettier because we want to use the prettier from the current node_modules rather than to install a new one.
  execSync(`yarn prettier ${cliOutput} --write`);
}

main();

// Helper functions.
function capitalizeFirstCharacter(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function convertOpenApiPathToKoaPath(s: string) {
  if (!s.startsWith('{') && !s.endsWith('}')) return s;
  return `:${s.slice(1, -1)}`;
}
