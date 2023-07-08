# oas-typescript

This repository contains a collection of OpenAPI to TypeScript generators. This project is inspired by [openapi-zod-client](https://github.com/astahmer/openapi-zod-client).

## Motivation

The motivation of this project was, I was trying to generate a server stubs for TypeScript using OpenAPI Specification. I found out the solution within `openapi-zod-client`, however I couldn't find out the use of `operationId` and `security` field, which I sorely needed.

And hence, this project was born.

## Examples

To see the example, go to the [examples](./examples) folder. This folder contains the OpenAPI Specification (we are using Pet Store with OAS 3 from Swagger). From the specification, we generate the server stubs into the [examples/generated](./examples/generated) folder.

### Running the server

```bash
yarn
# We are using pm2 to manage the process.
yarn start
```

### Testing

```bash
yarn test
```

## License

MIT
