import { KoaBodyMiddlewareOptions } from 'koa-body';
import path from 'path';

export class KoaMiddlewareHelpers {
  static createKoaBodyMiddlewareOptions = (
    defaultOpts?: Partial<KoaBodyMiddlewareOptions>
  ): Partial<KoaBodyMiddlewareOptions> | undefined => {
    return {
      ...defaultOpts,
      formidable: {
        uploadDir: path.join(process.cwd(), 'tests/uploads')
      }
    };
  };
}
