import { describe, expect, test } from 'vitest';
import { parseInput } from './input-parser';

describe('parseInput', () => {
  const expectedResult = { hello: 123, world: 'zzz' };

  test('JSON input', () => {
    expect(parseInput('input.json', JSON.stringify(expectedResult))).toEqual(
      expectedResult
    );
  });

  test('YAML input', () => {
    expect(
      parseInput(
        'input.yaml',
        `
hello: 123
world: zzz
    `
      )
    ).toEqual(expectedResult);
  });

  test('invalid input', () => {
    expect(() =>
      parseInput(
        'input.hello',
        `
hello: 123
world: zzz
    `
      )
    ).toThrow();
  });
});
