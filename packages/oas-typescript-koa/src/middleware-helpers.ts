import Koa from 'koa';
import Router from '@koa/router';

export class MiddlewareHelpers {
  static async doAdditionalSecurityValidation(
    ctx: Koa.ParameterizedContext<
      Koa.DefaultState,
      Koa.DefaultContext &
        Router.RouterParamContext<Koa.DefaultState, Koa.DefaultContext>,
      unknown
    >
  ) {
    return {
      status: 200
    };
  }
}
