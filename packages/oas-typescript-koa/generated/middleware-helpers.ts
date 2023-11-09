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
    let isValid = true;

    if (securityObject.api_key) {
      const apiKeyInHeader = ctx.headers[securityObject.api_key.meta.name];

      if (!apiKeyInHeader) {
        isValid = false;
      } else {
        // Example.
        isValid = apiKeyInHeader === 'helloworld';
      }
    }

    if (!isValid) {
      return Promise.reject(
        new SecurityMiddlewareError({
          status: 401,
          body: { message: 'invalid credentials' }
        })
      );
    }

    return Promise.resolve();
  }
}
