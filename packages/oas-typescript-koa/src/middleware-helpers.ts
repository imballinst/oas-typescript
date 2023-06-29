import Koa from 'koa';
import Router from '@koa/router';

import { securitySchemes } from './security-schemes';
import { OpenAPIV3 } from 'openapi-types';
import { OasSecurity } from './utils';

type KoaCtx = Koa.ParameterizedContext<
  Koa.DefaultState,
  Koa.DefaultContext &
    Router.RouterParamContext<Koa.DefaultState, Koa.DefaultContext>,
  unknown
>;

const securitySchemeWithOauthScope =
  findSecuritySchemeWithOauthScope(securitySchemes);

export class MiddlewareHelpers {
  static async doAdditionalSecurityValidation(
    ctx: KoaCtx,
    scopes: string[] | undefined
  ) {
    return {
      status: 200
    };
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
