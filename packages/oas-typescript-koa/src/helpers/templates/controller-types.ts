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

    const controllerReturnTypeGenericTypes: Array<number | string> = [
      `typeof ${operation.response || 'z.void()'}`,
      errorStatuses,
      operation.responseSuccessStatus
    ];

    if (operation.responseHeaders) {
      const entries = Object.entries(operation.responseHeaders);
      const mappedEntries = entries.map(([k, v]) => `"${k}": ${v}`).join('; ');
      controllerReturnTypeGenericTypes.push(`{ ${mappedEntries} }`);
    }

    renderedOperations.push(
      `
export type ${operation.functionType} = (params: ParsedRequestInfo<typeof ${
        operation.parametersName
      }>) => ControllerReturnType<
  ${controllerReturnTypeGenericTypes.join(',\n  ')}
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
