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

## Generating server stubs

To generate the server stubs, do this command:

```bash
# Do this using the "scripts" in package.json.
openapi-typescript-koa ./api.json --output generated
```

The command above will read the Open API Specification `api.json` and output them to the `generated` folder. The result will be as the following.

```
generated
├── client.ts
├── controllers
│   ├── PetController.ts
│   ├── StoreController.ts
│   └── UserController.ts
├── middleware-helpers.ts
├── security-schemes.ts
├── server.ts
└── utils.ts
```

All files are stubs, except the ones in `controllers` folder and `middleware-helpers.ts`, where you will need to insert your own logic. The latter is mostly used for validating authorization from the incoming request.
