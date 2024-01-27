import { KoaBodyMiddlewareOptions } from 'koa-body';

export class KoaMiddlewareHelpers {
  static createKoaBodyMiddlewareOptions = (
    defaultOpts?: Partial<KoaBodyMiddlewareOptions>
  ): Partial<KoaBodyMiddlewareOptions> | undefined => {
    return defaultOpts;
  };
}
