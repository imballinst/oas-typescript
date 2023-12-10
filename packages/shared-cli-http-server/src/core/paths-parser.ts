import { titleCase } from 'title-case';
import { OpenAPI, OpenAPIV3 } from 'openapi-types';

import { capitalizeFirstCharacter } from '../helpers/change-case.js';
import { OperationInfo } from '../helpers/templates/types.js';

const PARSED_METHODS = ['get', 'post', 'put', 'delete', 'patch'] as const;

const UPLOAD_MIME_TYPES = ['multipart/form-data', 'application/octet-stream'];
const MIME_TYPE_ORDER = [
  'application/json',
  'application/x-www-form-urlencoded',
  ...UPLOAD_MIME_TYPES
];

interface RequestBodyInfo {
  type: string;
  content: OpenAPIV3.MediaTypeObject;
}

export type GenerateRouteMiddlewareType = (param: {
  parametersName?: string;
  controllerName: string;
  operationId: string;
  requestBody?: RequestBodyInfo;
}) => string[];

export type GenerateSecurityMiddlewareInvocationType = (
  securityName: string
) => string;

export function parsePaths({
  paths,
  templateFunctions: {
    middlewares: generateRouteMiddlewares,
    securityMiddlewareInvocation: generateSecurityMiddlewareInvocation
  }
}: {
  paths: OpenAPI.Document['paths'];
  templateFunctions: {
    middlewares: GenerateRouteMiddlewareType;
    securityMiddlewareInvocation: GenerateSecurityMiddlewareInvocationType;
  };
}) {
  const routers: string[] = [];

  const controllerToOperationsRecord: Record<string, OperationInfo[]> = {};
  const parametersImportsPerController: Record<string, string[]> = {};
  const controllerImportsPerController: Record<string, string[]> = {};
  const allServerSecurityImports: string[] = [];

  let isRequireFileUploads = false;

  for (const pathKey in paths) {
    const pathItem = paths[pathKey];
    if (!pathItem) continue;

    for (const methodKey of PARSED_METHODS) {
      const operation = pathItem[methodKey] as OpenAPIV3.OperationObject;
      if (!operation) continue;

      const {
        tags = [],
        operationId,
        security,
        requestBody: requestBodyRaw
      } = operation;
      const requestBody = requestBodyRaw as
        | OpenAPIV3.RequestBodyObject
        | undefined;
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

      const pascalCasedOperationId = capitalizeFirstCharacter(operationId);
      const errorType = `${pascalCasedOperationId}Errors`;
      const parametersName = `${pascalCasedOperationId}Parameters`;
      const responseName = `${pascalCasedOperationId}Response`;

      controllerToOperationsRecord[controllerName].push({
        operationId,
        functionType: `${pascalCasedOperationId}ControllerFunction`,
        parametersName,
        responseType: {
          success: responseName,
          error: errorType
        }
      });

      if (parametersName) {
        parametersImportsPerController[controllerName].push(parametersName);
        controllerImportsPerController[controllerName].push(parametersName);
      }

      controllerImportsPerController[controllerName].push(errorType);
      controllerImportsPerController[controllerName].push(responseName);

      const requestBodyContent = requestBody?.content ?? {};

      const requestBodyType = Object.keys(requestBodyContent).find((mimeType) =>
        MIME_TYPE_ORDER.includes(mimeType)
      );
      let requestBodyInfo: RequestBodyInfo | undefined;

      if (requestBodyType) {
        isRequireFileUploads =
          isRequireFileUploads || UPLOAD_MIME_TYPES.includes(requestBodyType);
        requestBodyInfo = {
          type: requestBodyType,
          content: requestBodyContent[requestBodyType]
        };
      }

      const middlewares: string[] = generateRouteMiddlewares({
        controllerName,
        operationId,
        parametersName,
        requestBody: requestBodyInfo
      });

      if (security) {
        const securityName = `${capitalizeFirstCharacter(operationId)}Security`;
        allServerSecurityImports.push(securityName);

        middlewares.unshift(generateSecurityMiddlewareInvocation(securityName));
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
    controllerToOperationsRecord,
    parametersImportsPerController,
    controllerImportsPerController,
    allServerSecurityImports,
    isRequireFileUploads
  };
}

// Helper functions.
function convertOpenApiPathToKoaPath(s: string) {
  if (!s.startsWith('{') && !s.endsWith('}')) return s;
  return `:${s.slice(1, -1)}`;
}
