#!/usr/bin/env node
import { OpenAPIV3 } from 'openapi-types';
import { tmpdir } from 'os';
import { generateZodClientFromOpenAPI } from 'openapi-zod-client';
import meow from 'meow';
import fs from 'fs/promises';
import path from 'path';
import { execSync } from 'child_process';

import { defaultHandlebars, defaultQueryUtils } from './templates.js';
import { handlebarsInstance } from './helpers/handlebars.js';
import { GLOBAL_VARS } from './global-vars.js';

const cli = meow(
  `
	Usage
	  $ openapi-to-axios generate <path-to-openapi-json>

	Options
	  --output, -o                  Specify a place for output, defaults to (pwd)/generated.
	  --headers, -h                 When this flag is set, response will be in the form of AxiosResponse.

	Examples
	  $ openapi-to-axios generate ./openapi/api.json --output src/generated
	  $ openapi-to-axios generate ./openapi/api.json --output src/generated --headers
`,
  {
    importMeta: import.meta,

    flags: {
      output: {
        type: 'string',
        shortFlag: 'o'
      },
      headers: {
        type: 'boolean',
        shortFlag: 'h'
      }
    }
  }
);
const DEFAULT_OUTPUT = path.join(process.cwd(), 'generated');
const VALID_COMMANDS = ['generate'];
const REQUEST_CONTENT_TYPE_PRIORITY = [
  'application/json',
  'application/x-www-form-urlencoded',
  'multipart/form-data',
  'application/octet-stream'
];
const METHOD_WITH_REQUEST_BODY = ['post', 'put', 'patch'];

async function main() {
  const [command, cliInput] = cli.input;
  if (!cliInput || !VALID_COMMANDS.includes(command)) {
    cli.showHelp();
    return;
  }

  const input = path.isAbsolute(cliInput)
    ? cliInput
    : path.join(process.cwd(), cliInput);

  const { output: cliOutput, headers: isWithHeaders = false } = cli.flags;

  // Set global flags.
  GLOBAL_VARS.IS_WITH_HEADERS = isWithHeaders;

  const rootOutputFolder =
    cliOutput && path.isAbsolute(cliOutput)
      ? cliOutput
      : path.join(process.cwd(), cliOutput || DEFAULT_OUTPUT);
  const lockedGeneratedFilesFolder = path.join(rootOutputFolder, 'generated');
  const generatedUtilsFolder = path.join(lockedGeneratedFilesFolder, 'utils');

  // Copy the utility and the middleware helpers.
  const tmpFolder = path.join(tmpdir(), '@oast');
  const handlebarsFilePath = path.join(tmpFolder, 'axios/default.hbs');

  const queryUtilsFilePath = path.join(generatedUtilsFolder, 'query.ts');

  // Create the files in these folders.
  await fs.rm(lockedGeneratedFilesFolder, { force: true, recursive: true });
  await fs.mkdir(lockedGeneratedFilesFolder, { recursive: true });

  await Promise.all([
    fs.mkdir(path.dirname(handlebarsFilePath), { recursive: true }),
    fs.mkdir(generatedUtilsFolder, { recursive: true })
  ]);

  await Promise.all([
    fs.writeFile(handlebarsFilePath, defaultHandlebars, 'utf-8'),
    fs.writeFile(queryUtilsFilePath, defaultQueryUtils, 'utf-8')
  ]);

  // Start the process.
  const document: OpenAPIV3.Document = JSON.parse(
    await fs.readFile(input, 'utf-8')
  );

  await generateZodClientFromOpenAPI({
    openApiDoc: document as any,
    distPath: lockedGeneratedFilesFolder,
    templatePath: handlebarsFilePath,
    handlebars: handlebarsInstance,
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

  // Hijack the prettier because we want to use the prettier from the current node_modules rather than to install a new one.
  execSync(`yarn prettier ${cliOutput} --write`);
}

main();
