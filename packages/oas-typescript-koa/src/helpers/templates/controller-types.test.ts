import { expect, test } from 'vitest';
import { generateTemplateControllerTypes } from './controller-types';

// Valid cases.
test('generateTemplateControllerTypes, without default response', () => {
  expect(
    generateTemplateControllerTypes({
      imports: ['SayHelloParameters', 'Message'],
      operations: [
        {
          functionType: 'SayHelloFunction',
          hasDefaultResponseStatus: false,
          operationId: 'SayHello',
          responseSuccessStatus: 200,
          errorType: 'SayHelloErrors',
          parametersName: 'SayHelloParameters',
          response: 'Message'
        }
      ]
    })
  ).toEqual(
    `
import { z } from 'zod'

import {
  SayHelloParameters,
  Message
} from '../client.js'
import { ParsedRequestInfo } from '../utils.js'
import { ControllerReturnType, ErrorStatuses } from '../types.js'

export type SayHelloFunction = (params: ParsedRequestInfo<typeof SayHelloParameters>) => ControllerReturnType<
  typeof Message,
  ErrorStatuses<typeof SayHelloErrors>,
  200
>
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
          hasDefaultResponseStatus: true,
          operationId: 'SayHello',
          responseSuccessStatus: 200,
          errorType: 'SayHelloErrors',
          parametersName: 'SayHelloParameters',
          response: 'Message'
        }
      ]
    })
  ).toEqual(
    `
import { z } from 'zod'

import {
  SayHelloParameters,
  Message
} from '../client.js'
import { ParsedRequestInfo } from '../utils.js'
import { ControllerReturnType, ErrorStatuses } from '../types.js'

export type SayHelloFunction = (params: ParsedRequestInfo<typeof SayHelloParameters>) => ControllerReturnType<
  typeof Message,
  ErrorStatuses<typeof SayHelloErrors> | number,
  200
>
  `.trim()
  );
});
