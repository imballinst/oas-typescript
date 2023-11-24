import { SecuritySchemes } from './static/security-schemes.js';
import { SecurityMiddlewareError } from './static/types.js';
import { IncomingHttpHeaders } from 'http';

// @@@SNIPSTART middleware-helpers-express {"highlightedLines": "{6-26}"}
export class MiddlewareHelpers {
  static async doAdditionalSecurityValidation(
    headers: IncomingHttpHeaders,
    securityObject: SecuritySchemes
  ): Promise<void> {
    let isValid = true;

    if (securityObject.api_key) {
      const apiKeyInHeader = headers[securityObject.api_key.meta.name];

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
// @@@SNIPEND