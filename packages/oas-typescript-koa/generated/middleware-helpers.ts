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
    const helloworld = ctx.headers['helloworld'];

    return {
      status: helloworld === 'helloworld' ? 200 : 401
    };
  }
}
