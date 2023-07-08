import { ControllerInfo } from './types';

export function generateTemplateController({
  imports,
  controllerName,
  controllers
}: {
  imports: string[];
  controllerName: string;
  controllers: ControllerInfo[];
}) {
  return `
import { 
  ${imports.join(',\n  ')}
} from '../generated/client.js'
import { ParsedRequestInfo } from '../generated/utils.js';
import { ControllerReturnType, ErrorStatuses } from '../generated/types.js';

export class ${controllerName} {
${controllers.map((c) => renderControllerMethod(c)).join('\n  ')}
}  
  `.trim();
}

// Local helper functions.
function renderControllerMethod(controller: ControllerInfo) {
  return `
static async ${controller.operationId}(params: ParsedRequestInfo<typeof ${controller.parametersName}>): Promise<
  ControllerReturnType<
    typeof ${controller.response},
    ErrorStatuses<typeof ${controller.errors}>,
    ${controller.responseSuccessStatus}
  >
> {
  return {
    data: undefined,
    status: ${controller.responseSuccessStatus}
  }
}
  `.trim();
}
