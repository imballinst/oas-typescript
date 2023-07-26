# oas-swagger-ui

oas-swagger-ui is a customized version of the [Swagger UI distributables](https://github.com/swagger-api/swagger-ui/tree/master/dist). It is built on top of [swagger-ui-react](https://www.npmjs.com/package/swagger-ui-react).

## Demo

https://imballinst.github.io/oas-typescript/oas-swagger-ui

## Installation

### With package managers

This package is available in the npm registry, you can install it with the following.

```bash
# npm.
npm install --save @oas-typescript/swagger-ui

# Yarn.
yarn add @oas-typescript/swagger-ui
```

Example usage can be seen in this [examples/oas-swagger-ui](https://github.com/imballinst/oas-typescript/blob/main/examples/swagger-ui/src/App.tsx) folder.

### Static assets distributables

Since the original purpose of this package is to customize the Swagger UI distributables, the only way to "install" this package is by copying the [./dist](./dist) package to your project.

Example usage can be seen in this [oas-swagger-ui/dist](https://github.com/imballinst/oas-typescript/blob/main/packages/oas-swagger-ui/dist/index.html) folder. Since Swagger UI core bundle also allows for YAML parsing, there is also [an example to load a YAML OpenAPI Specification](https://github.com/imballinst/oas-typescript/blob/main/packages/oas-swagger-ui/dist/example-yaml.html).

## API

With package managers (React) and static assets distributables (vanilla JavaScript), the APIs are more or less the same. Initializing the Swagger UI require an object, with the form as the following.

```ts
{
  swaggerConfig: {
    // `url` and `spec` cannot exist together, only one of them can be set.
    url?: string;
    spec?: object;
    layout?: string;
    requestInterceptor?: (req: any) => any;
    responseInterceptor?: (req: any) => any;
    onComplete?: (system: any) => any;
    docExpansion?: 'list' | 'full' | 'none';
    supportedSubmitMethods?: Array<
      'get' | 'put' | 'post' | 'delete' | 'options' | 'head' | 'patch' | 'trace'
    >;
    queryConfigEnabled?: boolean;
    plugins?: Array<object> | Array<Function> | Function;
    displayOperationId?: boolean;
    showMutatedRequest?: boolean;
    defaultModelExpandDepth?: number;
    defaultModelsExpandDepth?: number;
    defaultModelRendering?: 'example' | 'model';
    presets?: Array<Function>;
    deepLinking?: boolean;
    showExtensions?: boolean;
    showCommonExtensions?: boolean;
    filter?: string | boolean;
    requestSnippetsEnabled?: boolean;
    requestSnippets?: object;
    tryItOutEnabled?: boolean;
    displayRequestDuration?: boolean;
    persistAuthorization?: boolean;
    withCredentials?: boolean;
    oauth2RedirectUrl?: string;
  };
  oasSwaggerUiConfig?: {
    security?: {
      badgesField?: string;
      badgesDefaultValue?: Array<{ label: string; value?: string }>;
      badgesProcessFn?: (
        securityKey: string,
        value?: string[]
      ) => Array<{ label: string; value?: string }>;
    }
  };
}
```

### With package managers

```tsx
import { OasSwaggerUi } from '@oas-typescript/swagger-ui'

<OasSwaggerUi
  swaggerConfig={...}
  oasSwaggerUiConfig={...}
/>
```

### Static assets distributables

```ts
declare global {
  interface Window {
    renderSwaggerUi: (param: {
      swaggerConfig: DefaultSwaggerUiConfig;
      oasSwaggerUiConfig?: OasSwaggerUiConfig;
    }) => void;
  }
}
```

## Special customizations with `oasSwaggerUiConfig`

As we noticed from the API reference above, `swaggerConfig` is the default Swagger UI configs. However, `oasSwaggerUiConfig` is a new config for the customization. More to that in the following sections.

### Showing authorizations and permissions

[Before OAS 3.1.0](https://spec.openapis.org/oas/v3.1.0#patterned-fields-2), we are not allowed to define permissions in the security endpoint object. To help with that, we can define a field called `x-security` (for example), with the exact same form as `security`. This field is following the specification of `security` object in OAS 3.1.0.

> For other security scheme types, the array MAY contain a list of role names which are required for the execution, but are not otherwise defined or exchanged in-band.

As the quote above suggests, previously the array in each of the `security` object only allows OAuth2 scopes. However, with OAS 3.1.0, we can specify things such as required roles, e.g. `admin` (or other authorization-related entries). For example, the following means the endpoint requires the permission `admin:pet`:

```json
{
  "x-security": [
    {
      "authorization": ["admin:pet"]
    }
  ]
}
```

To re-iterate, if you are already using OAS 3.1.0, you won't need to use specification extension, you can just use `security` directly.

For `oas-swagger-ui` to work with the enhanced view for the security stuff, it needs 3 variables in the `oasSwaggerUiConfig.security` field:

1. `badgesField`: this is to define which field we're going to use.
2. `badgesDefaultValue`: this is to define the initial value of the badges, without the scopes/permissions stuff. This defaults to `[]` when not defined. Note that default badge object is of type `{ label: string, value?: string }`.
3. `badgesProcessFn`: this is the function to process the security field.

Then, run the UI and see that there will be badges above each of the endpoint description!
