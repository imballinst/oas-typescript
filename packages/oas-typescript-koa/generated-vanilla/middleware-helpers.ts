import { IncomingHttpHeaders } from 'http';
import { z } from 'zod';

import { SecuritySchemes } from './static/security-schemes.js';
import { OasParameter } from './static/utils.js';
import { SecurityMiddlewareError } from './static/types.js';

export class MiddlewareHelpers {
  static async doAdditionalSecurityValidation(
    headers: IncomingHttpHeaders,
    securityObject: SecuritySchemes
  ): Promise<void> {
    return Promise.resolve();
  }

  static async processZodErrorValidation({
    path,
    errors
  }: {
    path: string;
    errors: Array<{
      zodError: z.ZodError;
      oasParameter: OasParameter;
    }>;
  }) {
    return {};
  }
}
