import { OpenAPIV3 } from 'openapi-types';
import { PrebuildResponseHeaders } from './core-types';

export function convertOpenAPIHeadersToResponseSchemaHeaders({
  operationId,
  responseHeaders
}: {
  operationId: string;
  responseHeaders: any;
}) {
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
    if (!type) {
      throw new Error(
        `Invalid header type in ${headerKey} of operation ${operationId}. Expected "integer" or "string".`
      );
    }

    responseSchemaHeaders[headerKey] = {
      schema: `z.${type === 'string' ? 'string' : 'number'}()`
    };

    if (nullable) responseSchemaHeaders[headerKey].nullable = nullable;
  }

  return responseSchemaHeaders;
}
