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
  const initialMiddlewares = [
    `
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
  `.trim()
  ];

  if (hasRequestBody) {
    initialMiddlewares.unshift('json()', 'urlencoded()');
  }

  return initialMiddlewares;
}
