import { OperationInfo } from './types';

export function generateTemplateControllerTypes({
  imports,
  operations
}: {
  imports: string[];
  operations: OperationInfo[];
}) {
  return `
import { z } from 'zod'

import {
  ${imports.join(',\t')}
} from '../client.js'
import { ParsedRequestInfo } from '../utils.js'
import { ControllerReturnType, ErrorStatuses } from '../types.js'

${operations
  .map((operation) =>
    `
export type ${operation.functionType} = (params: ParsedRequestInfo<typeof ${
      operation.parametersName
    }>) => ControllerReturnType<
  typeof ${operation.response || 'z.void()'},
  ErrorStatuses<typeof ${operation.errors}>,
  ${operation.responseSuccessStatus}
> 
  `.trim()
  )
  .join('\n\n')}`;
}
