import { build } from 'esbuild';
import path from 'path';

async function main() {
  await build({
    bundle: true,
    format: 'esm',
    entryPoints: [path.join(process.cwd(), 'generated/server.ts')],
    platform: 'node',
    outfile: path.join(process.cwd(), 'dist/server.js'),
    packages: 'external'
  });
}

main();
