import { ControllerInfo } from './types';

export function generateTemplateRouter({
  allServerSecurityImports,
  controllerToOperationsRecord,
  routers,
  parametersImportsPerController
}: {
  allServerSecurityImports: string[];
  parametersImportsPerController: Record<string, string[]>;
  controllerToOperationsRecord: Record<string, ControllerInfo[]>;
  routers: string[];
}) {
  return `
import Koa from 'koa'
import Router from '@koa/router'
import bodyParser from '@koa/bodyparser';
import { 
  ${allServerSecurityImports
    .concat(Object.values(parametersImportsPerController).flat())
    .join(',\n  ')}
} from './client.js'
import { KoaGeneratedUtils } from './utils.js'

${Object.keys(controllerToOperationsRecord)
  .map((c) => `import { ${c} } from './controllers/${c}.js'`)
  .join('\n')}

const app = new Koa()
const router = new Router()

app.use(bodyParser());

${routers.join('\n\n')}

export const generatedRouter = router
  `.trim();
}
