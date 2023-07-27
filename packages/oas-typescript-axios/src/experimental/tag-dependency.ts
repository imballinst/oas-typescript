import { OpenAPIV3, OpenAPIV3_1 } from 'openapi-types';

const METHODS = ['get', 'post', 'put', 'patch', 'delete'] as const;

export function getTagDependencies({
  spec
}: {
  spec:
    | {
        version: '3.0';
        oas30: OpenAPIV3.Document;
      }
    | {
        version: '3.1';
        oas31: OpenAPIV3_1.Document;
      };
}) {
  const result: Map<string, string[]> = new Map();

  if (spec.version === '3.0') {
    const { components = {}, paths } = spec.oas30;
    for (const pathItemKey in paths) {
      const pathItem = paths[pathItemKey];

      for (const methodKey of METHODS) {
        const operation = xathItem?.[methodKey];
        if (!operation) continue;

        for (const responseStatusKey in operation.responses) {
          const responseStatusObject = operation.responses[responseStatusKey];
        }
      }
    }

    return result;
  }

  return result;
}
