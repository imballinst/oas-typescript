import { OperationInfo } from './types';

export function generateTemplateControllerTypes({
  imports,
  operations
}: {
  imports: string[];
  operations: OperationInfo[];
}) {
  const renderedOperations: string[] = [];
  let isRequireZodImport = false;

  for (const operation of operations) {
    let errorStatuses = `ErrorStatuses<typeof ${operation.errorType}>`;
    if (operation.hasDefaultResponseStatus) {
      errorStatuses += ` | number`;
    }

    renderedOperations.push(
      `
export type ${operation.functionType} = (params: ParsedRequestInfo<typeof ${
        operation.parametersName
      }>) => ControllerReturnType<
  typeof ${operation.response || 'z.void()'},
  ${errorStatuses},
  ${operation.responseSuccessStatus}
> 
      `.trim()
    );

    if (operation.response === undefined) {
      isRequireZodImport = true;
    }
  }

  return `
${isRequireZodImport ? `import { z } from 'zod'` : ''}

import {
  ${imports.join(',\n  ')}
} from '../client.js'
import { ParsedRequestInfo } from '../utils.js'
import { ControllerReturnType, ErrorStatuses } from '../types.js'

${renderedOperations.join('\n\n')}`.trim();
}
