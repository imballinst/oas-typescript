import Koa from 'koa';

export class MiddlewareHelpers {
  static async doAdditionalSecurityValidation(
    ctx: Koa.Context,
    scopes: string[] | undefined
  ) {
    return {
      status: 200
    };
  }
}
