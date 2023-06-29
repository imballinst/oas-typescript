import Koa from 'koa';
import Router from '@koa/router';

type KoaCtx = Koa.ParameterizedContext<
  Koa.DefaultState,
  Koa.DefaultContext &
    Router.RouterParamContext<Koa.DefaultState, Koa.DefaultContext>,
  unknown
>;

export class MiddlewareHelpers {
  static async doAdditionalSecurityValidation(ctx: KoaCtx) {
    return {
      status: 200
    };
  }

  static async createSecurityMiddleware(ctx: KoaCtx, next: Koa.Next) {
    const { status } = await MiddlewareHelpers.doAdditionalSecurityValidation(
      ctx
    );

    if (status !== 200) {
      ctx.status = status;
      return;
    }

    next();
  }
}
