export function generateRouteMiddlewares({
  parametersName,
  controllerName,
  operationId,
  hasRequestBody
}: {
  parametersName?: string;
  controllerName: string;
  operationId: string;
  hasRequestBody: boolean;
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

  if (hasRequestBody) {
    middlewares.unshift('bodyParser()');
  }

  return middlewares;
}
