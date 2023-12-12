import { OpenAPIV3 } from 'openapi-types';
import {
  GenerateRouteMiddlewareType,
  ExtendedSchemaObject
} from '@oas-typescript/shared-cli-http-server';

export const generateRouteMiddlewares: GenerateRouteMiddlewareType = ({
  parametersName,
  controllerName,
  operationId,
  requestBody
}) => {
  const middlewares = [
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

  if (requestBody) {
    const { content, type } = requestBody;

    switch (type) {
      case 'application/json': {
        middlewares.unshift('json()');
        break;
      }
      case 'application/x-www-form-urlencoded': {
        middlewares.unshift('urlencoded({ extended: true })');
        break;
      }
      case 'application/octet-stream': {
        // TODO: implement multipart/form-data for express
        break;
      }
      case 'multipart/form-data': {
        // TODO: implement multipart/form-data for express
        break;
      }
      default:
        break;
    }
  }

  return middlewares;
};
