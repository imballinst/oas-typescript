import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'lib',
    lib: {
      entry: path.join(process.cwd(), 'src/main-lib.tsx'),
      fileName: 'oas-swagger-ui',
      formats: ['es', 'cjs']
    }
  }
});
