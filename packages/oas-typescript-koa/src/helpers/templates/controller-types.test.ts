import { expect, test } from 'vitest';
import { generateTemplateControllerTypes } from './controller-types';

const IMPORTS = [
  'SayHelloParameters',
  'SayHelloResponse',
  'SayHelloErrors',
  'Message'
];

// Valid cases.
test('generateTemplateControllerTypes, without default response', () => {
  const response = {
    success: {
      status: 200,
      schema: 'Message'
    },
    error: {
      '400': {
        schema: 'SayHelloErrors',
        status: 400
      }
    }
  };

  expect(
    generateTemplateControllerTypes({
      imports: IMPORTS,
      operations: [
        {
          functionType: 'SayHelloFunction',
          operationId: 'SayHello',
          parametersName: 'SayHelloParameters',
          response,
          responseType: {
            success: 'SayHelloResponse',
            error: 'SayHelloErrors'
          }
        }
      ]
    })
  ).toEqual(
    `
import {
  SayHelloParameters,
  SayHelloResponse,
  SayHelloErrors,
  Message
} from '../client.js'
import { ParsedRequestInfo } from '../utils.js'
import { ControllerReturnType, ErrorStatuses } from '../types.js'

export type SayHelloFunction = (params: ParsedRequestInfo<typeof SayHelloParameters>) => ControllerReturnType<{
  success: SayHelloResponse;
  error: SayHelloErrors
}>
  `.trim()
  );
});

test('generateTemplateControllerTypes, with undefined response', () => {
  const response = {
    success: {
      status: 200
    }
  };

  expect(
    generateTemplateControllerTypes({
      imports: IMPORTS,
      operations: [
        {
          functionType: 'SayHelloFunction',
          operationId: 'SayHello',
          parametersName: 'SayHelloParameters',
          response,
          responseType: {
            success: 'SayHelloResponse',
            error: 'SayHelloErrors'
          }
        }
      ]
    })
  ).toEqual(
    `
import {
  SayHelloParameters,
  SayHelloResponse,
  SayHelloErrors,
  Message
} from '../client.js'
import { ParsedRequestInfo } from '../utils.js'
import { ControllerReturnType, ErrorStatuses } from '../types.js'

export type SayHelloFunction = (params: ParsedRequestInfo<typeof SayHelloParameters>) => ControllerReturnType<{
  success: SayHelloResponse;
  error: SayHelloErrors
}>
  `.trim()
  );
});

test('generateTemplateControllerTypes, with default response', () => {
  expect(
    generateTemplateControllerTypes({
      imports: IMPORTS,
      operations: [
        {
          functionType: 'SayHelloFunction',
          operationId: 'SayHello',
          parametersName: 'SayHelloParameters',
          response: {
            success: {
              status: 200,
              schema: 'Message'
            },
            error: {
              default: {
                schema: 'SayHelloErrors',
                status: 'number'
              }
            }
          },
          responseType: {
            success: 'SayHelloResponse',
            error: 'SayHelloErrors'
          }
        }
      ]
    })
  ).toEqual(
    `
import {
  SayHelloParameters,
  SayHelloResponse,
  SayHelloErrors,
  Message
} from '../client.js'
import { ParsedRequestInfo } from '../utils.js'
import { ControllerReturnType, ErrorStatuses } from '../types.js'

export type SayHelloFunction = (params: ParsedRequestInfo<typeof SayHelloParameters>) => ControllerReturnType<{
  success: SayHelloResponse;
  error: SayHelloErrors
}>
  `.trim()
  );
});

test('generateTemplateControllerTypes, with headers', () => {
  expect(
    generateTemplateControllerTypes({
      imports: ['SayHelloParameters', 'Message'],
      operations: [
        {
          functionType: 'SayHelloFunction',
          // hasDefaultResponseStatus: true,
          operationId: 'SayHello',
          // responseSuccessStatus: 200,
          // errorType: 'SayHelloErrors',
          parametersName: 'SayHelloParameters',
          response: {
            success: {
              status: 200,
              schema: 'Message',
              headers: {
                'x-rate-limit': {
                  schema: 'string'
                }
              }
            },
            error: {
              default: {
                schema: 'SayHelloErrors',
                status: 'default'
              }
            }
          },
          responseType: {
            success: 'SayHelloResponse',
            error: 'SayHelloErrors'
          }
        }
      ]
    })
  ).toEqual(
    `
import {
  SayHelloParameters,
  Message
} from '../client.js'
import { ParsedRequestInfo } from '../utils.js'
import { ControllerReturnType, ErrorStatuses } from '../types.js'

export type SayHelloFunction = (params: ParsedRequestInfo<typeof SayHelloParameters>) => ControllerReturnType<{
  success: SayHelloResponse;
  error: SayHelloErrors
}>
  `.trim()
  );
});
