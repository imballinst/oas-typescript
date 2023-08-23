import { build } from 'esbuild';
import path from 'path';
import { nodeExternalsPlugin } from 'esbuild-node-externals';

async function main() {
  await build({
    bundle: true,
    format: 'esm',
    entryPoints: [path.join(process.cwd(), 'src/index.ts')],
    platform: 'node',
    outfile: path.join(process.cwd(), 'cli.js'),
    plugins: [nodeExternalsPlugin()]
  });
}

main();
