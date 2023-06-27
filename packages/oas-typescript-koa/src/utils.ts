import Koa from 'koa';
import Router from '@koa/router';
import { z } from 'zod';

interface OasParameter {
  name: string;
  description?: string;
  type: 'Path' | 'Query' | 'Body' | 'Header';
  schema: z.ZodObject<any>;
}
type OasParameterWithValue<TValue = any> = OasParameter & { value: TValue };

type FilterArrayElementsByType<
  T extends readonly any[],
  TF extends T[number]['type']
> = Array<Extract<T[number], { type: TF }>>;

type FilterByParameterType<T extends readonly { type: string }[]> = {
  body: FilterArrayElementsByType<T, 'Body'>;
  queryParams: FilterArrayElementsByType<T, 'Query'>;
  pathParams: FilterArrayElementsByType<T, 'Path'>;
};

export class KoaGeneratedUtils {
  static parseRequestInfo<
    TPathParamsType,
    TQueryParamsType,
    THeaderParamsType,
    TBodyParamsType
  >({
    ctx,
    oasParameters
  }: {
    ctx: Koa.ParameterizedContext<
      Koa.DefaultState,
      Koa.DefaultContext &
        Router.RouterParamContext<Koa.DefaultState, Koa.DefaultContext>,
      unknown
    >;
    oasParameters: Array<{
      name: string;
      description?: string;
      type: 'Path' | 'Query' | 'Body' | 'Header';
      schema: z.ZodObject<any>;
    }>;
  }) {
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

    // TPathParamsType, TQueryParamsType, THeaderParamsType, TBodyParamsType
    return {
      pathParams: pathParams as Record<
        keyof TPathParamsType,
        OasParameterWithValue
      >,
      queryParams: queryParams as Record<
        keyof TQueryParamsType,
        OasParameterWithValue
      >,
      headerParams: headerParams as Record<
        keyof THeaderParamsType,
        OasParameterWithValue
      >,
      bodyParams: bodyParams as OasParameterWithValue<TBodyParamsType>
    };
  }
}
