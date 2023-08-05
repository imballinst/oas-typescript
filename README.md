# oas-typescript

This repository contains a collection of OpenAPI to TypeScript generators. This project is inspired by [openapi-zod-client](https://github.com/astahmer/openapi-zod-client).

## Motivation

The motivation of this project was, I was trying to generate a server stubs for TypeScript using OpenAPI Specification. I found out the solution within `openapi-zod-client`, however it uses `zodios` which I am not quite familiar with, and I also want to take advantage of `security` fields and all other annotations.

And hence, this project was born.

## Examples

To see the example, go to the [examples](./examples) folder. This folder contains the OpenAPI Specification (we are using Pet Store with OAS 3 from Swagger). From the specification, we generate the server stubs into the [examples/koa/generated](./examples/koa/generated) folder.

### Running the Koa server

```bash
# Execute these inside the examples/koa folder.
yarn
# We are using pm2 to manage the process.
yarn start
```

### Testing

```bash
yarn test
```

## Other available packages

1. [oas-swagger-ui](https://imballinst.github.io/oas-typescript/oas-swagger-ui/), an enhanced Swagger UI to show richer experience.

## License

MIT
