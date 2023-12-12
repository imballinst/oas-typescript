import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

import { MiddlewareHelpers } from '../middleware-helpers';
import { SecuritySchemes } from './security-schemes';
import { SecurityMiddlewareError, OasParameter } from './types';

export interface OasParameter {
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

export class ExpressGeneratedUtils {
  static parseRequestInfo<OasParametersType extends readonly OasParameter[]>({
    request,
    response,
    oasParameters
  }: {
    request: Request;
    response: Response;
    oasParameters: OasParametersType;
  }): ParsedRequestInfo<OasParametersType> | undefined {
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
        let param: string | number = request.params[oasParameter.name];
        if (oasParameter.schema._def.typeName === 'ZodNumber') {
          param = Number(param);
        }

        const result = oasParameter.schema.safeParse(param);
        if (!result.success) {
          errors.push({ zodError: result.error, oasParameter });
          continue;
        }

        pathParams[oasParameter.name] = request.params[oasParameter.name];
        continue;
      }

      if (oasParameter.type === 'Body') {
        const body = request.body;
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
          request.query[oasParameter.name]
        );
        if (!result.success) {
          errors.push({ zodError: result.error, oasParameter });
          continue;
        }

        queryParams[oasParameter.name] = request.query[oasParameter.name];
        continue;
      }

      if (oasParameter.type === 'Header') {
        const result = oasParameter.schema.safeParse(
          request.headers[oasParameter.name]
        );
        if (!result.success) {
          errors.push({ zodError: result.error, oasParameter });
          continue;
        }

        headerParams[oasParameter.name] = request.headers[oasParameter.name];
        continue;
      }
    }

    if (errors.length > 0) {
      response.status(400).send(
        MiddlewareHelpers.processZodErrorValidation({
          path: request.path,
          errors
        })
      );
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
    return async (request: Request, response: Response, next: NextFunction) => {
      try {
        await MiddlewareHelpers.doAdditionalSecurityValidation(
          request.headers,
          security
        );

        next();
      } catch (err) {
        if (err instanceof SecurityMiddlewareError) {
          const { content } = err;

          response.status(content.status).send(content.body);
          return;
        }

        if (err instanceof Error) {
          response.status(500).send({ message: err.stack || err.message });
          return;
        }

        response.status(500).send({ message: 'Internal server error' });
      }
    };
  }
}
