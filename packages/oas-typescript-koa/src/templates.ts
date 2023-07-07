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

{{#each schemas}}
export const {{@key}}{{#if (lookup ../circularTypeByName @key)}}: z.ZodType<{{@key}}>{{/if}} = {{{this}}};
{{/each}}

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

{{/each}}`

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
  