import { IncomingHttpHeaders } from 'http';
import { SecuritySchemes } from './static/security-schemes.js';
import { SecurityMiddlewareError } from './static/types.js';

export class MiddlewareHelpers {
  static async doAdditionalSecurityValidation(
    headers: IncomingHttpHeaders,
    securityObject: SecuritySchemes
  ): Promise<void> {
    return Promise.resolve();
  }
}
