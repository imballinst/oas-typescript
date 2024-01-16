export const defaultHandlebars = `{{!--
  We basically don't do anything here with \`processFunctionParameter\`, we just want to make sure
  that we process the function parameters, so that in next lines we can just use the "cached ones".
--}}
{{#each endpoints}}
{{~{processFunctionParameter parameters}~}}
{{/each}}

import { z } from 'zod';
{{{getAxiosImports}}}
{{{getRequestUtilsImport}}}

{{#if imports}}
{{#each imports}}
import { {{{@key}}} } from './{{{this}}}'
{{/each}}
{{/if}}


{{#if types}}
{{#each types}}
{{{this}}};
{{/each}}
{{/if}}

// Schemas.
{{#each schemas}}
export const {{@key}}{{#if (lookup ../circularTypeByName @key)}}: z.ZodType<{{@key}}>{{/if}} = {{{this}}};
export interface {{@key}} extends z.infer<typeof {{@key}}> {}
{{/each}}

{{#each endpoints}}
{{{getFunctionParameterDeclaration operationId}}}
{{{getResponseDeclaration operationId}}}

{{!-- Intentional empty line here, which will be prettified by Prettier anyway. --}}
{{/each}}


export function {{options.apiClientName}}({
  defaultAxiosRequestConfig
}: {
  defaultAxiosRequestConfig?: AxiosRequestConfig
}) {
  {{#each endpoints}}
  async function {{operationId}}({{{getFunctionParameter operationId}}}): {{{getFunctionReturnType operationId}}} {
    {{{getFunctionContent operationId}}}
    
    {{{getFunctionReturns operationId}}}
  }
  {{/each}}

  return {
    {{#each endpoints}}
    {{operationId}},
    {{/each}}    
  }
}
`

export const defaultRequestUtils = `import { AxiosRequestConfig } from 'axios';

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
      searchParams.append(name, \`\${value}\`);
    }
  }

  return \`?\${searchParams.toString()}\`;
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
`
  