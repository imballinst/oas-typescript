export function generateRouteMiddleware({
  parameterName,
  controllerName,
  operationId
}: {
  parameterName: string;
  controllerName: string;
  operationId: string;
}) {
  return `
async (ctx, next) => {
  const parsedRequestInfo = KoaGeneratedUtils.parseRequestInfo({ 
    ctx,
    oasParameters: ${parameterName}
  })
  if (!parsedRequestInfo) {
    ctx.status = 400
    return
  }

  const { body, status } = await ${controllerName}.${operationId}(parsedRequestInfo)
  ctx.status = status
  if (body) ctx.body = body
}
  `.trim();
}
