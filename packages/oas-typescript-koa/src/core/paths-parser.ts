import { titleCase } from 'title-case';
import { OpenAPIV3 } from 'openapi-types';

import { capitalizeFirstCharacter } from '../helpers/change-case.js';
import { generateRouteMiddleware } from '../helpers/templates/middleware.js';
import {
  OperationInfo,
  PrebuildResponseSchema,
  PrebuildErrorResponse,
  PrebuildResponseHeaders
} from '../helpers/templates/types.js';

const PARSED_METHODS = ['get', 'post', 'put', 'delete', 'patch'] as const;

export function parsePaths({ paths }: { paths: OpenAPIV3.PathsObject }) {
  const routers: string[] = [];

  const operationIdToResponseSchemaRecord: Record<
    string,
    PrebuildResponseSchema
  > = {};

  const controllerToOperationsRecord: Record<string, OperationInfo[]> = {};
  const parametersImportsPerController: Record<string, string[]> = {};
  const controllerImportsPerController: Record<string, string[]> = {};
  const allServerSecurityImports: string[] = [];

  for (const pathKey in paths) {
    const pathItem = paths[pathKey];
    if (!pathItem) continue;

    for (const methodKey of PARSED_METHODS) {
      const operation = pathItem[methodKey];
      if (!operation) continue;

      const { tags = [], operationId, security, responses } = operation;
      const [tag] = tags;

      if (!tag) {
        throw new Error(
          `The tag for the method ${methodKey} of ${pathKey} is not defined. Define it, then try again.`
        );
      }

      if (!operationId) {
        throw new Error(
          `The operation ID for the method ${methodKey} of ${pathKey} is not defined. Define it, then try again.`
        );
      }

      const controllerName = `${titleCase(tag)}Controller`;
      if (!controllerToOperationsRecord[controllerName]) {
        controllerToOperationsRecord[controllerName] = [];
      }

      if (!parametersImportsPerController[controllerName]) {
        parametersImportsPerController[controllerName] = [];
      }

      if (!controllerImportsPerController[controllerName]) {
        controllerImportsPerController[controllerName] = [];
      }

      const capitalizedOperationId = capitalizeFirstCharacter(operationId);
      let parametersName = `${capitalizedOperationId}Parameters`;
      const errorType = `${capitalizedOperationId}Errors`;
      let responseName = `${capitalizedOperationId}Response`;

      let responseSuccessStatus = Number(
        Object.keys(responses).find(
          // Assume that 3xx redirections are also possible, e.g. OAuth endpoint.
          (status) => Number(status) >= 200 && Number(status) < 400
        )
      );
      if (isNaN(responseSuccessStatus)) {
        throw new Error(
          `Invalid response of ${operationId}: should have 2xx or 3xx response defined`
        );
      }

      const openAPISuccessResponseHeaders = (
        responses[responseSuccessStatus] as OpenAPIV3.ResponseObject
      ).headers;

      const responseSuccessHeaders =
        convertOpenAPIHeadersToResponseSchemaHeaders(
          openAPISuccessResponseHeaders
        );
      const responseSchema: PrebuildResponseSchema = {
        success: getSuccessResponseSchema(
          responseSuccessStatus,
          responses[responseSuccessStatus]
        ),
        error: {}
      };

      if (responseSuccessHeaders) {
        responseSchema.success!.headers = responseSuccessHeaders;
      }

      const responseErrorStatuses = Object.keys(responses).filter(
        (status) => Number(status) >= 400
      );
      const hasDefaultResponseStatus = responses.default !== undefined;

      if (responseErrorStatuses.length || hasDefaultResponseStatus) {
        responseSchema.error = {};

        if (hasDefaultResponseStatus) {
          responseSchema.error.default = getErrorResponseSchema(
            'default',
            responses.default
          );
        } else {
          for (const responseStatus of responseErrorStatuses) {
            responseSchema.error[responseStatus] = getErrorResponseSchema(
              responseStatus,
              responses[responseStatus]
            );
          }
        }
      }

      controllerToOperationsRecord[controllerName].push({
        operationId,
        functionType: `${capitalizedOperationId}ControllerFunction`,
        parametersName,
        response: responseSchema,
        responseType: {
          success: responseName,
          error: errorType
        }
      });
      operationIdToResponseSchemaRecord[operationId] = responseSchema;

      if (parametersName) {
        parametersImportsPerController[controllerName].push(parametersName);
        controllerImportsPerController[controllerName].push(parametersName);
      }

      controllerImportsPerController[controllerName].push(errorType);
      controllerImportsPerController[controllerName].push(responseName);

      const middlewares: string[] = [
        generateRouteMiddleware({
          controllerName,
          operationId,
          parametersName
        })
      ];

      if (security) {
        const securityName = `${capitalizeFirstCharacter(operationId)}Security`;
        allServerSecurityImports.push(securityName);

        middlewares.unshift(
          `KoaGeneratedUtils.createSecurityMiddleware(${securityName})`
        );
      }

      const koaPath = pathKey
        .split('/')
        .map(convertOpenApiPathToKoaPath)
        .join('/');

      routers.push(
        `
router.${methodKey}('${koaPath}', ${middlewares.join(', ')})
      `.trim()
      );
    }
  }

  return {
    routers,
    operationIdToResponseSchemaRecord,
    controllerToOperationsRecord,
    parametersImportsPerController,
    controllerImportsPerController,
    allServerSecurityImports
  };
}

// Helper functions.
function convertOpenApiPathToKoaPath(s: string) {
  if (!s.startsWith('{') && !s.endsWith('}')) return s;
  return `:${s.slice(1, -1)}`;
}

function getSuccessResponseSchema(status: number, object: any) {
  const content = object.content;
  const contentSchema = content?.['application/json']['schema']['$ref'].replace(
    '#/components/schemas/',
    ''
  );
  const successContent: PrebuildResponseSchema['success'] = {
    schema: contentSchema || 'z.void()',
    status
  };
  const headers = convertOpenAPIHeadersToResponseSchemaHeaders(
    content?.['headers']
  );
  if (headers) successContent.headers = headers;

  return successContent;
}

function getErrorResponseSchema(status: string, errorObject: any) {
  const content = errorObject.content?.['application/json'];
  const contentSchema = content?.['schema']['$ref'].replace(
    '#/components/schemas/',
    ''
  );
  const errorCodeContent: PrebuildErrorResponse = {
    schema: contentSchema || 'z.void()',
    status
  };
  const headers = convertOpenAPIHeadersToResponseSchemaHeaders(
    content?.['headers']
  );
  if (headers) errorCodeContent.headers = headers;

  return errorCodeContent;
}

function convertOpenAPIHeadersToResponseSchemaHeaders(responseHeaders: any) {
  if (!responseHeaders) return undefined;

  const openAPIHeaders = responseHeaders as Record<
    string,
    OpenAPIV3.HeaderObject
  >;
  let responseSchemaHeaders: PrebuildResponseHeaders<string> | undefined =
    undefined;

  for (const headerKey in openAPIHeaders) {
    const schema = openAPIHeaders[headerKey].schema as OpenAPIV3.SchemaObject;
    if (!schema) continue;

    if (!responseSchemaHeaders) responseSchemaHeaders = {};

    const { type, nullable } = schema;
    responseSchemaHeaders[headerKey] = {
      schema: `z.${type || 'void'}()`
    };

    if (nullable) responseSchemaHeaders[headerKey].nullable = nullable;
  }

  return responseSchemaHeaders;
}
