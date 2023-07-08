export function generateRouteMiddleware({
  parametersName,
  controllerName,
  operationId
}: {
  parametersName?: string;
  controllerName: string;
  operationId: string;
}) {
  return `
async (ctx, next) => {
  const parsedRequestInfo = KoaGeneratedUtils.parseRequestInfo({ 
    ctx,
    oasParameters: ${parametersName}
  })
  if (!parsedRequestInfo) {
    ctx.status = 400
    return
  }

  const result = await ${controllerName}.${operationId}(parsedRequestInfo)
  ctx.status = result.status

  if (result.status > 400) {
    ctx.body = result.error
  } else {
    ctx.body = result.data
  }
}
  `.trim();
}
