import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // ...
    globalSetup: ['scripts/tests/vitest.setup.ts']
  }
});
