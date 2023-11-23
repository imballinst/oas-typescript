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
  const initialMiddlewares = [
    `
async (request, response) => {
  const parsedRequestInfo = ExpressGeneratedUtils.parseRequestInfo({ 
    request,
    response,
    oasParameters: ${parametersName}
  })
  if (!parsedRequestInfo) {
    return
  }

  const result = await ${controllerName}.${operationId}(parsedRequestInfo)
  response.status(result.status).send(result.body)
}
  `.trim()
  ];

  switch (requestBodyType) {
    case 'application/json': {
      initialMiddlewares.unshift('json()');
      break;
    }
    case 'application/x-www-form-urlencoded': {
      initialMiddlewares.unshift('urlencoded({ extended: true })');
      break;
    }
  }

  return initialMiddlewares;
}
