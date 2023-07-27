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
  const handlebarsFilePath = path.join(tmpFolder, 'axios/default.hbs');

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
  const operationParamsCache: Record<
    string,
    {
      paramsDeclaration: string;
      paramsName: string;
    }
  > = {};

  handlebars.registerHelper('capitalizeFirstLetter', function (context: any) {
    return capitalizeFirstCharacter(context);
  });
  handlebars.registerHelper(
    'processFunctionParameter',
    function (parameters: any) {
      if (operationParamsCache[this.operationId] !== undefined)
        return operationParamsCache[this.operationId];

      const result = constructFunctionParameterFromString(
        parameters,
        this.operationId
      );
      operationParamsCache[this.operationId] = result;

      return result.paramsDeclaration;
    }
  );
  handlebars.registerHelper(
    'getFunctionParameter',
    function (operationId: any) {
      const paramsName = operationParamsCache[operationId].paramsName;
      return paramsName ? `params: z.infer<typeof ${paramsName}>` : '';
    }
  );

  await generateZodClientFromOpenAPI({
    openApiDoc: document as any,
    distPath: lockedGeneratedFilesFolder,
    templatePath: handlebarsFilePath,
    handlebars,
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

// Helper functions.
function constructFunctionParameterFromString(
  parameters: any,
  operationId: string
) {
  const result = {
    paramsDeclaration: '',
    paramsName: ''
  };

  if (!parameters) return result;

  const fnParam: {
    params: Record<string, string>;
    query: Record<string, string>;
    body: string;
  } = {
    body: '',
    params: {},
    query: {}
  };

  for (const parameter of parameters) {
    switch (parameter.type) {
      case 'Body': {
        fnParam.body = parameter.schema;
        break;
      }
      case 'Path': {
        fnParam.params[parameter.name] = parameter.schema;
        break;
      }
      case 'Query': {
        fnParam.query[parameter.name] = parameter.schema;
        break;
      }
    }
  }

  let rendered = '';
  let renderedParams = Object.entries(fnParam.params)
    .map(([k, v]) => `${k}: ${v}`)
    .join('\n');
  let renderedQuery = Object.entries(fnParam.query)
    .map(([k, v]) => `${k}: ${v}`)
    .join(',\n');
  let renderedBody = fnParam.body;

  rendered += renderedParams ? `params: z.object({${renderedParams}}),` : '';
  rendered += renderedQuery ? `query: z.object({${renderedQuery}}),` : '';
  rendered += renderedBody ? `body: ${renderedBody}` : '';

  if (rendered) {
    const paramsName = `${capitalizeFirstCharacter(operationId)}Params`;
    result.paramsDeclaration = `const ${paramsName} = z.object({${rendered}});`;
    result.paramsName = paramsName;
  }

  return result;
}
