#!/usr/bin/env node
import { tmpdir } from 'os';
import { generateZodClientFromOpenAPI } from 'openapi-zod-client';
import fs from 'fs/promises';
import path from 'path';
import { createRequire } from 'node:module';
import { execSync } from 'child_process';
import OpenAPIParser from '@readme/openapi-parser';

import {
  createOrDuplicateFile,
  createCli,
  generateHelpText,
  HelpTextEntry
} from '@oas-typescript/shared-cli';

import {
  defaultHandlebars,
  securityMiddlewareHelpersTs,
  typesTs
} from './templates.js';
import { generateTemplateController } from './helpers/templates/controller.js';
import { generateTemplateControllerTypes } from './helpers/templates/controller-types.js';
import {
  GenerateRouteMiddlewareType,
  GenerateSecurityMiddlewareInvocationType,
  parsePaths
} from './core/paths-parser.js';
import { convertOpenAPIHeadersToResponseSchemaHeaders } from './core/header-parser.js';

import { updateImportBasedOnModule } from './helpers/import-module.js';
import { getHandlebarsInstance } from './core/handlebars.js';
import { OperationInfo } from './helpers/templates/types.js';
import { OpenAPIV3 } from 'openapi-types';

const DEFAULT_SECURITY_REQUIREMENTS_FIELD = 'security';
const DEFAULT_SECURITY_SCHEMES_FIELD = 'securitySchemes';
const VALID_COMMANDS = ['generate'];

const require = createRequire(import.meta.url);

export type * from './types.js';
export type { GenerateRouteMiddlewareType };

export async function generateRestServerStubs({
  usageText,
  commandsRecord,
  templates: { routeMiddlewareHelpersTs },
  templateFunctions: {
    router: generateRouter,
    routerMiddlewares: generateRouterMiddlewares,
    securityMiddlewareInvocation: generateSecurityMiddlewareInvocation
  }
}: {
  usageText: string;
  commandsRecord: Record<string, HelpTextEntry>;
  templates: {
    routeMiddlewareHelpersTs: string;
  };
  templateFunctions: {
    router: (param: {
      allServerSecurityImports: string[];
      parametersImportsPerController: Record<string, string[]>;
      controllerToOperationsRecord: Record<string, OperationInfo[]>;
      routers: string[];
      isRequireFileUploads: boolean;
    }) => string;
    routerMiddlewares: GenerateRouteMiddlewareType;
    securityMiddlewareInvocation: GenerateSecurityMiddlewareInvocationType;
  };
}) {
  const defaultOutput = path.join(process.cwd(), 'oas-typescript');
  const { examplesText, optionsText } = generateHelpText({ commandsRecord });

  const cli = createCli({
    usageText,
    examplesText,
    optionsText,
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
  });

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
      : path.join(process.cwd(), cliOutput || defaultOutput);
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
      updateImportBasedOnModule(routeMiddlewareHelpersTs, cliTargetModule),
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
        securityMiddlewareHelpersTs,
        cliTargetModule
      ),
      previousChecksum: previousChecksum['middleware-helpers.ts']
    })
  ]);

  nextChecksum['middleware-helpers.ts'] = middlewareHelpersChecksum;

  // Start the process.
  const document = (await OpenAPIParser.bundle(input)) as OpenAPIV3.Document;
  const dereferenced = (await OpenAPIParser.dereference(
    JSON.parse(JSON.stringify(document))
  )) as OpenAPIV3.Document;

  // Parse paths and security schemes.
  const {
    routers,
    controllerToOperationsRecord,
    parametersImportsPerController,
    controllerImportsPerController,
    allServerSecurityImports,
    isRequireFileUploads
  } = parsePaths({
    paths: dereferenced.paths,
    templateFunctions: {
      middlewares: generateRouterMiddlewares,
      securityMiddlewareInvocation: generateSecurityMiddlewareInvocation
    }
  });
  const securitySchemes =
    (document.components as any)?.[cliAppSecuritySchemesField] || {};

  const handlebars = getHandlebarsInstance(securitySchemes);

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

        const maybeRequestBodyObject = operation.requestBody as
          | OpenAPIV3.RequestBodyObject
          | undefined;
        if (maybeRequestBodyObject) {
          for (const mimeType in maybeRequestBodyObject.content) {
            if (mimeType === 'application/octet-stream') {
              const schema = maybeRequestBodyObject.content[mimeType].schema;
              if (!schema) continue;

              const maybeReferenceObject = schema as OpenAPIV3.ReferenceObject;
              if (maybeReferenceObject.$ref) continue;

              const matchingParameter = newDefinition.parameters.find(
                (parameter: any) => parameter.name === 'body'
              );
              if (matchingParameter) {
                const requestBodySchema = schema as OpenAPIV3.SchemaObject;
                matchingParameter.formData = `z.object({ "${
                  (requestBodySchema as any)['x-field-name']
                }": z.${requestBodySchema.type}() }), isFormData: true`;
              }

              continue;
            }

            if (mimeType === 'multipart/form-data') {
              const schema = maybeRequestBodyObject.content[mimeType].schema;
              if (!schema) continue;

              const maybeReferenceObject = schema as OpenAPIV3.ReferenceObject;
              if (maybeReferenceObject.$ref) continue;

              const matchingParameter = newDefinition.parameters.find(
                (parameter: any) => parameter.name === 'body'
              );
              if (matchingParameter) {
                matchingParameter.formData = `${matchingParameter.schema}, isFormData: true`;
              }

              continue;
            }
          }
        }

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
      fileContent: updateImportBasedOnModule(
        generateTemplateController({
          controllerName: controllerKey,
          operations
        }),
        cliTargetModule
      ),
      previousChecksum: previousChecksum[checksumKey]
    });
    nextChecksum[checksumKey] = fileChecksum;
  }

  const renderedRouter = generateRouter({
    allServerSecurityImports,
    controllerToOperationsRecord,
    parametersImportsPerController,
    routers,
    isRequireFileUploads
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
  try {
    const prettierPath = require.resolve('prettier');
    const prettierCliPath = path.join(
      path.dirname(prettierPath),
      'bin/prettier.cjs'
    );

    execSync(`node ${prettierCliPath} ${cliOutput} --write`);
  } catch (err) {
    // No-op.
  }
}
