export const defaultHandlebars = `import { z } from 'zod';

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
{{~{processFunctionParameter parameters}~}}
{{/each}}


export class {{options.apiClientName}} {
  {{#each endpoints}}
  {{operationId}} = ({{{getFunctionParameter operationId}}}) => {}
  {{/each}}
}
`
  