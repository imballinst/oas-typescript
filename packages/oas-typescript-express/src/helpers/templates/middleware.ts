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
async (request, response) => {
  const parsedRequestInfo = ExpressGeneratedUtils.parseRequestInfo({ 
    request,
    oasParameters: ${parametersName}
  })
  if (!parsedRequestInfo) {
    return
  }

  const result = await ${controllerName}.${operationId}(parsedRequestInfo)
  response.status(result.status)
  response.send(result.body)
}
  `.trim();
}
