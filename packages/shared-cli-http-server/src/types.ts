import { OpenAPIV3 } from 'openapi-types';

export interface ExtendedSchemaObject extends OpenAPIV3.NonArraySchemaObject {
  'x-field-name': string;
}
