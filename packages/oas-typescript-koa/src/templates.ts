export const utilsTs = `import Koa from 'koa';
import { z } from 'zod';

import { MiddlewareHelpers } from '../middleware-helpers.js';
import { SecuritySchemes } from './security-schemes.js';
import { SecurityMiddlewareError } from './types.js';

export interface OasParameter {
  name: string;
  description?: string;
  type: 'Path' | 'Query' | 'Body' | 'Header';
  isFormData?: boolean;
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
    try {
    } catch (err) {}
    const pathParams: Record<string, any> = {};
    const queryParams: Record<string, any> = {};
    const headerParams: Record<string, any> = {};
    let bodyParams: any | undefined = undefined;

    const errors: Array<{
      zodError: z.ZodError;
      oasParameter: OasParameter;
    }> = [];

    // Validate path parameters.
    for (const oasParameter of oasParameters) {
      if (oasParameter.type === 'Path') {
        let param: string | number = ctx.params[oasParameter.name];
        if (oasParameter.schema._def.typeName === 'ZodNumber') {
          param = Number(param);
        }

        const result = oasParameter.schema.safeParse(param);
        if (!result.success) {
          errors.push({ zodError: result.error, oasParameter });
          continue;
        }

        pathParams[oasParameter.name] = ctx.params[oasParameter.name];
        continue;
      }

      if (oasParameter.type === 'Body') {
        let body: any;

        // TODO: properly handle multer.single, multer.array, and multer.fields.
        if (oasParameter.isFormData) {
          if (ctx.request.file) {
            // Single file --> multer: single.
            body = {
              [ctx.request.file.fieldname]: String(ctx.request.file.buffer)
            };
          } else {
            // Multiple files --> multer: array or fields.
            body = ctx.request.body;

            const files = ctx.request.files;

            if (!Array.isArray(files)) {
              // Multer: fields.
              for (const key in files) {
                body[key] = files[key].map((item) => String(item.buffer));
              }
            } else if (files.length > 0) {
              // Multer: array.
              body = {
                [files[0].fieldname]: files.map((item) => String(item.buffer))
              };
            }
          }
        } else {
          body = ctx.request.body;
        }

        const result = oasParameter.schema.safeParse(body);
        if (!result.success) {
          errors.push({ zodError: result.error, oasParameter });
          continue;
        }

        bodyParams = body;
        continue;
      }

      if (oasParameter.type === 'Query') {
        const result = oasParameter.schema.safeParse(
          ctx.query[oasParameter.name]
        );
        if (!result.success) {
          errors.push({ zodError: result.error, oasParameter });
          continue;
        }

        queryParams[oasParameter.name] = ctx.query[oasParameter.name];
        continue;
      }

      if (oasParameter.type === 'Header') {
        const result = oasParameter.schema.safeParse(
          ctx.headers[oasParameter.name]
        );
        if (!result.success) {
          errors.push({ zodError: result.error, oasParameter });
          continue;
        }

        headerParams[oasParameter.name] = ctx.headers[oasParameter.name];
        continue;
      }
    }

    if (errors.length > 0) {
      ctx.status = 400;
      ctx.body = MiddlewareHelpers.processZodErrorValidation({
        path: ctx.path,
        errors
      });
      return;
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

        await next();
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
`
  