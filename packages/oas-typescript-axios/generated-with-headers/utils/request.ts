import { AxiosRequestConfig } from 'axios';

export function getQueryParameterString(
  query: Record<string, string | string[] | number | undefined>
) {
  const searchParams = new URLSearchParams();
  const keys = Object.keys(query);

  if (keys.length === 0) {
    return '';
  }

  for (const name in query) {
    const value = query[name];
    if (!value) continue;

    if (Array.isArray(value)) {
      for (const item of value) {
        searchParams.append(name, item);
      }
    } else {
      searchParams.append(name, `${value}`);
    }
  }

  return `?${searchParams.toString()}`;
}

export function getFinalUrlAndRequestConfig({
  url,
  queryParameters,
  headers,
  method,
  defaultAxiosRequestConfig,
  axiosRequestConfig
}: {
  url: string;
  queryParameters?: Record<string, string | string[]>;
  headers?: Record<string, string>;
  method: string;
  defaultAxiosRequestConfig?: AxiosRequestConfig;
  axiosRequestConfig?: AxiosRequestConfig;
}) {
  const config = {
    ...defaultAxiosRequestConfig,
    ...axiosRequestConfig,
    headers: {
      ...defaultAxiosRequestConfig?.headers,
      ...axiosRequestConfig?.headers,
      ...headers
    },
    method
  };

  let finalUrl = url;
  finalUrl += getQueryParameterString(queryParameters || {});

  return {
    url: finalUrl,
    config
  };
}
