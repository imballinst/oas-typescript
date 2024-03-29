export const defaultHandlebars = `import { z } from 'zod';
{{{renderFormidableImport}}}

{{#if imports}}
{{#each imports}}
import { {{{@key}}} } from './{{{this}}}'
{{/each}}
{{/if}}


{{#if types}}
{{#each types}}
{{{this}}};
{{/each}}
{{/if}}

// Schemas.
{{#each schemas}}
export const {{@key}}{{#if (lookup ../circularTypeByName @key)}}: z.ZodType<{{@key}}>{{/if}} = {{{this}}};
export interface {{@key}} extends z.infer<typeof {{@key}}> {}
{{/each}}

// Endpoints.
{{#each endpoints}}
export const {{capitalizeFirstLetter operationId "Parameters"}} = [
  {{#if parameters}}
  {{#each parameters}}
  { 
    name: '{{name}}',
    {{#if description}}
    description: \`{{description}}\`,
    {{/if}}
    {{#if type}}
    type: '{{type}}',
    {{/if}}
    schema: {{{renderSchema schema}}}
  },
  {{/each}}
  {{/if}}
] as const
{{#if security}}
{{{extractOperationSecurity operationId security}}}
{{/if}}

{{{extractResponses operationId responses}}}

{{/each}}
`

export const middlewareHelpersTs = `import { IncomingHttpHeaders } from 'http';

import { SecuritySchemes } from './static/security-schemes.js';
import { ParametersError } from './static/utils.js';
import { SecurityMiddlewareError } from './static/types.js';

enum ParseRequestErrors {
  INVALID_PATH_PARAMETER = '10000',
  INVALID_BODY = '10001',
  INVALID_QUERY_PARAMETER = '10002',
  INVALID_HTTP_HEADER = '10003'
}
const ParseRequestErrorsMessage: Record<ParseRequestErrors, string> = {
  [ParseRequestErrors.INVALID_PATH_PARAMETER]: 'invalid path parameter',
  [ParseRequestErrors.INVALID_BODY]: 'invalid body',
  [ParseRequestErrors.INVALID_QUERY_PARAMETER]: 'invalid query parameter',
  [ParseRequestErrors.INVALID_HTTP_HEADER]: 'invalid http header'
};

// @@@SNIPSTART middleware-helpers {"highlightedLines": "{6-26}"}
export class MiddlewareHelpers {
  static async doAdditionalSecurityValidation(
    headers: IncomingHttpHeaders,
    securityObject: SecuritySchemes
  ): Promise<void> {
    let isValid = true;

    if (securityObject.api_key) {
      const apiKeyInHeader = headers[securityObject.api_key.meta.name];

      if (!apiKeyInHeader) {
        isValid = false;
      } else {
        // Example.
        isValid = apiKeyInHeader === 'helloworld';
      }
    }

    if (!isValid) {
      return Promise.reject(
        new SecurityMiddlewareError({
          status: 401,
          body: { message: 'invalid credentials' }
        })
      );
    }

    return Promise.resolve();
  }

  static processZodErrorValidation({
    errors
  }: {
    path: string;
    errors: Array<ParametersError>;
  }) {
    // Take only the first one.
    const error = errors[0];
    const oasParameter = errors[0].oasParameter;
    const errorCode =
      oasParameter.type === 'Body'
        ? ParseRequestErrors.INVALID_BODY
        : oasParameter.type === 'Header'
        ? ParseRequestErrors.INVALID_HTTP_HEADER
        : oasParameter.type === 'Query'
        ? ParseRequestErrors.INVALID_QUERY_PARAMETER
        : ParseRequestErrors.INVALID_PATH_PARAMETER;

    return {
      code: errorCode,
      message: ParseRequestErrorsMessage[errorCode],
      detail: error.type === 'zod' ? error.value.errors : error.value
    };
  }
}
// @@@SNIPEND
`

