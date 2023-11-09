import Koa from 'koa';
import { SecuritySchemes } from './static/security-schemes.js';

export class MiddlewareHelpers {
  static async doAdditionalSecurityValidation(
    ctx: Koa.Context,
    securityObject: SecuritySchemes
  ) {
    // FIXME: use securityObject info.
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
