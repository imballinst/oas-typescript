import { IncomingHttpHeaders } from 'http';

import { SecuritySchemes } from './static/security-schemes.js';
import { ParametersError } from './static/utils.js';
import { SecurityMiddlewareError } from './static/types.js';

enum ParseRequestErrors {
  INVALID_PATH_PARAMETER = '10000',
  INVALID_BODY = '10001',
  INVALID_QUERY_PARAMETER = '10002',
  INVALID_HTTP_HEADER = '10003'
}
const ParseRequestErrorsMessage: Record<ParseRequestErrors, string> = {
  [ParseRequestErrors.INVALID_PATH_PARAMETER]: 'invalid path parameter',
  [ParseRequestErrors.INVALID_BODY]: 'invalid body',
  [ParseRequestErrors.INVALID_QUERY_PARAMETER]: 'invalid query parameter',
  [ParseRequestErrors.INVALID_HTTP_HEADER]: 'invalid http header'
};

// @@@SNIPSTART middleware-helpers {"highlightedLines": "{6-26}"}
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

  static processZodErrorValidation({
    errors
  }: {
    path: string;
    errors: Array<ParametersError>;
  }) {
    // Take only the first one.
    const error = errors[0];
    const oasParameter = errors[0].oasParameter;
    const errorCode =
      oasParameter.type === 'Body'
        ? ParseRequestErrors.INVALID_BODY
        : oasParameter.type === 'Header'
        ? ParseRequestErrors.INVALID_HTTP_HEADER
        : oasParameter.type === 'Query'
        ? ParseRequestErrors.INVALID_QUERY_PARAMETER
        : ParseRequestErrors.INVALID_PATH_PARAMETER;

    return {
      code: errorCode,
      message: ParseRequestErrorsMessage[errorCode],
      detail: error.type === 'zod' ? error.value.errors : error.value
    };
  }
}
// @@@SNIPEND
