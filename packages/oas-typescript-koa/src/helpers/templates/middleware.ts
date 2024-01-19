import { GenerateRouteMiddlewareType } from '@oas-typescript/shared-cli-http-server';
import { KoaBodyMiddlewareOptions } from 'koa-body';

export const generateRouteMiddlewares: GenerateRouteMiddlewareType = ({
  parametersName,
  controllerName,
  operationId,
  requestBody
}) => {
  const middlewares = [
    `
async (ctx) => {
  const parsedRequestInfo = KoaGeneratedUtils.parseRequestInfo({ 
    ctx,
    oasParameters: ${parametersName}
  })
  if (!parsedRequestInfo) {
    return
  }

  const result = await ${controllerName}.${operationId}(parsedRequestInfo)
  ctx.body = result.body
  ctx.status = result.status
}
  `.trim()
  ];

  if (requestBody) {
    const opts: Partial<KoaBodyMiddlewareOptions> = {};
    if (requestBody.type === 'multipart/form-data') {
      opts.multipart = true;
    }

    const renderedOpts =
      Object.keys(opts).length > 0
        ? `KoaMiddlewareHelpers.createKoaBodyMiddlewareOptions(${JSON.stringify(
            opts
          )})`
        : '';

    middlewares.unshift(`koaBody(${renderedOpts})`);
  }

  return middlewares;
};
