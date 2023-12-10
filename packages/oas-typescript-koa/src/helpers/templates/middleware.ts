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
    const { content, type } = requestBody;

    switch (type) {
      case 'application/json': {
        middlewares.unshift('bodyParser()');
        break;
      }
      case 'application/octet-stream': {
        const xFieldName = (content.schema as ExtendedSchemaObject)[
          'x-field-name'
        ];
        if (!xFieldName) {
          throw new Error(
            `${operationId} has content type application/octet-stream, but it does not have "x-field-name" extension. Please fill it with the field name.`
          );
        }

        middlewares.unshift(`upload.single('${xFieldName}')`);
        break;
      }
      case 'multipart/form-data': {
        const properties =
          (content.schema as OpenAPIV3.NonArraySchemaObject | undefined)
            ?.properties ?? {};
        const array = [];

        for (const key in properties) {
          const property = properties[key] as OpenAPIV3.NonArraySchemaObject;
          array.push({
            name: key,
            maxCount: property.maxItems
          });
        }

        middlewares.unshift(`upload.fields(${JSON.stringify(array, null, 2)})`);
        break;
      }
      default:
        break;
    }
  }

  return middlewares;
};
