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

// Endpoints.
{{#each endpoints}}
export const {{#capitalizeFirstLetter}}{{operationId}}{{/capitalizeFirstLetter}}Parameters = [
  {{#if parameters}}
  {{#each parameters}}
  { 
    name: '{{name}}',
    {{#if description}}
    description: \`{{description}}\`,
    {{/if}}
    {{#if type}}
    type: '{{type}}',
    {{/if}}
    schema: {{{schema}}}
  },
  {{/each}}
  {{/if}}
] as const
{{#if security}}
export const {{#capitalizeFirstLetter}}{{operationId}}{{/capitalizeFirstLetter}}Security = {{{security}}}
{{/if}}
{{#if response}}
export const {{#capitalizeFirstLetter}}{{operationId}}{{/capitalizeFirstLetter}}Response = {{{response}}}
{{/if}}
export const {{#capitalizeFirstLetter}}{{operationId}}{{/capitalizeFirstLetter}}Errors = [
{{#if errors}}  
  {{#each errors}}
  {
    {{#ifeq status "default" }}
    status: "default",
    {{else}}
    status: {{status}},
    {{/ifeq}}
    {{#if description}}
    description: \`{{description}}\`,
    {{/if}}
    schema: {{{schema}}}
  },
  {{/each}}
{{/if}}
] as const

{{/each}}`
  