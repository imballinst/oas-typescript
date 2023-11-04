import Koa from 'koa';
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
    if (!ctx.request.headers.helloworld) {
      return {
        status: 401
      };
    }

    return {
      status: 200
    };
  }
}
