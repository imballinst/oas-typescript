export function generateRouteMiddleware({
  parametersName,
  controllerName,
  operationId,
}: {
  parametersName?: string;
  controllerName: string;
  operationId: string;
}) {
  return `
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
  `.trim();
}
