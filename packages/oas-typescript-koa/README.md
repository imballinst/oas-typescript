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

```
Usage
  $ openapi-to-koa generate <path-to-openapi-json>

Options
  --output, -o                  Specify a place for output, defaults to (pwd)/generated.
  --app-security-field, -a      Specify the custom security field used in the backend application.
                                Mostly useful when you have role names in the application, in which
                                these roles are required to do the operation. You might not need this
                                parameter if you are using OpenAPI Specification v3.1.0. Reference:
                                https://spec.openapis.org/oas/v3.1.0#patterned-fields-2.

Examples
  $ openapi-to-koa generate ./openapi/api.json --output src/generated
  $ openapi-to-koa generate ./openapi/api.json --output src/generated --app-security-field x-security
```

## Generating server stubs

To generate the server stubs, do this command:

```bash
# Do this using the "scripts" in package.json.
openapi-typescript-koa generate ./api.json --output generated
```

The command above will read the Open API Specification `api.json` and output them to the `generated` folder. The result will be as the following.

```
generated
├── controllers
│   ├── PetController.ts
│   ├── StoreController.ts
│   └── UserController.ts
├── generated
│   ├── checksum.json
│   ├── client.ts
│   ├── controller-types
│   │   ├── PetControllerTypes.ts
│   │   ├── StoreControllerTypes.ts
│   │   └── UserControllerTypes.ts
│   ├── security-schemes.ts
│   ├── server.ts
│   ├── types.ts
│   └── utils.ts
├── middleware-helpers.ts
└── server.ts
```

All files are stubs, except the ones in `controllers` folder and `middleware-helpers.ts`, where you will need to insert your own logic. The latter is mostly used for validating authorization from the incoming request.
