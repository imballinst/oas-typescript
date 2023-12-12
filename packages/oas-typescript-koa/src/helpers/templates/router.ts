import { OperationInfo } from './types';

export function generateTemplateRouter({
  allServerSecurityImports,
  controllerToOperationsRecord,
  routers,
  parametersImportsPerController,
  isRequireFileUploads
}: {
  allServerSecurityImports: string[];
  parametersImportsPerController: Record<string, string[]>;
  controllerToOperationsRecord: Record<string, OperationInfo[]>;
  routers: string[];
  isRequireFileUploads: boolean;
}) {
  return `
import Router from '@koa/router'
import bodyParser from '@koa/bodyparser';
${isRequireFileUploads ? `import multer from '@koa/multer'` : ''}\n
import { 
  ${allServerSecurityImports
    .concat(Object.values(parametersImportsPerController).flat())
    .join(',\n  ')}
  } from './client.js'
import { KoaGeneratedUtils } from './utils.js'

${isRequireFileUploads ? `const upload = multer()` : ''}
  
${Object.keys(controllerToOperationsRecord)
  .map((c) => `import { ${c} } from '../controllers/${c}.js'`)
  .join('\n')}

const router = new Router()

${routers.join('\n\n')}

export const generatedRouter = router
  `.trim();
}
