import { OperationInfo, ResponseSchema } from './types';

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
    if (!operation.response) {
      throw new Error(
        `Operation ${operation.operationId} does not contain responses`
      );
    }

    if (operation.response.error?.default) {
      operation.response.error.default.status = 'number';
    }

    renderedOperations.push(
      `
export type ${operation.functionType} = (params: ParsedRequestInfo<typeof ${
        operation.parametersName
      }>) => ControllerReturnType<${stringifyControllerReturnTypeGenericType(
        operation.response
      )}> 
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

export function stringifyControllerReturnTypeGenericType(obj: object) {
  return JSON.stringify(obj, null, 2)
    .replace(/"status": "([\w\d]+)"/g, '"status": $1')
    .replace(/"schema": "([\w\d\[\]']+)"/g, '"schema": $1');
}
