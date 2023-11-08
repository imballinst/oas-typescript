---
---

# Usage

In the previous section, you have learned how to generate the server stubs. The following is the file tree result if you are generating the server stubs of the [slightly adjusted Pet Store OpenAPI Specification 3.0](https://github.com/imballinst/oas-typescript/blob/main/packages/shared/src/openapi/api.json).

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
├── middleware-helpers.ts
└── server.ts
```

Before we dive deeper into each parts, here is the general flow on how a request is processed using the server stubs.

```mermaid
graph LR;
    ((Server Receives Request))-->Router;
    Router-->Security Middleware (optional);
    Security Middleware (optional)-->Request Validator;
    Request Validator-->Controller;
    Controller-->((Return Response to Client));
```

The amazing thing about `@oas-typescript/koa` is that, you don't need to worry about most of the parts above. You only need to worry about "Security Middleware (optional)" and "Controller". The rest will be handled by the generated server stubs.

## Router

:::note
This is part of the server stubs, so you don't have to do anything here.
:::

First things first, router will receive request from the client. These routers are generated from the `paths` object in the OpenAPI Specification. These routers will gather up information inside `ctx` and then pass it to the security middleware, depending on whether `security` field or the field that you specified in `--app-security-field` exist or not in the operation object.

## Security Middleware (optional)

<!-- TODO: fix the example. -->

The default security middleware looks like this.

```ts
import Koa from 'koa';

export class MiddlewareHelpers {
  static async doAdditionalSecurityValidation(
    ctx: Koa.Context,
    scopes: string[] | undefined
  ) {
    return {
      status: 200
    };
  }
}
```

The function receives `ctx` and `scopes`, the former comes from Koa whereas the latter comes from the OpenAPI specification. Here, you can do various validations, for example, if you want to validate the cookie here, you can do so by extracting the cookie value from `ctx`, then use the information from the `scopes` to determine whether the client has sufficient permissions or not.

If you return a rejected Promise in this function, you will need to specify the `status` and the `body` which the server will send to the client. Otherwise, this middleware will pass along to the next process.

## Request validator

:::note
This is part of the server stubs, so you don't have to do anything here.
:::

Inside request validator, the following will be validated:

- From `parameters` in operation object: path parameters, query parameters, cookie, headers.
- From `requestBody` in operation object: request body

If any of them are specified as `required` in the specification but is missing from the request, then it will return `400 Bad Request`.

## Controller

Now, to the last one, controller. Inside controller, the data is already considered "sanitized", which means, all of the variables are already type-safe. Here, you will want to return an object consisting of at least `status`. The base controller looks like this.

```ts
export class PetController {
  static addPet: AddPetControllerFunction = (params) => {
    return {
      body: undefined,
      status: undefined
    };
  };
}
```

So here, we have a `PetController`, which is named after `<tag>Controller`. So, if you have a tag named "User", then it will be `UserController`. Inside this, you will want to do the endpoint operations. Using the `addPet` above, we can have a very simplified example.

```ts
const db: Pet[] = []

export class PetController {
  static addPet: AddPetControllerFunction = (params) => {
    const existingPet = db.find((row) => row.name === params.body.name);
    if (existingPet) {
      return {
        status: 405,
        body: {}
      };
    }

    db.push(params.body);

    return {
      body: params.body,
      status: 200
    };
  };
}
```

So, what we're doing here is that, we specify an in-memory database for a list of pets. Then, when someone wants to add a pet, we check first in the database if there's a pet with an existing pet or not. If it exists, then return a response with status `405` an empty object. We need to return an empty object because otherwise, Koa will deduce it as `204 No Content` instead.

There's that! With `@oas-typescript/koa`, you will cut a lot of time implementing a server. With an OpenAPI 3.0 Specification, all you need are only implementing the security process and the controllers. By going design-first, we also prevent specification and actual server response mismatch.