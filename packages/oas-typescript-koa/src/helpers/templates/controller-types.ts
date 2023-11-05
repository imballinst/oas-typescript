import { OperationInfo } from './types';

export function generateTemplateControllerTypes({
  imports,
  operations
}: {
  imports: string[];
  operations: OperationInfo[];
}) {
  const renderedOperations: string[] = [];

  for (const operation of operations) {
    renderedOperations.push(
      `
export type ${operation.functionType} = (params: ParsedRequestInfo<typeof ${operation.parametersName}>) => ControllerReturnType<{
  success: ${operation.responseType.success};
  error: ${operation.responseType.error}
}> 
      `.trim()
    );
  }

  return `
import {
  ${imports.join(',\n  ')}
} from '../client.js'
import { ParsedRequestInfo } from '../utils.js'
import { ControllerReturnType, ErrorStatuses } from '../types.js'

${renderedOperations.join('\n\n')}`.trim();
}

export function stringifyControllerReturnTypeGenericType(obj: object) {
  return JSON.stringify(obj, null, 2)
    .replace(/"status": "([\w\d]+)"/g, (_, statusGroupMatch) => {
      let value = statusGroupMatch;
      if (statusGroupMatch === 'default') {
        value = `"${value}"`;
      }

      return `"status": ${value}`;
    })
    .replace(/"schema": "([\w\d\[\]\(\).']+)"/g, '"schema": $1');
}
