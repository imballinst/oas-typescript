import { describe, expect, test } from 'vitest';
import { updateImportBasedOnModule } from './import-module';

describe('updateImportBasedOnModule', () => {
  const ORIGINAL = `
import http from 'http'
import hello from './hello.js'
import { world } from './world.js'
  `.trim();

  test('invalid module (not likely)', () => {
    expect(() => updateImportBasedOnModule(ORIGINAL, 'randomthing')).toThrow();
  });

  test('same esm module: do nothing', () => {
    expect(updateImportBasedOnModule(ORIGINAL, 'esm')).toBe(ORIGINAL);
  });

  test('cjs module: transform', () => {
    expect(updateImportBasedOnModule(ORIGINAL, 'cjs')).toBe(
      `
import http from 'http'
import hello from './hello'
import { world } from './world'
    `.trim()
    );
  });
});
