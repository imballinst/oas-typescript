#!/usr/bin/env node
import { OpenAPIV3 } from 'openapi-types';
import { parse as parseYAML } from 'yaml';
import { tmpdir } from 'os';
import { generateZodClientFromOpenAPI } from 'openapi-zod-client';
import fs from 'fs/promises';
import path from 'path';
import { createRequire } from 'node:module';
import { execSync } from 'child_process';
import { createCli, generateHelpText } from '@oas-typescript/shared-cli';

import { defaultHandlebars, defaultQueryUtils } from './templates.js';
import { getHandlebarsInstance } from './helpers/handlebars.js';

import commandsRecord from './constants/help-text.json';

const DEFAULT_OUTPUT = path.join(process.cwd(), 'generated');
const VALID_COMMANDS = ['generate'];
const REQUEST_CONTENT_TYPE_PRIORITY = [
  'application/json',
  'application/x-www-form-urlencoded',
  'multipart/form-data',
  'application/octet-stream'
];
const METHOD_WITH_REQUEST_BODY = ['post', 'put', 'patch'];

const require = createRequire(import.meta.url);

async function main() {
  const { examplesText, optionsText } = generateHelpText({ commandsRecord });
  const cli = createCli({
    usageText: 'openapi-to-axios generate <path-to-openapi-json>',
    examplesText,
    optionsText,
    flags: {
      output: {
        type: 'string',
        shortFlag: 'o'
      },
      headers: {
        type: 'boolean'
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

  const { output: cliOutput, headers: isWithHeaders = false } = cli.flags;

  const rootOutputFolder =
    cliOutput && path.isAbsolute(cliOutput)
      ? cliOutput
      : path.join(process.cwd(), cliOutput || DEFAULT_OUTPUT);
  const generatedUtilsFolder = path.join(rootOutputFolder, 'utils');

  // Copy the utility and the middleware helpers.
  const tmpFolder = path.join(tmpdir(), '@oast');
  const handlebarsFilePath = path.join(tmpFolder, 'axios/default.hbs');

  const queryUtilsFilePath = path.join(generatedUtilsFolder, 'query.ts');

  // Create the files in these folders.
  await fs.rm(rootOutputFolder, { force: true, recursive: true });
  await fs.mkdir(rootOutputFolder, { recursive: true });

  await Promise.all([
    fs.mkdir(path.dirname(handlebarsFilePath), { recursive: true }),
    fs.mkdir(generatedUtilsFolder, { recursive: true })
  ]);

  await Promise.all([
    fs.writeFile(handlebarsFilePath, defaultHandlebars, 'utf-8'),
    fs.writeFile(queryUtilsFilePath, defaultQueryUtils, 'utf-8')
  ]);

  // Start the process.
  const fileContent = await fs.readFile(input, 'utf-8');
  const document: OpenAPIV3.Document =
    path.extname(input) === '.json'
      ? JSON.parse(fileContent)
      : parseYAML(fileContent);

  await generateZodClientFromOpenAPI({
    openApiDoc: document as any,
    distPath: rootOutputFolder,
    templatePath: handlebarsFilePath,
    handlebars: getHandlebarsInstance({ isWithHeaders }),
    options: {
      groupStrategy: 'tag-file',
      endpointDefinitionRefiner: (defaultDefinition, operation) => {
        const newDefinition = defaultDefinition as any;
        newDefinition.operationId = operation.operationId;

        if (METHOD_WITH_REQUEST_BODY.includes(defaultDefinition.method)) {
          const requestBody = operation.requestBody as
            | OpenAPIV3.RequestBodyObject
            | undefined;

          if (requestBody) {
            for (const contentType of REQUEST_CONTENT_TYPE_PRIORITY) {
              if (requestBody.content[contentType]) {
                newDefinition.requestBodyContentType = contentType;
                break;
              }
            }

            if (!newDefinition.requestBodyContentType) {
              newDefinition.requestBodyContentType =
                REQUEST_CONTENT_TYPE_PRIORITY[0];
            }
          }
        }

        return newDefinition;
      }
    }
  });

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

main();
