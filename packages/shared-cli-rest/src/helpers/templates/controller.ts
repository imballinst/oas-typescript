import { OperationInfo } from './types';

export function generateTemplateController({
  controllerName,
  operations
}: {
  controllerName: string;
  operations: OperationInfo[];
}) {
  return `
import {
  ${operations.map((op) => op.functionType).join(',\n  ')}
} from '../static/controller-types/${controllerName}Types.js'

export class ${controllerName} {
${operations.map((op) => renderControllerMethod(op)).join('\n  ')}
}  
  `.trim();
}

// Local helper functions.
function renderControllerMethod(controller: OperationInfo) {
  return `
static ${controller.operationId}: ${controller.functionType} = (params) => {
  return {
    body: undefined,
    status: undefined
  }
}
  `.trim();
}
