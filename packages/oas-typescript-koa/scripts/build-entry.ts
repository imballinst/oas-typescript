import { build } from 'esbuild';
import path from 'path';

async function main() {
  await build({
    format: 'esm',
    entryPoints: [path.join(process.cwd(), 'src/index.ts')],
    platform: 'node',
    outfile: path.join(process.cwd(), 'cli.js')
    // external: ['node:*', 'path', 'node:path']
    // packages: 'external'
  });
}

main();
