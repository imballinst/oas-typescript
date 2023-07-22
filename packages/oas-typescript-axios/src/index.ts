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
import { execSync } from 'child_process';
import { createHash } from 'crypto';

import { capitalizeFirstCharacter } from './helpers/change-case.js';
import { defaultHandlebars } from './templates.js';

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

  // Copy the utility and the middleware helpers.
  const tmpFolder = path.join(tmpdir(), '@oast');
  const handlebarsFilePath = path.join(tmpFolder, 'koa/default.hbs');

  // Create the files in these folders.
  await fs.rm(lockedGeneratedFilesFolder, { force: true, recursive: true });
  await Promise.all([
    fs.mkdir(path.dirname(handlebarsFilePath), { recursive: true }),
    fs.mkdir(lockedGeneratedFilesFolder, { recursive: true })
  ]);

  await Promise.all([
    fs.writeFile(handlebarsFilePath, defaultHandlebars, 'utf-8')
  ]);

  // Start the process.
  const document: OpenAPIV3.Document = JSON.parse(
    await fs.readFile(input, 'utf-8')
  );

  const handlebars = getHandlebars();
  handlebars.registerHelper('capitalizeFirstLetter', function (options: any) {
    return capitalizeFirstCharacter(options.fn(this));
  });

  await generateZodClientFromOpenAPI({
    openApiDoc: document as any,
    distPath: lockedGeneratedFilesFolder,
    // distPath: path.join(lockedGeneratedFilesFolder, 'client.ts'),
    // templatePath: handlebarsFilePath,
    handlebars,
    options: {
      groupStrategy: 'tag-file'
    }
  });

  // Hijack the prettier because we want to use the prettier from the current node_modules rather than to install a new one.
  execSync(`yarn prettier ${cliOutput} --write`);
}

main();
