# oas-typescript-koa

oas-typescript-koa is a generator for [OpenAPI Specification 3](https://swagger.io/specification/v3/) to [koa](https://koajs.com/). This tool is powered by [openapi-zod-client](https://github.com/astahmer/openapi-zod-client) for the OAS parsing.

## Installation

It is recommended to install this as a project dependency so that it can be used in CI consistently.

```bash
# With npm.
npm install --save-dev @oas-typescript/koa

# With yarn.
yarn add -D @oas-typescript/koa
```

## CLI guide

<!-- @@SYNCAPI-START -->
| Option | Description | Default value |
| - | - | - |
|`--output`, `-o`|The output directory.|`(pwd)/oas-typescript`|
|`--app-security-schemes-field`|The security scheme field used in the OpenAPI Specification. Mostly useful when you have custom `securitySchemes` that are not supported by the specification.|`securitySchemes`|
|`--app-security-requirements-field`|The custom security requirements field used in the OpenAPI Specification. Mostly useful when you have custom `security` that are not supported by the specification.|`security`|
|`--module`|The output module. Available values are `cjs` or `esm`.|`esm`|
<!-- @@SYNCAPI-END -->

## Generating server stubs

To generate the server stubs, do this command:

```bash
npx oas-typescript-koa generate ./api.json --output generated

# Or, using yarn:
yarn oas-typescript-koa generate ./api.json --output generated

# Or, inside the `scripts` in package.json.
oas-typescript-koa generate ./api.json --output generated
```

The command above will read the Open API Specification `api.json` and output them to the `generated` folder. The result will be as the following.

```
generated
├── controllers
│   ├── PetController.ts
│   ├── StoreController.ts
│   └── UserController.ts
├── static
│   ├── checksum.json
│   ├── client.ts
│   ├── controller-types
│   │   ├── PetControllerTypes.ts
│   │   ├── StoreControllerTypes.ts
│   │   └── UserControllerTypes.ts
│   ├── security-schemes.ts
│   ├── router.ts
│   ├── types.ts
│   └── utils.ts
└── middleware-helpers.ts
```

All files are stubs, except the ones in `controllers` folder and `middleware-helpers.ts`, where you will need to insert your own logic. The latter is mostly used for validating authorization from the incoming request.

## More information

For further documentation, please visit the documentation: https://imballinst.github.io/oas-typescript/docs/nodejs-server-stubs/adapters/koa.