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

const cli = meow(
  `
	Usage
	  $ openapi-to-axios generate <path-to-openapi-json>

	Options
	  --output, -o                  Specify a place for output, defaults to (pwd)/generated.

	Examples
	  $ openapi-to-axios generate ./openapi/api.json --output src/generated
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
const DEFAULT_OUTPUT = path.join(process.cwd(), 'generated');
const VALID_COMMANDS = ['generate'];

async function main() {
  const [command, cliInput] = cli.input;
  if (!cliInput || !VALID_COMMANDS.includes(command)) {
    cli.showHelp();
    return;
  }

  const input = path.isAbsolute(cliInput)
    ? cliInput
    : path.join(process.cwd(), cliInput);

  const { output: cliOutput } = cli.flags;

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
        return newDefinition;
      }
    }
  });

  // Hijack the prettier because we want to use the prettier from the current node_modules rather than to install a new one.
  execSync(`yarn prettier ${cliOutput} --write`);
}

main();
