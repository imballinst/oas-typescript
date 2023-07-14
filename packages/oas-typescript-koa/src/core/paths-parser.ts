import { titleCase } from 'title-case';
import { OpenAPIV3 } from 'openapi-types';

import { capitalizeFirstCharacter } from '../helpers/change-case';
import { generateRouteMiddleware } from '../helpers/templates/middleware';
import { OperationInfo } from '../helpers/templates/types';

const PARSED_METHODS = ['get', 'post', 'put', 'delete', 'patch'] as const;

export function parsePaths({ paths }: { paths: OpenAPIV3.PathsObject }) {
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
      let errorType = `${capitalizedOperationId}Errors`;
      let responseName = `${capitalizedOperationId}Response`;

      let responseSuccessStatus = Number(
        Object.keys(responses).find(
          (status) => Number(status) >= 200 && Number(status) < 300
        )
      );
      if (isNaN(responseSuccessStatus)) {
        throw new Error(
          `Invalid response of ${operationId}: should have 2xx response defined`
        );
      }

      controllerToOperationsRecord[controllerName].push({
        operationId,
        functionType: `${capitalizedOperationId}ControllerFunction`,
        parametersName,
        errorType,
        response: responseName,
        responseSuccessStatus
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
