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
type OasParameterWithValue<TValue = any> = OasParameter & { value: TValue };

type FilterArrayElementsByType<
  T extends readonly { name: string; type: string }[],
  TF extends T[number]['type']
> = Record<
  Extract<T[number], { type: TF }>['name'],
  Extract<T[number], { type: TF }>
>;

export type FilterByParameterType<
  T extends readonly { type: string; name: string }[]
> = {
  body: Extract<T[number], { type: 'Body' }>;
  queryParams: FilterArrayElementsByType<T, 'Query'> | undefined;
  pathParams: FilterArrayElementsByType<T, 'Path'> | undefined;
  headerParams: FilterArrayElementsByType<T, 'Header'> | undefined;
};

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
  }): FilterByParameterType<OasParametersType> | undefined {
    const pathParams: Record<string, OasParameterWithValue> = {};
    const queryParams: Record<string, OasParameterWithValue> = {};
    const headerParams: Record<string, OasParameterWithValue> = {};
    let bodyParams: OasParameterWithValue | undefined = undefined;

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

        pathParams[oasParameter.name] = {
          ...oasParameter,
          value: ctx.params[oasParameter.name]
        };
        continue;
      }

      if (oasParameter.type === 'Body') {
        const body = ctx.body as any;
        const result = oasParameter.schema.safeParse(body);
        if (!result.success) {
          ctx.status = 400;
          return;
        }

        bodyParams = { ...oasParameter, value: body };
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

        queryParams[oasParameter.name] = {
          ...oasParameter,
          value: ctx.query[oasParameter.name]
        };
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

        headerParams[oasParameter.name] = {
          ...oasParameter,
          value: ctx.headers[oasParameter.name]
        };
        continue;
      }
    }

    return {
      pathParams:
        pathParams as unknown as FilterByParameterType<OasParametersType>['pathParams'],
      queryParams:
        queryParams as unknown as FilterByParameterType<OasParametersType>['queryParams'],
      headerParams:
        headerParams as unknown as FilterByParameterType<OasParametersType>['headerParams'],
      body: bodyParams as unknown as FilterByParameterType<OasParametersType>['body']
    };
  }
}
