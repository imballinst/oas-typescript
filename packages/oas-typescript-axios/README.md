# oas-typescript-axios

oas-typescript-axios is a generator for [OpenAPI Specification 3](https://swagger.io/specification/v3/) to [axios](https://axios-http.com/docs/intro). This tool is powered by [openapi-zod-client](https://github.com/astahmer/openapi-zod-client) for the OAS parsing.

## Installation

It is recommended to install this as a project dependency so that it can be used in CI consistently.

```bash
# With npm.
npm install --save-dev @oas-typescript/axios

# With yarn.
yarn add -D @oas-typescript/axios
```

## CLI guide

```
Usage
  $ openapi-to-axios generate <path-to-openapi-json>

Options
  --output, -o                  Specify a place for output, defaults to (pwd)/generated.
  --headers, -h                 When this flag is set, response will be in the form of AxiosResponse.

Examples
  $ openapi-to-axios generate ./openapi/api.json --output src/generated
  $ openapi-to-axios generate ./openapi/api.json --output src/generated --headers
```

## Generating API client

To generate an API client, do this command:

```bash
# Do this using the "scripts" in package.json.
openapi-typescript-axios generate ./api.json --output generated
```

The command above will read the Open API Specification `api.json` and output them to the `generated` folder. The result will be as the following.

```
generated
├── index.ts
├── pet.ts
├── store.ts
├── user.ts
└── utils
    └── query.ts
```
