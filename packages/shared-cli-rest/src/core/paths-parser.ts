import { titleCase } from 'title-case';
import { OpenAPIV3 } from 'openapi-types';

import { capitalizeFirstCharacter } from '../helpers/change-case.js';
import { OperationInfo } from '../helpers/templates/types.js';

const PARSED_METHODS = ['get', 'post', 'put', 'delete', 'patch'] as const;

export type GenerateRouteMiddlewareType = (param: {
  parametersName?: string;
  controllerName: string;
  operationId: string;
}) => string;

export type GenerateSecurityMiddlewareInvocationType = (
  securityName: string
) => string;

export function parsePaths({
  paths,
  templateFunctions: {
    middleware: generateRouteMiddleware,
    securityMiddlewareInvocation: generateSecurityMiddlewareInvocation
  }
}: {
  paths: OpenAPIV3.PathsObject;
  templateFunctions: {
    middleware: GenerateRouteMiddlewareType;
    securityMiddlewareInvocation: GenerateSecurityMiddlewareInvocationType;
  };
}) {
  const routers: string[] = [];

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

      const { tags = [], operationId, security, requestBody } = operation;
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

        middlewares.unshift(generateSecurityMiddlewareInvocation(securityName));
      }

      if (requestBody) {
        middlewares.unshift('bodyParser()');
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
    allServerSecurityImports
  };
}

// Helper functions.
function convertOpenApiPathToKoaPath(s: string) {
  if (!s.startsWith('{') && !s.endsWith('}')) return s;
  return `:${s.slice(1, -1)}`;
}
