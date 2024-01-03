import { getHandlebars } from 'openapi-zod-client';
import { capitalizeFirstCharacter } from '../helpers/change-case';
import { stringifyControllerReturnTypeGenericType } from '../helpers/templates/controller-types';
import { PrebuildResponseSchema } from './core-types';

export function getHandlebarsInstance(securitySchemes: any) {
  const handlebars = getHandlebars();

  handlebars.registerHelper('capitalizeFirstLetter', function (...args: any[]) {
    // Last argument is an object.
    const [firstWord, ...rest] = args.slice(0, -1);
    return capitalizeFirstCharacter(firstWord) + rest.join('');
  });
  handlebars.registerHelper('interfaceFromZod', function (...args: any[]) {
    // Last argument is an object.
    const [firstWord, ...rest] = args.slice(0, -1);
    const interfaceName = capitalizeFirstCharacter(firstWord) + rest.join('');
    return `export type ${interfaceName} = typeof ${interfaceName}`;
  });
  handlebars.registerHelper('interfaceFromObject', function (...args: any[]) {
    // Last argument is an object.
    const [firstWord, ...rest] = args.slice(0, -1);
    const interfaceName = capitalizeFirstCharacter(firstWord) + rest.join('');
    return `export type ${interfaceName} = typeof ${interfaceName}`;
  });
  handlebars.registerHelper('extractResponses', function (...args: any[]) {
    // Last argument is an object.
    const [operationId, responses] = args.slice(0, -1);

    const successResponse: PrebuildResponseSchema['success'] = {
      schema: '',
      status: 0
    };
    const errorResponses: Record<string, PrebuildResponseSchema['error']> = {};
    const declarations: string[] = [];

    for (const response of responses) {
      if (response.statusCode < 400) {
        successResponse.schema = response.schema;
        successResponse.status = response.statusCode;
        successResponse.headers = response.headers;
      } else {
        errorResponses[response.statusCode] = {
          status: response.statusCode,
          schema: response.schema,
          headers: response.headers
        };
      }
    }

    // Render the response string.
    const responseVariableName = `${capitalizeFirstCharacter(
      operationId
    )}Response`;
    const inferred = `typeof ${responseVariableName}`;

    declarations.push(
      `export const ${responseVariableName} = ${stringifyControllerReturnTypeGenericType(
        successResponse
      )} as const`,
      successResponse.schema !== 'z.void()'
        ? `export type ${responseVariableName} = ${inferred}`
        : `export type ${responseVariableName} = ${inferred}`,
      ''
    );

    // Render the errors string.
    const errorsVariableName = `${capitalizeFirstCharacter(operationId)}Errors`;
    declarations.push(
      `export const ${errorsVariableName} = ${stringifyControllerReturnTypeGenericType(
        errorResponses
      )} as const`,
      `export type ${errorsVariableName} = typeof ${errorsVariableName}`,
      ''
    );

    return declarations.join('\n');
  });
  handlebars.registerHelper(
    'extractOperationSecurity',
    function (...args: any[]) {
      // Last argument is an object.
      const [operationId, securityArray] = args.slice(0, -1);
      const securityRecord: Record<string, any> = {};
      const titleCased = capitalizeFirstCharacter(operationId);

      for (const securityObject of securityArray) {
        const keyName = Object.keys(securityObject)[0];
        const meta = securitySchemes[keyName];

        if (meta) {
          securityRecord[keyName] = {
            meta,
            value: securityObject[keyName]
          };
        }
      }

      return `export const ${titleCased}Security = ${JSON.stringify(
        securityRecord,
        null,
        2
      ).replace(/\]/g, '] as string[]')} as const`;
    }
  );
  handlebars.registerHelper('renderSchema', function (schema: any) {
    return this.formData || schema;
  });

  return handlebars;
}
