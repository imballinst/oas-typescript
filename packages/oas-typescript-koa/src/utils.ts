import Koa from 'koa';
import Router from '@koa/router';
import { z } from 'zod';

export interface OasSecurity {
  [name: string]: string[] | undefined;
}

interface OasParameter {
  name: string;
  description?: string;
  type: 'Path' | 'Query' | 'Body' | 'Header';
  schema: z.ZodSchema;
}

type ExtractMatchingType<
  TArray extends readonly OasParameter[],
  Type extends TArray[number]['type']
> = Extract<TArray[number], { type: Type }>;

type ExtractFilteredRecordFromArray<
  TArray extends readonly OasParameter[],
  Type extends TArray[number]['type']
> = {
  [K in ExtractMatchingType<TArray, Type>['name']]: z.output<
    ExtractMatchingType<TArray, Type>['schema']
  >;
};

export interface ParsedRequestInfo<
  OasParametersType extends readonly OasParameter[]
> {
  body: z.output<ExtractMatchingType<OasParametersType, 'Body'>['schema']>;
  pathParams: ExtractFilteredRecordFromArray<OasParametersType, 'Path'>;
  headerParams: ExtractFilteredRecordFromArray<OasParametersType, 'Header'>;
  queryParams: ExtractFilteredRecordFromArray<OasParametersType, 'Query'>;
}

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
        const result = oasParameter.schema.safeParse(
          ctx.params[oasParameter.name]
        );
        if (!result.success) {
          ctx.status = 400;
          return;
        }

        pathParams[oasParameter.name] = ctx.params[oasParameter.name];
        continue;
      }

      if (oasParameter.type === 'Body') {
        const body = ctx.body as any;
        const result = oasParameter.schema.safeParse(body);
        if (!result.success) {
          ctx.status = 400;
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
      body: bodyParams!.value
    } as ParsedRequestInfo<OasParametersType>;
  }
}
