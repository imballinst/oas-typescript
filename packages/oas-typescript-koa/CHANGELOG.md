# @oas-typescript/koa

## 0.12.2

### Patch Changes

- 0314b28: fix: fix utils in oas-typescript-koa emitting unnecessary stuff

## 0.12.1

### Patch Changes

- 91eaf7b: chore: bump dependency of openapi-zod-client

## 0.12.0

### Minor Changes

- 4a31928: feat: implement multer for file uploads and stuff

### Patch Changes

- 19c6f72: chore: allow reading from both YAML and JSON; refactor for preparation on parsing multipart/form-data

## 0.11.1

### Patch Changes

- 56f7ea6: chore: allow reading from both YAML and JSON; refactor for preparation on parsing multipart/form-data

## 0.11.0

### Minor Changes

- 3c5d3c5: feat: allow customizing validation body in parseRequestInfo

## 0.10.2

### Patch Changes

- fdcdacf: docs: update README, docs, etc.

## 0.10.1

### Patch Changes

- 042e3f5: chore: rename package names from rest to http
- 92d1912: fix: fix CLI indentation not being right

## 0.10.0

### Minor Changes

- 4bf3849: feat: implement express adapter, adjust other adapters

## 0.9.0

### Minor Changes

- c702df4: feat: allow parsing YAML in addition of JSON

### Patch Changes

- 7f67203: chore: refactor handlebars

## 0.8.3

### Patch Changes

- b2b3b02: fix: fix axios and koa generators silently requiring prettier

## 0.8.2

### Patch Changes

- 6b7e4e4: refactor: re-order the order of ctx.status and ctx.body

## 0.8.1

### Patch Changes

- 7afb101: chore: update docs

## 0.8.0

### Minor Changes

- 283c398: feat: directly pass headers instead of through ctx for security middleware
- 0d34396: feat: implement esm/cjs feature output

## 0.7.1

### Patch Changes

- 5ba11ca: chore: implement a centralized help text etc for API reference

## 0.7.0

### Minor Changes

- d46d8f4: feat: allow better DX with security middlewares, improve docs

### Patch Changes

- 6a9c04d: fix: fix app security related stuff not filtering properly

## 0.6.0

### Minor Changes

- cc69e56: feat: implement better typing for errors with default type

### Patch Changes

- cc69e56: fix: fix invalid types when using bodyParser and all other context stuff

## 0.5.10

### Patch Changes

- 9ea3d0b: fix: fix deliverables to npm

## 0.5.9

### Patch Changes

- 771b2f8: refactor: cut unnecessary logics, defer to logic of openapi-zod-client instead

## 0.5.8

### Patch Changes

- 3e437e0: fix: fix issues with regards to body typing and types stuff

## 0.5.7

### Patch Changes

- decd988: fix: fix controller not being able to parse properly

## 0.5.6

### Patch Changes

- ef1edc6: fix: fix security scheme path

## 0.5.5

### Patch Changes

- fix: fix json5 not being included as dependencies

## 0.5.4

### Patch Changes

- 58aa32c: fix: use the generated types from openapi-zod-client instead of generating it ourselves

## 0.5.3

### Patch Changes

- 95ae285: chore: update package.json of all packages

## 0.5.2

### Patch Changes

- fix: #36 fix CLI calling prettier using yarn, develop using Yarn modern, add changeset, change generated folder to static folder, dont create .new files on init
