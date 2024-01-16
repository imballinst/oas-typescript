import { describe, expect, test } from 'vitest';
import {
  getFinalUrlAndRequestConfig,
  getQueryParameterString
} from './request';

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

describe('getFinalUrlAndRequestConfig', () => {
  test('default axios request config', () => {
    expect(
      getFinalUrlAndRequestConfig({
        url: '/hello/world',
        method: 'get',
        defaultAxiosRequestConfig: {
          headers: {
            hello: 'world'
          }
        }
      })
    ).toStrictEqual({
      url: '/hello/world',
      config: {
        method: 'get',
        headers: {
          hello: 'world'
        }
      }
    });
  });

  test('default axios request config + axios request config', () => {
    expect(
      getFinalUrlAndRequestConfig({
        url: '/hello/world',
        method: 'get',
        defaultAxiosRequestConfig: {
          headers: {
            hello: 'world'
          }
        },
        axiosRequestConfig: {
          headers: {
            'x-auth': 'token123'
          }
        }
      })
    ).toStrictEqual({
      url: '/hello/world',
      config: {
        method: 'get',
        headers: {
          hello: 'world',
          'x-auth': 'token123'
        }
      }
    });
  });

  test('default axios request config + axios request config + request specific headers', () => {
    expect(
      getFinalUrlAndRequestConfig({
        url: '/hello/world',
        method: 'get',
        defaultAxiosRequestConfig: {
          headers: {
            hello: 'world'
          }
        },
        axiosRequestConfig: {
          headers: {
            'x-auth': 'token123'
          }
        },
        headers: {
          test: '123'
        }
      })
    ).toStrictEqual({
      url: '/hello/world',
      config: {
        method: 'get',
        headers: {
          hello: 'world',
          'x-auth': 'token123',
          test: '123'
        }
      }
    });
  });

  test('query parameters', () => {
    expect(
      getFinalUrlAndRequestConfig({
        url: '/hello/world',
        method: 'get',
        queryParameters: { hello: 'world' }
      })
    ).toStrictEqual({
      url: '/hello/world?hello=world',
      config: {
        headers: {},
        method: 'get'
      }
    });
  });
});
