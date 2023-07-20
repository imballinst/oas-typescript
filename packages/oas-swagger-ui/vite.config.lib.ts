import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';

const packageJSONContent = fs.readFileSync(
  path.join(process.cwd(), 'package.json'),
  'utf-8'
);
const packageJSON = JSON.parse(packageJSONContent);
const { dependencies, peerDependencies } = packageJSON;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({ insertTypesEntry: true, tsconfigPath: 'tsconfig.lib.json' })
  ],
  build: {
    copyPublicDir: false,
    outDir: 'lib',
    lib: {
      entry: path.join(process.cwd(), 'src/library/main-lib.tsx'),
      fileName: 'oas-swagger-ui',
      formats: ['es', 'cjs']
    },
    rollupOptions: {
      external: Object.keys(dependencies).concat(Object.keys(peerDependencies))
    }
  }
});
