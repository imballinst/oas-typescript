import { expect, test } from 'vitest';
import { generateTemplateControllerTypes } from './controller-types';

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
      imports: ['SayHelloParameters', 'Message'],
      operations: [
        {
          functionType: 'SayHelloFunction',
          operationId: 'SayHello',
          parametersName: 'SayHelloParameters',
          response
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
import { ControllerReturnTypeParser, ErrorStatuses } from '../types.js'

export type SayHelloFunction = (params: ParsedRequestInfo<typeof SayHelloParameters>) => ControllerReturnTypeParser<${JSON.stringify(
      response,
      null,
      2
    )}>
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
      imports: ['SayHelloParameters', 'Message'],
      operations: [
        {
          functionType: 'SayHelloFunction',
          operationId: 'SayHello',
          parametersName: 'SayHelloParameters',
          response
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
import { ControllerReturnTypeParser, ErrorStatuses } from '../types.js'

export type SayHelloFunction = (params: ParsedRequestInfo<typeof SayHelloParameters>) => ControllerReturnTypeParser<${JSON.stringify(
      response,
      null,
      2
    )}>
  `.trim()
  );
});

test('generateTemplateControllerTypes, with default response', () => {
  expect(
    generateTemplateControllerTypes({
      imports: ['SayHelloParameters', 'Message'],
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
import { ControllerReturnTypeParser, ErrorStatuses } from '../types.js'

export type SayHelloFunction = (params: ParsedRequestInfo<typeof SayHelloParameters>) => ControllerReturnTypeParser<{
  "success": {
    "status": 200,
    "schema": "Message"
  },
  "error": {
    "default": {
      "schema": "SayHelloErrors",
      "status": number
    }
  }
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
import { ControllerReturnTypeParser, ErrorStatuses } from '../types.js'

export type SayHelloFunction = (params: ParsedRequestInfo<typeof SayHelloParameters>) => ControllerReturnTypeParser<{
  "success": {
    "status": 200,
    "schema": "Message",
    "headers": {
      "x-rate-limit": {
        "schema": "string"
      }
    }
  },
  "error": {
    "default": {
      "schema": "SayHelloErrors",
      "status": number
    }
  }
}>
  `.trim()
  );
});
