#!/usr/bin/env node
import { OpenAPIV3 } from 'openapi-types';
import { tmpdir } from 'os';
import {
  generateZodClientFromOpenAPI,
  getHandlebars
} from 'openapi-zod-client';
import meow from 'meow';
import fs from 'fs/promises';
import path from 'path';
import { createRequire } from 'node:module';

import { createOrDuplicateFile } from '@oast/shared/utils/checksum.js';

import {
  defaultHandlebars,
  middlewareHelpersTs,
  utilsTs,
  typesTs
} from './templates.js';
import { generateTemplateController } from './helpers/templates/controller.js';
import { generateTemplateRouter } from './helpers/templates/router.js';
import {
  generateTemplateControllerTypes,
  stringifyControllerReturnTypeGenericType
} from './helpers/templates/controller-types.js';
import { capitalizeFirstCharacter } from './helpers/change-case.js';
import { parsePaths } from './core/paths-parser.js';
import { execSync } from 'child_process';

const cli = meow(
  `
	Usage
	  $ openapi-to-koa generate <path-to-openapi-json>

	Options
	  --output, -o                  Specify a place for output, defaults to (pwd)/generated.
	  --app-security-field, -a      Specify the custom security field used in the backend application.
                                  Mostly useful when you have role names in the application, in which
                                  these roles are required to do the operation. You might not need this
                                  parameter if you are using OpenAPI Specification v3.1.0. Reference:
                                  https://spec.openapis.org/oas/v3.1.0#patterned-fields-2.

	Examples
	  $ openapi-to-koa generate ./openapi/api.json --output src/generated
	  $ openapi-to-koa generate ./openapi/api.json --output src/generated --app-security-field x-security
`,
  {
    importMeta: import.meta,

    flags: {
      output: {
        type: 'string',
        shortFlag: 'o'
      },
      appSecurityField: {
        type: 'string',
        shortFlag: 'a'
      }
    }
  }
);
const DEFAULT_OUTPUT = path.join(process.cwd(), 'generated');
const DEFAULT_SECURITY_FIELD = 'security';
const VALID_COMMANDS = ['generate'];

const require = createRequire(import.meta.url);

async function main() {
  const [command, cliInput] = cli.input;
  if (!cliInput || !VALID_COMMANDS.includes(command)) {
    cli.showHelp();
    return;
  }

  const input = path.isAbsolute(cliInput)
    ? cliInput
    : path.join(process.cwd(), cliInput);

  const {
    output: cliOutput,
    appSecurityField: cliAppSecurityField = DEFAULT_SECURITY_FIELD
  } = cli.flags;

  const rootOutputFolder =
    cliOutput && path.isAbsolute(cliOutput)
      ? cliOutput
      : path.join(process.cwd(), cliOutput || DEFAULT_OUTPUT);
  const lockedGeneratedFilesFolder = path.join(rootOutputFolder, 'static');

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
  handlebars.registerHelper('capitalizeFirstLetter', function (...args: any[]) {
    // Last argument is an object.
    const [firstWord, ...rest] = args.slice(0, -1);
    return capitalizeFirstCharacter(firstWord) + rest.join('');
  });
  handlebars.registerHelper('interfaceFromZod', function (...args: any[]) {
    // Last argument is an object.
    const [firstWord, ...rest] = args.slice(0, -1);
    const interfaceName = capitalizeFirstCharacter(firstWord) + rest.join('');
    return `export type ${interfaceName} = typeof ${interfaceName}`;
  });
  handlebars.registerHelper('interfaceFromObject', function (...args: any[]) {
    // Last argument is an object.
    const [firstWord, ...rest] = args.slice(0, -1);
    const interfaceName = capitalizeFirstCharacter(firstWord) + rest.join('');
    return `export type ${interfaceName} = typeof ${interfaceName}`;
  });

  // Generate the definitions only.
  const {
    routers,
    operationIdToResponseSchemaRecord,
    controllerToOperationsRecord,
    parametersImportsPerController,
    controllerImportsPerController,
    allServerSecurityImports
  } = parsePaths({ paths: document.paths });

  await generateZodClientFromOpenAPI({
    openApiDoc: document as any,
    distPath: path.join(lockedGeneratedFilesFolder, 'client.ts'),
    templatePath: handlebarsFilePath,
    options: {
      endpointDefinitionRefiner: (defaultDefinition, operation) => {
        const newDefinition = defaultDefinition as any;

        if (cliAppSecurityField !== DEFAULT_SECURITY_FIELD) {
          // Force inject the security of the custom field.
          operation.security = operation[cliAppSecurityField as any];
        }

        if (!operation.operationId) {
          throw new Error('all operations need to have `operationId`');
        }

        const { success, error } =
          operationIdToResponseSchemaRecord[operation.operationId];

        newDefinition.responseSchema = {
          success: stringifyControllerReturnTypeGenericType(success),
          error: stringifyControllerReturnTypeGenericType(error || {})
        };
        newDefinition.operationId = operation.operationId;
        newDefinition.security = JSON.stringify(operation.security);

        return newDefinition;
      }
    },
    handlebars
  });

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
    path.join(lockedGeneratedFilesFolder, 'router.ts'),
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

  // Prettify output.
  const prettierPath = require.resolve('prettier');
  const prettierCliPath = path.join(
    path.dirname(prettierPath),
    'bin/prettier.cjs'
  );

  execSync(`node ${prettierCliPath} ${cliOutput} --write`);
}

main();
