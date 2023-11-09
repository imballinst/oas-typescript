import Koa from 'koa';
import { SecuritySchemes } from './static/security-schemes.js';

export class SecurityMiddlewareError extends Error {
  content: { status: number; body: any };

  constructor({ body, status }: { status: number; body: any }) {
    super();

    this.content = { status, body };
  }
}

export class MiddlewareHelpers {
  static async doAdditionalSecurityValidation(
    ctx: Koa.Context,
    securityObject: SecuritySchemes
  ): Promise<void> {
    return Promise.resolve();
  }
}
