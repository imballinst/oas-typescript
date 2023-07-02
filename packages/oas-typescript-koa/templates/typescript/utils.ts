import Koa from 'koa';
import Router from '@koa/router';
import { z } from 'zod';
import { OpenAPIV3 } from 'openapi-types';

import { securitySchemes } from './security-schemes.js';
import { MiddlewareHelpers } from './middleware-helpers.js';

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
        let param: string | number = ctx.params[oasParameter.name];
        if (oasParameter.schema._def.typeName === 'ZodNumber') {
          param = Number(param);
        }

        const result = oasParameter.schema.safeParse(param);
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
      body: bodyParams?.value
    } as ParsedRequestInfo<OasParametersType>;
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
