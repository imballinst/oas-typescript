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
import { execSync } from 'child_process';

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
import { convertOpenAPIHeadersToResponseSchemaHeaders } from './core/header-parser.js';
import { PrebuildResponseSchema } from './core/core-types.js';

import helpTextInfo from './constants/help-text.json';
import { updateImportBasedOnModule } from './helpers/import-module.js';

const options: Array<{ option: string; helpText: string }> = [];
const examples: string[] = [];
let maxOptionTextLength = -1;

for (const key in helpTextInfo) {
  const val = helpTextInfo[key as keyof typeof helpTextInfo];
  const aliases = [`--${key}`, ...val.aliases.map((alias) => `-${alias}`)].join(
    ', '
  );
  let helpText = val.helpText[0];

  if (val.defaultValue) {
    helpText += ` Defaults to ${val.defaultValue}.`;
  }

  options.push({
    option: aliases,
    helpText
  });
  examples.push(...val.examples);

  maxOptionTextLength = Math.max(maxOptionTextLength, aliases.length);
}

const optionsText = options
  .map(
    (item) =>
      `${item.option.padEnd(maxOptionTextLength, ' ')}  ${item.helpText}`
  )
  .join('\n    ');
const examplesText = examples
  .map((example) => `$ openapi-to-koa ${example}`)
  .join('\n    ');

const DEFAULT_OUTPUT = path.join(process.cwd(), 'oas-typescript');
const DEFAULT_SECURITY_REQUIREMENTS_FIELD = 'security';
const DEFAULT_SECURITY_SCHEMES_FIELD = 'securitySchemes';
const VALID_COMMANDS = ['generate'];

