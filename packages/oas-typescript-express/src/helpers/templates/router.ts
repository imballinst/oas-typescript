import { OperationInfo } from './types';

export function generateTemplateRouter({
  allServerSecurityImports,
  controllerToOperationsRecord,
  routers,
  parametersImportsPerController
}: {
  allServerSecurityImports: string[];
  parametersImportsPerController: Record<string, string[]>;
  controllerToOperationsRecord: Record<string, OperationInfo[]>;
  routers: string[];
}) {
  return `
import { Router } from 'express'
import { json as bodyParser } from 'body-parser';
import { 
  ${allServerSecurityImports
    .concat(Object.values(parametersImportsPerController).flat())
    .join(',\n  ')}
} from './client.js'
import { ExpressGeneratedUtils } from './utils.js'

${Object.keys(controllerToOperationsRecord)
  .map((c) => `import { ${c} } from '../controllers/${c}.js'`)
  .join('\n')}

const router: Router = Router()

${routers.join('\n\n')}

export const generatedRouter = router
  `.trim();
}
