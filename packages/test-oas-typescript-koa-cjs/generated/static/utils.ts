import Koa from 'koa';
import { z } from 'zod';

import { MiddlewareHelpers } from '../middleware-helpers';
import { SecuritySchemes } from './security-schemes';
import { MultipartError, SecurityMiddlewareError } from './types';

export interface OasParameter {
  name: string;
  description?: string;
  type: 'Path' | 'Query' | 'Body' | 'Header';
  schema: z.ZodTypeAny;
  formidableOptions?: Record<
    string,
    {
      maxFiles?: number;
      maxFileSize?: number;
    }
  >;
}

export type ParametersError =
  | {
      type: 'multipart';
      value: MultipartError[];
      oasParameter: OasParameter;
      formidableFiles: NonNullable<Koa.Request['files']>;
    }
  | {
      type: 'zod';
      value: z.ZodError;
      oasParameter: OasParameter;
    };

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
    const pathParams: Record<string, any> = {};
    const queryParams: Record<string, any> = {};
    const headerParams: Record<string, any> = {};
    let bodyParams: any | undefined;

    const errors: Array<ParametersError> = [];

    // Validate path parameters.
    for (const oasParameter of oasParameters) {
      if (oasParameter.type === 'Path') {
        let param: string | number = ctx.params[oasParameter.name];
        if (oasParameter.schema._def.typeName === 'ZodNumber') {
          param = Number(param);
        }

        const result = oasParameter.schema.safeParse(param);
        if (!result.success) {
          errors.push({ type: 'zod', value: result.error, oasParameter });
          continue;
        }

        pathParams[oasParameter.name] = ctx.params[oasParameter.name];
        continue;
      }

      if (oasParameter.type === 'Body') {
        let body: any;

        if (ctx.request.files) {
          const formidableFiles = ctx.request.files;
          const formidableOptions = oasParameter.formidableOptions;
          const formidableErrors: MultipartError[] = [];
          body = ctx.request.body;

          for (const key in formidableFiles) {
            const formidableFile = formidableFiles[key];
            body[key] = formidableFile;

            const { maxFileSize, maxFiles } = formidableOptions?.[key] ?? {};
            if (maxFiles) {
              if (
                Array.isArray(formidableFile) &&
                formidableFile.length > maxFiles
              ) {
                formidableErrors.push(
                  new MultipartError({
                    field: key,
                    type: 'MAX_FILES_EXCEEDED'
                  })
                );
              }
            }

            if (maxFileSize) {
              let isValid: boolean;

              if (Array.isArray(formidableFile)) {
                isValid = formidableFile.every(
                  (file) => convertBytesToMegabytes(file.size) <= maxFileSize
                );
              } else {
                isValid =
                  convertBytesToMegabytes(formidableFile.size) <= maxFileSize;
              }

              if (!isValid) {
                formidableErrors.push(
                  new MultipartError({
                    field: key,
                    type: 'MAX_SIZE_EXCEEDED'
                  })
                );
              }
            }
          }

          if (formidableErrors.length > 0) {
            errors.push({
              type: 'multipart',
              oasParameter,
              value: formidableErrors,
              formidableFiles
            });
            continue;
          }
        } else {
          body = ctx.request.body;
        }

        const result = oasParameter.schema.safeParse(body);
        if (!result.success) {
          errors.push({ type: 'zod', value: result.error, oasParameter });
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
          errors.push({ type: 'zod', value: result.error, oasParameter });
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
          errors.push({ type: 'zod', value: result.error, oasParameter });
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
          ctx.body = { message: err.stack ?? err.message };
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
function convertBytesToMegabytes(bytes: number) {
  return bytes / (1024 * 1024);
}
