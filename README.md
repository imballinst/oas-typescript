# oas-typescript

This repository contains a collection of OpenAPI to TypeScript generators. This project is inspired by [openapi-zod-client](https://github.com/astahmer/openapi-zod-client).

## Motivation

The motivation of this project was, I was trying to generate a server stubs for TypeScript (with Zod for validation) using OpenAPI Specification. I found out the solution within `openapi-zod-client`, however it uses `zodios` which I am not quite familiar with, and I also want to take advantage of `security` fields and all other annotations.

And hence, this project was born.

## Available packages

| Package name                 | Description                                                                                                |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `@oas-typescript/swagger-ui` | Enhanced wrapper to `swagger-ui-react`. Supports vanilla HTML deliverables and React via package managers. |
| `@oas-typescript/axios`      | Axios and zod generator from OpenAPI specification.                                                        |
| `@oas-typescript/koa`        | Koa routers and zod generator from OpenAPI specification.                                                  |
| `@oas-typescript/express`    | Express routers and zod generator from OpenAPI specification.                                              |

## Examples

To see the example, go to the [examples](./examples) folder. This folder contains the OpenAPI Specification (we are using Pet Store with OAS 3 from Swagger). From the specification, we generate the server stubs into the [examples/axios-koa/src/server/generated](./examples/axios-koa/src/server/generated) folder.

### Running the Koa server

```bash
# Execute these inside the examples/axios-koa folder.
yarn
yarn build
# We are using pm2 to manage the process.
yarn start
```

### Testing

```bash
# Run this in each package inside `packages`.
yarn test
```

## License

MIT
