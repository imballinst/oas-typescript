// Original source from https://github.com/swagger-api/swagger-ui/tree/master.
// All credits belong to Swagger UI maintainers and contributors.
//
// This file is adjusted so that the Operation component can be overriden, because as it is,
// it is super hard to inject a plugin to a specific part in the description.

import Im from 'immutable';
import { sanitizeUrl as braintreeSanitizeUrl } from '@braintree/sanitize-url';

export function sanitizeUrl(url: string) {
  if (typeof url !== 'string' || url === '') {
    return '';
  }

  return braintreeSanitizeUrl(url);
}

export const getExtensions = (defObj: any) =>
  defObj.filter((_: any, k: any) => /^x-/.test(k));

const createDeepLinkPath = (str: any) =>
  typeof str == 'string' || str instanceof String
    ? str.trim().replace(/\s/g, '%20')
    : '';
export const escapeDeepLinkPath = (str: string) =>
  CSS.escape(createDeepLinkPath(str).replace(/%20/g, '_'));

export function getList(iterable: any, keys: any) {
  if (!Im.Iterable.isIterable(iterable)) {
    return Im.List();
  }
  let val = iterable.getIn(Array.isArray(keys) ? keys : [keys]);
  return Im.List.isList(val) ? val : Im.List();
}
