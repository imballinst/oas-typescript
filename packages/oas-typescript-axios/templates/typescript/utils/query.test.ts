import { describe, expect, test } from 'vitest';
import { getQueryParameterString } from './query';

describe('getQueryParameterString', () => {
  test('all string', () => {
    const query = { hello: 'world', test: '123' };
    expect(getQueryParameterString(query)).toBe('?hello=world&test=123');
  });

  test('all number', () => {
    const query = { test: 123 };
    expect(getQueryParameterString(query)).toBe('?test=123');
  });

  test('all string array', () => {
    const query = { hello: ['world', '123'] };
    expect(getQueryParameterString(query)).toBe('?hello=world&hello=123');
  });

  test('mixed', () => {
    const query = { hello: ['world', '123'], test: 123, kek: 'wait' };
    expect(getQueryParameterString(query)).toBe(
      '?hello=world&hello=123&test=123&kek=wait'
    );
  });
});
