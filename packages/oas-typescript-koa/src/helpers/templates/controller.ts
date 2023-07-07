import { ControllerInfo } from './types';

export function generateTemplateController({
  parametersImportsPerController,
  controllerKey,
  controllers
}: {
  parametersImportsPerController: Record<string, string[]>;
  controllerKey: string;
  controllers: ControllerInfo[];
}) {
  return `
import { 
  ${parametersImportsPerController[controllerKey].join(',\n  ')}
} from '../generated/client.js'
import { ParsedRequestInfo } from '../generated/utils.js';

export class ${controllerKey} {
${controllers.map((c) => renderControllerMethod(c)).join('\n  ')}
}  
  `.trim();
}

// Local helper functions.
function renderControllerMethod(controller: {
  parameterName: string;
  operationId: string;
}) {
  return `
static async ${controller.operationId}(params: ParsedRequestInfo<typeof ${controller.parameterName}>) {
  return {
    body: undefined,
    status: 200
  }
}
  `.trim();
}
