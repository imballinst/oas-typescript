import { build } from 'esbuild';
import path from 'path';

async function main() {
  await build({
    bundle: true,
    format: 'esm',
    entryPoints: [path.join(process.cwd(), 'src/openapi-zod-client/entry.ts')],
    platform: 'node',
    outfile: path.join(
      process.cwd(),
      'src/openapi-zod-client/generated/entry.js'
    ),
    external: [
      '@apidevtools/swagger-parser',
      '@liuli-util/fs-extra',
      '@zodios/core',
      'axios',
      'cac',
      'handlebars',
      'openapi-types',
      'openapi3-ts',
      'pastable',
      'prettier',
      'tanu',
      'ts-pattern',
      'whence',
      'zod',
      'node:*',
      'path',
      'node:path'
    ]
  });
}

main();
