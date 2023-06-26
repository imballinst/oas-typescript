#!/usr/bin/env node
import { OpenAPIV3 } from 'openapi-types';
import meow from 'meow';
import fs from 'fs/promises';
import path from 'path';

const cli = meow(
  `
	Usage
	  $ openapi-to-koa <path-to-openapi-json>

	Options
	  --output, -o  Specify a place for output, default to (pwd)/generated

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
  let output = path.join(process.cwd(), 'generated');

  if (cliOutput) {
    output = path.isAbsolute(cliOutput)
      ? cliOutput
      : path.join(process.cwd(), cliOutput);
  }

  // Start the process.
  const document: OpenAPIV3.Document = JSON.parse(
    await fs.readFile(input, 'utf-8')
  );
  console.info(document);

  // Generate the definitions only.
  const paths = document.paths || {};
  const pathsByTag: any = {};
  const methods = ['get', 'post', 'put', 'delete', 'patch'] as const;

  for (const key in paths) {
    const path = paths[key];
    if (!path) continue;

    for (const methodKey of methods) {
      const pathMethod = path[methodKey];
      if (!pathMethod) continue;

      const { tags } = pathMethod;
      if (!tags) continue;

      if (!pathsByTag[tags[0]]) {
        pathsByTag[tags[0]] = [];
      }

      const pathByTag = {
        method: methodKey,
        path: key,
        operationId: pathMethod.operationId || '',
        parameters: pathMethod.parameters || [],
        responses: pathMethod.responses
      };
    }
  }
}

main();
