export function generateRouteMiddlewares({
  parametersName,
  controllerName,
  operationId,
  requestBodyType
}: {
  parametersName?: string;
  controllerName: string;
  operationId: string;
  requestBodyType?: string;
}) {
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

  if (!!requestBodyType) {
    middlewares.unshift('bodyParser()');
  }

  return middlewares;
}
