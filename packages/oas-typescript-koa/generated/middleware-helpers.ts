import Koa from 'koa';

export class MiddlewareHelpers {
  static async doAdditionalSecurityValidation(
    ctx: Koa.Context,
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
