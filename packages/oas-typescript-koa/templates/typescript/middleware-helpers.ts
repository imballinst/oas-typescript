import Koa from 'koa';
import { SecuritySchemes } from './static/security-schemes.js';

export class MiddlewareHelpers {
  static async doAdditionalSecurityValidation(
    ctx: Koa.Context,
    securityObject: SecuritySchemes
  ) {
    return {
      status: 200
    };
  }
}
