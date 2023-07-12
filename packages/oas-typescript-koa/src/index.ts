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
import { createHash } from 'crypto';

import {
  defaultHandlebars,
  middlewareHelpersTs,
  utilsTs,
  typesTs
} from './templates.js';
import { OperationInfo } from './helpers/templates/types.js';
import { generateRouteMiddleware } from './helpers/templates/middleware.js';
import { generateTemplateController } from './helpers/templates/controller.js';
import { generateTemplateRouter } from './helpers/templates/router.js';
import { generateTemplateControllerTypes } from './helpers/templates/controller-types.js';

const cli = meow(
  `
	Usage
	  $ openapi-to-koa <path-to-openapi-json>

	Options
	  --output, -o                  Specify a place for output, default to (pwd)/generated.

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

  const checksumFilePath = path.join(
    lockedGeneratedFilesFolder,
    'checksum.json'
  );
  let previousChecksum: Record<string, string> = {};
  let nextChecksum: Record<string, string> = {};
  try {
    const content = await fs.readFile(
      path.join(lockedGeneratedFilesFolder, 'checksum.json'),
      'utf-8'
    );
    previousChecksum = JSON.parse(content);
  } catch (err) {
    // No-op.
  }

  // Create the files in these folders.
  await Promise.all([
    fs.mkdir(path.dirname(handlebarsFilePath), { recursive: true }),
    fs.mkdir(tmpFolder, { recursive: true }),
    fs.mkdir(lockedGeneratedFilesFolder, { recursive: true })
  ]);
  const [, , , middlewareHelpersChecksum] = await Promise.all([
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
      previousChecksum: previousChecksum['middleware-helpers.ts']
    })
  ]);

  nextChecksum['middleware-helpers.ts'] = middlewareHelpersChecksum;

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
  const controllerToOperationsRecord: Record<string, OperationInfo[]> = {};
  const parametersImportsPerController: Record<string, string[]> = {};
  const controllerImportsPerController: Record<string, string[]> = {};
  const allServerSecurityImports: string[] = [];

  for (const pathKey in document.paths) {
    const pathItem = document.paths[pathKey];
    if (!pathItem) continue;

    for (const methodKey of methods) {
      const operation = pathItem[methodKey];
      if (!operation) continue;

      const { tags = [], operationId, security, responses } = operation;
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
      let parametersName = `${capitalizedOperationId}Parameters`;
      let errorsName = `${capitalizedOperationId}Errors`;
      let responseName = `${capitalizedOperationId}Response`;

      let responseSuccessStatus = Number(
        Object.keys(responses).find(
          (status) => Number(status) >= 200 && Number(status) < 300
        )
      );
      if (isNaN(responseSuccessStatus)) {
        throw new Error(
          `Invalid response of ${operationId}: should have 2xx response defined`
        );
      }

      controllerToOperationsRecord[controllerName].push({
        operationId,
        functionType: `${capitalizedOperationId}ControllerFunction`,
        parametersName,
        errors: errorsName,
        response: responseName,
        responseSuccessStatus
      });

      if (parametersName) {
        parametersImportsPerController[controllerName].push(parametersName);
        controllerImportsPerController[controllerName].push(parametersName);
      }

      controllerImportsPerController[controllerName].push(errorsName);
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
    const operations = controllerToOperationsRecord[controllerKey];

    const checksumKey = `controllers/${path.basename(controllerKey)}`;
    const fileChecksum = await createOrDuplicateFile({
      filePath: pathToController,
      fileContent: generateTemplateController({
        controllerName: controllerKey,
        operations
      }),
      previousChecksum: previousChecksum[checksumKey]
    });
    nextChecksum[checksumKey] = fileChecksum;
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

  await fs.mkdir(path.join(lockedGeneratedFilesFolder, 'controller-types'), {
    recursive: true
  });
  await Promise.all([
    ...Object.keys(controllerImportsPerController).map((key) =>
      fs.writeFile(
        path.join(
          lockedGeneratedFilesFolder,
          'controller-types',
          `${key}Types.ts`
        ),
        generateTemplateControllerTypes({
          imports: controllerImportsPerController[key],
          operations: controllerToOperationsRecord[key]
        }),
        'utf-8'
      )
    ),
    fs.writeFile(
      checksumFilePath,
      JSON.stringify(nextChecksum, null, 2),
      'utf-8'
    ),
    fs.writeFile(distClientPath, distClientContent, 'utf-8'),
    fs.rm(tmpFolder, { recursive: true, force: true })
  ]);

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
  previousChecksum,
  filePath,
  fileContent
}: {
  filePath: string;
  previousChecksum: string;
  fileContent: string;
}) {
  const currentChecksum = getChecksum(fileContent);
  let isControllerExist = false;
  let isChecksumSame = false;

  try {
    await fs.stat(filePath);
    // If it doesn't throw, then it exists.
    isControllerExist = true;
    isChecksumSame = previousChecksum === currentChecksum;
  } catch (err) {
    // It doesn't exist, so we need to create it first.
    await fs.mkdir(path.dirname(filePath), { recursive: true });
  }

  if (isControllerExist && isChecksumSame) {
    return currentChecksum;
  }

  // TODO: improve this so that we could append/delete as needed, instead of
  // having to move the old one to *.old.ts.
  if (isControllerExist) {
    await fs.rename(filePath, filePath.replace('.ts', '.old.ts'));
  }

  await fs.writeFile(filePath, fileContent, 'utf-8');
  return currentChecksum;
}

function getChecksum(str: string) {
  return createHash('md5').update(str).digest('hex');
}