export const typesTs = `import { z } from 'zod';

export class SecurityMiddlewareError extends Error {
  content: { status: number; body: any };

  constructor({ body, status }: { status: number; body: any }) {
    super();

    this.content = { status, body };
  }
}

export interface MultipartErrorContentType {
  type: 'MAX_FILES_EXCEEDED' | 'MAX_SIZE_EXCEEDED';
  field: string;
}
export class MultipartError extends Error {
  content: MultipartErrorContentType;

  constructor({ field, type }: MultipartErrorContentType) {
    super();

    this.content = { field, type };
  }
}

export interface OasError {
  status: number;
  description: string;
  schema: z.ZodTypeAny;
}

export type ErrorStatuses<TOasError extends readonly OasError[]> = Exclude<
  Extract<TOasError[number], { status: number }>['status'],
  401 | 403
>;

export type ResponseHeaders<
  THeadersSchemaType = string | number | z.ZodSchema
> = Record<string, { schema: THeadersSchemaType; nullable?: boolean }>;

type MaybePromise<T> = T | Promise<T>;

type BuildResponseObject<TObject extends { headers?: ResponseHeaders }> =
  MaybePromise<
    TObject['headers'] extends object
      ? Omit<TObject, 'headers'> & {
          headers: {
            [K in keyof TObject['headers']]: TObject['headers'][K]['schema'] extends z.ZodSchema
              ? z.infer<TObject['headers'][K]['schema']>
              : TObject['headers'][K]['schema'];
          };
        }
      : Omit<TObject, 'headers'>
  >;

export interface ErrorResponse<
  TSchemaType = string,
  TStatus = number | string,
  THeadersSchemaType = string | number | z.ZodSchema
> {
  status: TStatus extends z.ZodNumber ? DefaultHttpErrors : TStatus;
  schema: TSchemaType;
  headers?: ResponseHeaders<THeadersSchemaType>;
}

export interface ResponseSchema<
  TSuccessSchemaType = z.ZodSchema,
  TErrorSchemaType = string,
  THeadersSchemaType = string | number | z.ZodSchema
> {
  success: {
    schema?: TSuccessSchemaType;
    status: number;
    headers?: ResponseHeaders;
  };
  error?: Record<
    string | number,
    ErrorResponse<TErrorSchemaType, string | number, THeadersSchemaType>
  >;
}

export interface OperationInfo {
  /**
   * Contains the operation ID, which is required.
   */
  operationId: string;
  /**
   * Contains the function type, which will be imported to the controller.
   */
  functionType: string;
  /**
   * Contains the parameters type for the operation. This is so that in the controller-types file,
   * the generator can import the right parameter.
   */
  parametersName?: string;
  /**
   * Contains the response object schema.
   */
  response?: ResponseSchema;
}
export type ControllerReturnType<
  X extends ResponseSchema<z.ZodSchema, unknown, z.ZodSchema>
> = X['success']['schema'] extends object
  ?
      | BuildResponseObject<{
          // TOOD: might need some tweaking in case it's undefined, maybe
          // it's better to be \`data?: never\`.
          body: z.infer<X['success']['schema']>;
          status: X['success']['status'];
          headers: X['success']['headers'];
        }>
      | ExtractErrorRecord<X['error']>
  : never;

export type ExtractErrorRecord<
  TErrorRecord extends
    | Record<string | number, ErrorResponse<unknown, unknown, z.ZodSchema>>
    | undefined
> = TErrorRecord extends object
  ? {
      [Key in keyof TErrorRecord]: TErrorRecord[Key]['schema'] extends z.ZodVoid
        ? BuildResponseObject<{
            body?: never;
            status: ExtractErrorStatus<TErrorRecord[Key]['status']>;
            headers: TErrorRecord[Key]['headers'];
          }>
        : TErrorRecord[Key]['schema'] extends z.ZodSchema
        ? BuildResponseObject<{
            body: z.infer<TErrorRecord[Key]['schema']>;
            status: ExtractErrorStatus<TErrorRecord[Key]['status']>;
            headers: TErrorRecord[Key]['headers'];
          }>
        : never;
    }[keyof TErrorRecord]
  : never;

type ExtractErrorStatus<TStatus> = TStatus extends 'default'
  ? Exclude<TStatus, 'default'> | DefaultHttpErrors
  : TStatus;

export type DefaultHttpErrors =
  | 400
  | 401
  | 402
  | 403
  | 404
  | 405
  | 406
  | 407
  | 408
  | 409
  | 410
  | 411
  | 412
  | 413
  | 414
  | 415
  | 416
  | 417
  | 418
  | 421
  | 422
  | 423
  | 424
  | 425
  | 426
  | 428
  | 429
  | 431
  | 451
  | 500
  | 501
  | 502
  | 503
  | 504
  | 505
  | 506
  | 507
  | 508
  | 510
  | 511;

export const FormidableFile = z.object({
  size: z.number(),
  filepath: z.string(),
  originalFilename: z.string().nullable(),
  newFilename: z.string(),
  mimetype: z.string().nullable(),
  mtime: z.date().nullish(),
  hashAlgorithm: z.union([
    z.literal(false),
    z.literal('sha1'),
    z.literal('md5'),
    z.literal('sha256')
  ]),
  hash: z.string().nullable()
});
export interface FormidableFile extends z.infer<typeof FormidableFile> {}
`
  