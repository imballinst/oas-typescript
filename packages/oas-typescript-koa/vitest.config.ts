import { defineConfig } from 'vitest/config';

const isRunOnSrcOnly = process.argv[process.argv.length - 1] === 'src';

export default defineConfig({
  test: {
    globalSetup: isRunOnSrcOnly ? [] : ['scripts/tests/vitest.setup.ts']
  }
});