const cli = meow(
  `
  Usage
    $ openapi-to-koa generate <path-to-openapi-json> [...options]

  Options
    ${optionsText}

  Examples
    ${examplesText}

  For more information, visit https://imballinst.github.io/oas-typescript for documentation.
`,
  {
    importMeta: import.meta,

    flags: {
      // TODO: find a way to integrate the help text JSON with this.
      output: {
        type: 'string',
        shortFlag: 'o'
      },
      appSecuritySchemesField: {
        type: 'string',
        default: DEFAULT_SECURITY_SCHEMES_FIELD
      },
      appSecurityRequirementsField: {
        type: 'string',
        default: DEFAULT_SECURITY_REQUIREMENTS_FIELD
      },
      module: {
        type: 'string',
        choices: ['cjs', 'esm'],
        default: 'esm'
      }
    }
  }
);

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
    appSecurityRequirementsField: cliAppSecurityRequirements,
    appSecuritySchemesField: cliAppSecuritySchemesField,
    module: cliTargetModule
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
      updateImportBasedOnModule(utilsTs, cliTargetModule),
      'utf-8'
    ),
    fs.writeFile(
      path.join(lockedGeneratedFilesFolder, 'types.ts'),
      updateImportBasedOnModule(typesTs, cliTargetModule),
      'utf-8'
    ),
    createOrDuplicateFile({
      filePath: path.join(rootOutputFolder, 'middleware-helpers.ts'),
      fileContent: updateImportBasedOnModule(
        middlewareHelpersTs,
        cliTargetModule
      ),
      previousChecksum: previousChecksum['middleware-helpers.ts']
    })
  ]);

  nextChecksum['middleware-helpers.ts'] = middlewareHelpersChecksum;

  // Start the process.
  const document: OpenAPIV3.Document = JSON.parse(
    await fs.readFile(input, 'utf-8')
  );

  // Parse paths and security schemes.
  const {
    routers,
    controllerToOperationsRecord,
    parametersImportsPerController,
    controllerImportsPerController,
    allServerSecurityImports
  } = parsePaths({ paths: document.paths });
  const securitySchemes =
    (document.components as any)?.[cliAppSecuritySchemesField] || {};

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
  handlebars.registerHelper('extractResponses', function (...args: any[]) {
    // Last argument is an object.
    const [operationId, responses] = args.slice(0, -1);

    const successResponse: PrebuildResponseSchema['success'] = {
      schema: '',
      status: 0
    };
    const errorResponses: Record<string, PrebuildResponseSchema['error']> = {};
    const declarations: string[] = [];

    for (const response of responses) {
      if (response.statusCode < 400) {
        successResponse.schema = response.schema;
        successResponse.status = response.statusCode;
        successResponse.headers = response.headers;
      } else {
        errorResponses[response.statusCode] = {
          status: response.statusCode,
          schema: response.schema,
          headers: response.headers
        };
      }
    }

    // Render the response string.
    const responseVariableName = `${capitalizeFirstCharacter(
      operationId
    )}Response`;
    const inferred = `typeof ${responseVariableName}`;

    declarations.push(
      `export const ${responseVariableName} = ${stringifyControllerReturnTypeGenericType(
        successResponse
      )} as const`,
      successResponse.schema !== 'z.void()'
        ? `export type ${responseVariableName} = ${inferred}`
        : `export type ${responseVariableName} = ${inferred}`,
      ''
    );

    // Render the errors string.
    const errorsVariableName = `${capitalizeFirstCharacter(operationId)}Errors`;

    declarations.push(
      `export const ${errorsVariableName} = ${stringifyControllerReturnTypeGenericType(
        errorResponses
      )} as const`,
      `export type ${errorsVariableName} = typeof ${errorsVariableName}`,
      ''
    );

    return declarations.join('\n');
  });
  handlebars.registerHelper(
    'extractOperationSecurity',
    function (...args: any[]) {
      // Last argument is an object.
      const [operationId, securityArray] = args.slice(0, -1);
      const securityRecord: Record<string, any> = {};
      const titleCased = capitalizeFirstCharacter(operationId);

      for (const securityObject of securityArray) {
        const keyName = Object.keys(securityObject)[0];
        const meta = securitySchemes[keyName];

        if (meta) {
          securityRecord[keyName] = {
            meta,
            value: securityObject[keyName]
          };
        }
      }

      return `export const ${titleCased}Security = ${JSON.stringify(
        securityRecord,
        null,
        2
      ).replace(/\]/g, '] as string[]')} as const`;
    }
  );

  await generateZodClientFromOpenAPI({
    openApiDoc: document as any,
    distPath: path.join(lockedGeneratedFilesFolder, 'client.ts'),
    templatePath: handlebarsFilePath,
    options: {
      withAllResponses: true,
      endpointDefinitionRefiner: (defaultDefinition, operation) => {
        const newDefinition = defaultDefinition as any;

        if (
          cliAppSecurityRequirements !== DEFAULT_SECURITY_REQUIREMENTS_FIELD
        ) {
          // Force inject the security of the custom field.
          newDefinition.security = operation[cliAppSecurityRequirements as any];
        }

        if (!operation.operationId) {
          throw new Error('all operations need to have `operationId`');
        }

        newDefinition.operationId = operation.operationId;
        newDefinition.security = operation.security;

        for (const statusCode in operation.responses) {
          const response = operation.responses[statusCode];

          if (response.headers) {
            // Patch the headers from `responses` field.
            const matchingDefinition = newDefinition.responses.find(
              (item: any) => item.statusCode === statusCode
            );
            matchingDefinition.headers =
              convertOpenAPIHeadersToResponseSchemaHeaders({
                operationId: operation.operationId,
                responseHeaders: response.headers
              });
          }
        }

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

  const renderedRouter = generateTemplateRouter({
    allServerSecurityImports,
    controllerToOperationsRecord,
    parametersImportsPerController,
    routers
  });

  await fs.writeFile(
    path.join(lockedGeneratedFilesFolder, 'router.ts'),
    updateImportBasedOnModule(renderedRouter, cliTargetModule),
    'utf-8'
  );

  // Replace z.instanceof(File) (if any).
  const distClientPath = path.join(lockedGeneratedFilesFolder, 'client.ts');
  let distClientContent = await fs.readFile(distClientPath, 'utf-8');
  if (distClientContent.includes('z.instanceof(File)')) {
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
        updateImportBasedOnModule(
          generateTemplateControllerTypes({
            imports: controllerImportsPerController[key],
            operations: controllerToOperationsRecord[key]
          }),
          cliTargetModule
        ),
        'utf-8'
      )
    ),
    fs.writeFile(
      checksumFilePath,
      JSON.stringify(nextChecksum, null, 2),
      'utf-8'
    ),
    fs.writeFile(
      distClientPath,
      updateImportBasedOnModule(distClientContent, cliTargetModule),
      'utf-8'
    ),
    fs.rm(tmpFolder, { recursive: true, force: true })
  ]);

  if (securitySchemes) {
    const securitySchemesWithEmptyMeta: any = {};

    for (const key in securitySchemes) {
      securitySchemesWithEmptyMeta[key] = {
        meta: securitySchemes[key],
        value: []
      };
    }

    await fs.writeFile(
      path.join(lockedGeneratedFilesFolder, 'security-schemes.ts'),
      `
const securitySchemes = ${JSON.stringify(
        securitySchemesWithEmptyMeta,
        null,
        2
      ).replace(/\]/g, '] as string[]')} as const

export type SecuritySchemes = Partial<typeof securitySchemes>
      `.trim(),
      'utf-8'
    );
  }

  // Prettify output.
  const prettierPath = require.resolve('prettier');
  const prettierCliPath = path.join(
    path.dirname(prettierPath),
    'bin/prettier.cjs'
  );

  execSync(`node ${prettierCliPath} ${cliOutput} --write`);
}

main();
