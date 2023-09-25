export const defaultHandlebars = `import { z } from 'zod';

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
export const {{#capitalizeFirstLetter}}{{operationId}}{{/capitalizeFirstLetter}}Parameters = [
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
    schema: {{{schema}}}
  },
  {{/each}}
  {{/if}}
] as const
{{#if security}}
export const {{#capitalizeFirstLetter}}{{operationId}}{{/capitalizeFirstLetter}}Security = {{{security}}}
{{/if}}
{{#if response}}
export const {{#capitalizeFirstLetter}}{{operationId}}{{/capitalizeFirstLetter}}Response = {{{response}}}
export interface {{#capitalizeFirstLetter}}{{operationId}}{{/capitalizeFirstLetter}}Response extends z.infer<typeof {{#capitalizeFirstLetter}}{{operationId}}{{/capitalizeFirstLetter}}Response> {}
{{/if}}
export const {{#capitalizeFirstLetter}}{{operationId}}{{/capitalizeFirstLetter}}Errors = {
{{#if errors}}  
  {{#each errors}}
  {{status}}: {
    status: {{status}},
    {{#if description}}
    description: \`{{description}}\`,
    {{/if}}
    schema: {{{schema}}}
  },
  {{/each}}
{{/if}}
} as const

{{/each}}
`

export const middlewareHelpersTs = `import Koa from 'koa';
import Router from '@koa/router';

type KoaCtx = Koa.ParameterizedContext<
  Koa.DefaultState,
  Koa.DefaultContext &
    Router.RouterParamContext<Koa.DefaultState, Koa.DefaultContext>,
  unknown
>;

export class MiddlewareHelpers {
  static async doAdditionalSecurityValidation(
    ctx: KoaCtx,
    scopes: string[] | undefined
  ) {
    return {
      status: 200
    };
  }
}
`

