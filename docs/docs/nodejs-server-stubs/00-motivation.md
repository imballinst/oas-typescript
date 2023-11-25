---
---

# Motivation

The motivation behind generating server stubs was consistency. There are probably 3 ways to produce an OpenAPI/Swagger specification:

1. Generate it from implementation code (e.g. using JSDoc),
2. Write it manually, or
3. Generate from some other specifications (e.g. Proto Buffers with [protoc-gen-openapiv2](https://github.com/grpc-ecosystem/grpc-gateway/tree/main/protoc-gen-openapiv2)).

The ideal part would be to use Protocol Buffers, because it is a rather universal language and we can generate almost anything from it. However, in cases where we don't want to use Protocol Buffers for some reasons, we will need to write the OpenAPI/Swagger specifications manually.

What is the reason to not generating OpenAPI/Swagger specification from implementation code? The reason is one: consistency. When we update our code, sure, we update the actual behavior. However, there may be cases where we have updated our code, but somehow we forget to update the JSDoc that generates the OpenAPI specification. This will result in the actual behavior from the service being different than the written specification.

In some cases, it may cause a page to not work, whereas in some other cases, it may cause a page to crash. For example, there is a migration from a field named `players` to say, `users`. However, we only updated the implementation code and leave the OpenAPI/Swagger specification as-is. If there are developers using our OpenAPI/Swagger specifications as the source of truth, this is dangerous because they will not know that the API contract has changed.

As such, design-first can be really good to prevent that kind of thing from happening.
