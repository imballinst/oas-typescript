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
  utilsTs,
  typesTs
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
	  --output, -o                  Specify a place for output, default to (pwd)/generated.
	  --regenerate-non-stubs, -r  Recreate non-stubs files if old ones exist, default to false.
                                  Non stub files include controllers and middleware-helpers.ts

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
      regenerateNonStubs: {
        type: 'boolean',
        shortFlag: 'r'
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
    regenerateNonStubs: isRegenerateNonStubs = false
  } = cli.flags;
  let rootOutputFolder = path.join(process.cwd(), 'generated');

  if (cliOutput) {
    rootOutputFolder = path.isAbsolute(cliOutput)
      ? cliOutput
      : path.join(process.cwd(), cliOutput);
  }

  const lockedGeneratedFilesFolder = path.join(rootOutputFolder, 'generated');

  // Copy the utility and the middleware helpers.
  const tmpFolder = path.join(tmpdir(), '@oast');
  const handlebarsFilePath = path.join(tmpFolder, 'koa/default.hbs');

  // Create the files in these folders.
  await Promise.all([
    fs.mkdir(path.dirname(handlebarsFilePath), { recursive: true }),
    fs.mkdir(tmpFolder, { recursive: true }),
    fs.mkdir(lockedGeneratedFilesFolder, { recursive: true })
  ]);
  await Promise.all([
    fs.writeFile(handlebarsFilePath, defaultHandlebars, 'utf-8'),
    fs.writeFile(
      path.join(lockedGeneratedFilesFolder, 'utils.ts'),
      utilsTs,
      'utf-8'
    ),
    fs.writeFile(
      path.join(lockedGeneratedFilesFolder, 'types.ts'),
      typesTs,
      'utf-8'
    ),
    createOrDuplicateFile({
      filePath: path.join(rootOutputFolder, 'middleware-helpers.ts'),
      fileContent: middlewareHelpersTs,
      isRegenerateNonStubs
    })
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
    distPath: path.join(lockedGeneratedFilesFolder, 'client.ts'),
    templatePath: handlebarsFilePath,
    handlebars
  });

  // Generate the definitions only.
  const routers: string[] = [];

  const methods = ['get', 'post', 'put', 'delete', 'patch'] as const;
  const controllerToOperationsRecord: Record<string, ControllerInfo[]> = {};
  const parametersImportsPerController: Record<string, string[]> = {};
  const controllerImportsPerController: Record<string, string[]> = {};
  const allServerSecurityImports: string[] = [];

  for (const pathKey in document.paths) {
    const pathItem = document.paths[pathKey];
    if (!pathItem) continue;

    for (const methodKey of methods) {
      const operation = pathItem[methodKey];
      if (!operation) continue;

      const {
        tags = [],
        operationId,
        security,
        responses,
        parameters,
        requestBody
      } = operation;
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

      if (!controllerImportsPerController[controllerName]) {
        controllerImportsPerController[controllerName] = [];
      }

      const capitalizedOperationId = capitalizeFirstCharacter(operationId);
      let parametersName: string | undefined;
      let errorsName: string | undefined;
      let responseName: string | undefined;

      if (parameters || requestBody) {
        parametersName = `${capitalizedOperationId}Parameters`;
      }

      if (responses) {
        const keys = Object.keys(responses);
        const errorStatuses = keys.map(Number).filter((num) => num >= 400);

        if (errorStatuses.length > 0) {
          errorsName = `${capitalizedOperationId}Errors`;
        }

        if (keys.length > errorStatuses.length) {
          responseName = `${capitalizedOperationId}Response`;
        }
      }

      controllerToOperationsRecord[controllerName].push({
        operationId,
        parametersName,
        errors: errorsName,
        response: responseName,
        responseSuccessStatus: Number(
          Object.keys(responses).find(
            (status) => Number(status) >= 200 && Number(status) < 300
          )
        )
      });

      if (parametersName) {
        parametersImportsPerController[controllerName].push(parametersName);
        controllerImportsPerController[controllerName].push(parametersName);
      }

      if (errorsName)
        controllerImportsPerController[controllerName].push(errorsName);
      if (responseName)
        controllerImportsPerController[controllerName].push(responseName);

      const middlewares: string[] = [
        generateRouteMiddleware({
          controllerName,
          operationId,
          parametersName
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
      rootOutputFolder,
      `controllers/${controllerKey}.ts`
    );
    const controllers = controllerToOperationsRecord[controllerKey];

    await createOrDuplicateFile({
      filePath: pathToController,
      fileContent: generateTemplateController({
        controllerName: controllerKey,
        controllers,
        imports: controllerImportsPerController[controllerKey]
      }),
      isRegenerateNonStubs
    });
  }

  // Output security schemes.
  if (document.components?.securitySchemes) {
    await fs.writeFile(
      path.join(lockedGeneratedFilesFolder, 'security-schemes.ts'),
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

  await fs.writeFile(
    path.join(lockedGeneratedFilesFolder, 'server.ts'),
    template,
    'utf-8'
  );

  // Replace z.instanceof(File) (if any).
  const distClientPath = path.join(lockedGeneratedFilesFolder, 'client.ts');
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

async function createOrDuplicateFile({
  filePath,
  isRegenerateNonStubs,
  fileContent
}: {
  filePath: string;
  isRegenerateNonStubs: boolean;
  fileContent: string;
}) {
  let isControllerExist = false;

  try {
    await fs.stat(filePath);
    // If it doesn't throw, then it exists.
    isControllerExist = true;
  } catch (err) {
    // It doesn't exist, so we need to create it first.
    await fs.mkdir(path.dirname(filePath), { recursive: true });
  }

  if (isControllerExist && !isRegenerateNonStubs) {
    return;
  }

  // TODO: improve this so that we could append/delete as needed, instead of
  // having to move the old one to *.old.ts.
  if (isControllerExist) {
    await fs.rename(filePath, filePath.replace('.ts', '.old.ts'));
  }

  return fs.writeFile(filePath, fileContent, 'utf-8');
}