export const utilsTs = `import Koa from 'koa';
import Router from '@koa/router';
import { z } from 'zod';
import { OpenAPIV3 } from 'openapi-types';

import { securitySchemes } from '../generated/security-schemes.js';
import { MiddlewareHelpers } from '../middleware-helpers.js';

type KoaCtx = Koa.ParameterizedContext<
  Koa.DefaultState,
  Koa.DefaultContext &
    Router.RouterParamContext<Koa.DefaultState, Koa.DefaultContext>,
  unknown
>;

const securitySchemeWithOauthScope =
  findSecuritySchemeWithOauthScope(securitySchemes);

interface OasSecurity {
  [name: string]: string[] | undefined;
}

interface OasParameter {
  name: string;
  description?: string;
  type: 'Path' | 'Query' | 'Body' | 'Header';
  schema: z.ZodTypeAny;
}

type ExtractMatchingType<
  TArray extends readonly OasParameter[],
  Type extends TArray[number]['type']
> = Extract<TArray[number], { type: Type }>;

type ExtractFilteredRecordFromArray<
  TArray extends readonly OasParameter[],
  Type extends TArray[number]['type']
> = ExtractMatchingType<TArray, Type> extends never
  ? never
  : {
      [K in ExtractMatchingType<TArray, Type>['name']]: z.output<
        ExtractMatchingType<TArray, Type>['schema']
      >;
    };

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

type RemoveNeverKeys<T> = Pick<
  T,
  {
    [K in keyof T]: T[K] extends never ? never : K;
  }[keyof T]
>;

export type ParsedRequestInfo<
  OasParametersType extends readonly OasParameter[]
> = RemoveNeverKeys<{
  body: z.output<ExtractMatchingType<OasParametersType, 'Body'>['schema']>;
  pathParams: ExtractFilteredRecordFromArray<OasParametersType, 'Path'>;
  headerParams: ExtractFilteredRecordFromArray<OasParametersType, 'Header'>;
  queryParams: ExtractFilteredRecordFromArray<OasParametersType, 'Query'>;
}>;

export class KoaGeneratedUtils {
  static parseRequestInfo<OasParametersType extends readonly OasParameter[]>({
    ctx,
    oasParameters
  }: {
    ctx: Koa.ParameterizedContext<
      Koa.DefaultState,
      Koa.DefaultContext &
        Router.RouterParamContext<Koa.DefaultState, Koa.DefaultContext>,
      unknown
    >;
    oasParameters: OasParametersType;
  }): ParsedRequestInfo<OasParametersType> | undefined {
    const pathParams: Record<string, any> = {};
    const queryParams: Record<string, any> = {};
    const headerParams: Record<string, any> = {};
    let bodyParams: any | undefined = undefined;

    // Validate path parameters.
    for (const oasParameter of oasParameters) {
      if (oasParameter.type === 'Path') {
        let param: string | number = ctx.params[oasParameter.name];
        if (oasParameter.schema._def.typeName === 'ZodNumber') {
          param = Number(param);
        }

        const result = oasParameter.schema.safeParse(param);
        if (!result.success) {
          ctx.status = 400;
          ctx.body = createErrorResponse({
            errorCode: ParseRequestErrors.INVALID_PATH_PARAMETER,
            zodError: result.error,
            additionalMessage: oasParameter.name
          });
          return;
        }

        pathParams[oasParameter.name] = ctx.params[oasParameter.name];
        continue;
      }

      if (oasParameter.type === 'Body') {
        const body = ctx.request.body as any;
        const result = oasParameter.schema.safeParse(body);
        if (!result.success) {
          ctx.status = 400;
          ctx.body = createErrorResponse({
            errorCode: ParseRequestErrors.INVALID_BODY,
            zodError: result.error
          });
          return;
        }

        bodyParams = body;
        continue;
      }

      if (oasParameter.type === 'Query') {
        const result = oasParameter.schema.safeParse(
          ctx.query[oasParameter.name]
        );
        if (!result.success) {
          ctx.status = 400;
          ctx.body = createErrorResponse({
            errorCode: ParseRequestErrors.INVALID_QUERY_PARAMETER,
            zodError: result.error,
            additionalMessage: oasParameter.name
          });
          return;
        }

        queryParams[oasParameter.name] = ctx.query[oasParameter.name];
        continue;
      }

      if (oasParameter.type === 'Header') {
        const result = oasParameter.schema.safeParse(
          ctx.headers[oasParameter.name]
        );
        if (!result.success) {
          ctx.status = 400;
          ctx.body = createErrorResponse({
            errorCode: ParseRequestErrors.INVALID_HTTP_HEADER,
            zodError: result.error,
            additionalMessage: oasParameter.name
          });
          return;
        }

        headerParams[oasParameter.name] = ctx.headers[oasParameter.name];
        continue;
      }
    }

    return {
      pathParams,
      queryParams,
      headerParams,
      body: bodyParams
    } as unknown as ParsedRequestInfo<OasParametersType>;
  }

  static createSecurityMiddleware<EndpointParameter extends OasSecurity[]>(
    security: EndpointParameter | undefined
  ) {
    const scopes = security?.find(
      (item) => Object.keys(item)[0] === securitySchemeWithOauthScope
    )?.[securitySchemeWithOauthScope];

    return async (ctx: KoaCtx, next: Koa.Next) => {
      const { status } = await MiddlewareHelpers.doAdditionalSecurityValidation(
        ctx,
        scopes
      );

      if (status !== 200) {
        ctx.status = status;
        return;
      }

      next();
    };
  }
}

// Helper functions.
function findSecuritySchemeWithOauthScope(
  securitySchemes: OpenAPIV3.ComponentsObject['securitySchemes']
) {
  if (!securitySchemes) return '';

  for (const key in securitySchemes) {
    const securityScheme = securitySchemes[
      key
    ] as OpenAPIV3.SecuritySchemeObject;

    if (securityScheme.type === 'oauth2') {
      return key;
    }
  }

  return '';
}

function createErrorResponse({
  errorCode,
  zodError,
  additionalMessage
}: {
  errorCode: ParseRequestErrors;
  zodError: z.ZodError;
  additionalMessage?: string;
}) {
  let message = ParseRequestErrorsMessage[errorCode];
  if (additionalMessage) {
    message = \`\${message} \${additionalMessage}\`;
  }

  return {
    code: errorCode,
    message,
    detail: zodError.errors
  };
}
`

export const typesTs = `import { z } from 'zod';

interface OasError {
  status: number;
  description: string;
  schema: z.ZodTypeAny;
}

export type ErrorStatuses<TOasError extends readonly OasError[]> = Exclude<
  Extract<TOasError[number], { status: number }>['status'],
  401 | 403
>;

export type ResponseHeaders = Record<
  string,
  { schema: number | string; nullable?: boolean }
>;

export interface ErrorResponse<
  TSchemaType = string,
  TStatus = number | string
> {
  status: TStatus extends 'number' ? DefaultHttpErrors : TStatus;
  schema: TSchemaType;
  headers?: ResponseHeaders;
}

export interface ResponseSchema<
  TSuccessSchemaType = string,
  TErrorSchemaType = string
> {
  success: {
    schema?: TSuccessSchemaType;
    status: number;
    headers?: ResponseHeaders;
  };
  error?: Record<string | number, ErrorResponse<TErrorSchemaType>>;
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

export type ControllerReturnType<X extends ResponseSchema<unknown, unknown>> =
  X['success'] extends object
    ?
        | {
            // TOOD: might need some tweaking in case it's undefined, maybe
            // it's better to be \`data?: never\`.
            data: X['success']['schema'];
            status: X['success']['status'];
          }
        | ExtractErrorRecord<X['error']>
    : never;

type ExtractErrorRecord<
  TErrorRecord extends ResponseSchema<unknown, unknown>['error']
> = {
  [Key in keyof TErrorRecord]: TErrorRecord[Key];
}[keyof TErrorRecord];

type DefaultHttpErrors =
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
`
  