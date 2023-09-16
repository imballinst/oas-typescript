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
    if (!operation.response) {
      throw new Error(
        `Operation ${operation.operationId} does not contain responses`
      );
    }

    renderedOperations.push(
      `
export type ${operation.functionType} = (params: ParsedRequestInfo<typeof ${
        operation.parametersName
      }>) => ControllerReturnTypeParser<${JSON.stringify(
        operation.response,
        null,
        2
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
import { ControllerReturnTypeParser, ErrorStatuses } from '../types.js'

${renderedOperations.join('\n\n')}`.trim();
}
