import Koa from 'koa';
import { z } from 'zod';

import { MiddlewareHelpers } from '../middleware-helpers.js';
import { SecuritySchemes } from './security-schemes.js';
import { SecurityMiddlewareError } from './types.js';

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
    ctx: Koa.Context;
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

  static createSecurityMiddleware(security: SecuritySchemes) {
    return async (ctx: Koa.Context, next: Koa.Next) => {
      try {
        await MiddlewareHelpers.doAdditionalSecurityValidation(
          ctx.headers,
          security
        );

        next();
      } catch (err) {
        if (err instanceof SecurityMiddlewareError) {
          const { content } = err;

          ctx.body = content.body;
          ctx.status = content.status;
          return;
        }

        if (err instanceof Error) {
          ctx.body = { message: err.stack || err.message };
          ctx.status = 500;
          return;
        }

        ctx.body = { message: 'Internal server error' };
        ctx.status = 500;
      }
    };
  }
}

// Helper functions.
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
    message = `${message} ${additionalMessage}`;
  }

  return {
    code: errorCode,
    message,
    detail: zodError.errors
  };
}
