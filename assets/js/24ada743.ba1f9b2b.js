"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[832],{8147:(p,s,n)=>{n.r(s),n.d(s,{assets:()=>c,contentTitle:()=>d,default:()=>u,frontMatter:()=>a,metadata:()=>l,toc:()=>h});var e=n(5893),o=n(1151);const a={},d="Usage",l={id:"nodejs-server-stubs/concepts",title:"Usage",description:"In the previous section, you have learned how to generate the server stubs. The following is the file tree result if you are generating the server stubs of the slightly adjusted Pet Store OpenAPI Specification 3.0.",source:"@site/docs/nodejs-server-stubs/01-concepts.md",sourceDirName:"nodejs-server-stubs",slug:"/nodejs-server-stubs/concepts",permalink:"/oas-typescript/docs/nodejs-server-stubs/concepts",draft:!1,unlisted:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/nodejs-server-stubs/01-concepts.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{},sidebar:"gettingStartedSidebar",previous:{title:"Motivation",permalink:"/oas-typescript/docs/nodejs-server-stubs/motivation"},next:{title:"@oas-typescript/koa",permalink:"/oas-typescript/docs/nodejs-server-stubs/adapters/koa"}},c={},h=[{value:"Router",id:"router",level:2},{value:"Security Middleware (optional)",id:"security-middleware-optional",level:2},{value:"Request validator",id:"request-validator",level:2},{value:"Controller",id:"controller",level:2}];function i(r){const t={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",li:"li",mermaid:"mermaid",p:"p",pre:"pre",ul:"ul",...(0,o.a)(),...r.components};return(0,e.jsxs)(e.Fragment,{children:[(0,e.jsx)(t.h1,{id:"usage",children:"Usage"}),`
`,(0,e.jsxs)(t.p,{children:["In the previous section, you have learned how to generate the server stubs. The following is the file tree result if you are generating the server stubs of the ",(0,e.jsx)(t.a,{href:"https://github.com/imballinst/oas-typescript/blob/main/packages/shared/src/openapi/api.yaml",children:"slightly adjusted Pet Store OpenAPI Specification 3.0"}),"."]}),`
`,(0,e.jsx)(t.pre,{children:(0,e.jsx)(t.code,{children:`generated
\u251C\u2500\u2500 controllers
\u2502   \u251C\u2500\u2500 PetController.ts
\u2502   \u251C\u2500\u2500 StoreController.ts
\u2502   \u2514\u2500\u2500 UserController.ts
\u251C\u2500\u2500 static
\u2502   \u251C\u2500\u2500 checksum.json
\u2502   \u251C\u2500\u2500 client.ts
\u2502   \u251C\u2500\u2500 controller-types
\u2502   \u2502   \u251C\u2500\u2500 PetControllerTypes.ts
\u2502   \u2502   \u251C\u2500\u2500 StoreControllerTypes.ts
\u2502   \u2502   \u2514\u2500\u2500 UserControllerTypes.ts
\u2502   \u251C\u2500\u2500 security-schemes.ts
\u2502   \u251C\u2500\u2500 router.ts
\u2502   \u251C\u2500\u2500 types.ts
\u2502   \u2514\u2500\u2500 utils.ts
\u2514\u2500\u2500 middleware-helpers.ts
`})}),`
`,(0,e.jsx)(t.p,{children:"Before we dive deeper into each parts, here is the general flow on how a request is processed using the server stubs."}),`
`,(0,e.jsx)(t.mermaid,{value:`graph LR;
  Router-->Security-Middleware;
  Security-Middleware-->Request-Validator;
  Request-Validator-->Controller;`}),`
`,(0,e.jsxs)(t.p,{children:["The amazing thing about ",(0,e.jsx)(t.code,{children:"@oas-typescript"}),` server stubs is that, you don't need to worry about most of the parts above. You only need to worry about "Security Middleware (optional)" and "Controller". The rest will be handled by the generated server stubs.`]}),`
`,(0,e.jsx)(t.h2,{id:"router",children:"Router"}),`
`,(0,e.jsx)(t.admonition,{type:"note",children:(0,e.jsx)(t.p,{children:"This is part of the server stubs, so you don't have to do anything here."})}),`
`,(0,e.jsxs)(t.p,{children:["First things first, router will receive request from the client. These routers are generated from the ",(0,e.jsx)(t.code,{children:"paths"})," object in the OpenAPI Specification. These routers will gather up information from the request and then pass it to the security middleware, depending on whether ",(0,e.jsx)(t.code,{children:"security"})," field or the field that you specified in ",(0,e.jsx)(t.code,{children:"--app-security-requirements-field"})," exist or not in the operation object."]}),`
`,(0,e.jsx)(t.h2,{id:"security-middleware-optional",children:"Security Middleware (optional)"}),`
`,(0,e.jsx)(t.admonition,{type:"info",children:(0,e.jsx)(t.p,{children:"The security middleware is optional, because it's only required if there are endpoints with security requirements."})}),`
`,(0,e.jsx)(t.p,{children:"The default security middleware looks like this."}),`
`,(0,e.jsx)(t.pre,{children:(0,e.jsx)(t.code,{className:"language-ts",children:`// Base class of MiddlewareHelpers.
export class MiddlewareHelpers {
  static async doAdditionalSecurityValidation(
    headers: IncomingHttpHeaders,
    securityObject: SecuritySchemes
  ): Promise<void> {
    return Promise.resolve();
  }

  static async processZodErrorValidation({
    path,
    errors
  }: {
    path: string;
    errors: Array<{
      zodError: z.ZodError;
      oasParameter: OasParameter;
    }>;
  }) {
    return {};
  }
}
`})}),`
`,(0,e.jsxs)(t.p,{children:["The function receives ",(0,e.jsx)(t.code,{children:"headers"})," and ",(0,e.jsx)(t.code,{children:"securityObject"}),", the former comes from request whereas the latter comes from the OpenAPI specification. The function returns a resolved Promise (if validation is successful) and a rejected Promise (if validation fails). A modified security middleware helper looks like this:"]}),`
`,(0,e.jsx)(t.pre,{children:(0,e.jsx)(t.code,{className:"language-ts",metastring:"{6-26}",children:`export class MiddlewareHelpers {
  static async doAdditionalSecurityValidation(
    headers: IncomingHttpHeaders,
    securityObject: SecuritySchemes
  ): Promise<void> {
    let isValid = true;

    if (securityObject.api_key) {
      const apiKeyInHeader = headers[securityObject.api_key.meta.name];

      if (!apiKeyInHeader) {
        isValid = false;
      } else {
        // Example.
        isValid = apiKeyInHeader === 'helloworld';
      }
    }

    if (!isValid) {
      return Promise.reject(
        new SecurityMiddlewareError({
          status: 401,
          body: { message: 'invalid credentials' }
        })
      );
    }

    return Promise.resolve();
  }

  static processZodErrorValidation({
    errors
  }: {
    path: string;
    errors: Array<ParametersError>;
  }) {
    // Take only the first one.
    const error = errors[0];
    const oasParameter = errors[0].oasParameter;
    const errorCode =
      oasParameter.type === 'Body'
        ? ParseRequestErrors.INVALID_BODY
        : oasParameter.type === 'Header'
        ? ParseRequestErrors.INVALID_HTTP_HEADER
        : oasParameter.type === 'Query'
        ? ParseRequestErrors.INVALID_QUERY_PARAMETER
        : ParseRequestErrors.INVALID_PATH_PARAMETER;

    return {
      code: errorCode,
      message: ParseRequestErrorsMessage[errorCode],
      detail: error.type === 'zod' ? error.value.errors : error.value
    };
  }
}
`})}),`
`,(0,e.jsxs)(t.p,{children:["If we look above, the added parts are related to validating the request. With the ",(0,e.jsx)(t.code,{children:"securityObject"})," being type-safe, we can check if a request contains any available values defined in the top-level ",(0,e.jsx)(t.code,{children:"components.securitySchemes"})," (or any field that's defined in your ",(0,e.jsx)(t.code,{children:"--app-security-schemes-field"}),")."]}),`
`,(0,e.jsxs)(t.p,{children:["On top of that, we also have this function ",(0,e.jsx)(t.code,{children:"processZodErrorValidation"}),", which is related to the validation before the request information goes into the controller. In here, we can modify the response according to our needs. Unfortunately, for this function there is no proper type safe yet, so you will need to be careful when typing the function returns here since you will want to match it with the error response that you specified."]}),`
`,(0,e.jsx)(t.h2,{id:"request-validator",children:"Request validator"}),`
`,(0,e.jsx)(t.admonition,{type:"note",children:(0,e.jsx)(t.p,{children:"This is part of the server stubs, so you don't have to do anything here."})}),`
`,(0,e.jsx)(t.p,{children:"Inside request validator, the following will be validated:"}),`
`,(0,e.jsxs)(t.ul,{children:[`
`,(0,e.jsxs)(t.li,{children:["From ",(0,e.jsx)(t.code,{children:"parameters"})," in operation object: path parameters, query parameters, cookie, headers."]}),`
`,(0,e.jsxs)(t.li,{children:["From ",(0,e.jsx)(t.code,{children:"requestBody"})," in operation object: request body"]}),`
`]}),`
`,(0,e.jsxs)(t.p,{children:["If any of them are specified as ",(0,e.jsx)(t.code,{children:"required"})," in the specification but is missing from the request, then it will return ",(0,e.jsx)(t.code,{children:"400 Bad Request"}),"."]}),`
`,(0,e.jsx)(t.h2,{id:"controller",children:"Controller"}),`
`,(0,e.jsxs)(t.p,{children:['Now, to the last one, controller. Inside controller, the data is already considered "sanitized", which means, all of the variables are already type-safe. Here, you will want to return an object consisting of at least ',(0,e.jsx)(t.code,{children:"status"}),". The base controller looks like this."]}),`
`,(0,e.jsx)(t.pre,{children:(0,e.jsx)(t.code,{className:"language-ts",children:`export class PetController {
  static addPet: AddPetControllerFunction = (params) => {
    return {
      body: undefined,
      status: undefined
    };
  };
}
`})}),`
`,(0,e.jsxs)(t.p,{children:["So here, we have a ",(0,e.jsx)(t.code,{children:"PetController"}),", which is named after ",(0,e.jsx)(t.code,{children:"<tag>Controller"}),'. So, if you have a tag named "User", then it will be ',(0,e.jsx)(t.code,{children:"UserController"}),". Inside this, you will want to do the endpoint operations. Using the ",(0,e.jsx)(t.code,{children:"addPet"})," above, we can have a very simplified example."]}),`
`,(0,e.jsx)(t.pre,{children:(0,e.jsx)(t.code,{className:"language-ts",children:`const db: Pet[] = [];

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
`})}),`
`,(0,e.jsxs)(t.p,{children:["So, what we're doing here is that, we specify an in-memory database for a list of pets. Then, when someone wants to add a pet, we check first in the database if there's a pet with an existing pet or not. If it exists, then return a response with status ",(0,e.jsx)(t.code,{children:"405"})," and an error object. In the OpenAPI specification used, all fields of the error objects are optional, so we can pass an empty object instead."]}),`
`,(0,e.jsxs)(t.p,{children:["There's that! With ",(0,e.jsx)(t.code,{children:"@oas-typescript"})," server stubs, you will cut a lot of time implementing a server. Given an OpenAPI 3.0 Specification, all you need are only implementing the security middleware, controllers, and a simplified entry server. On top of that, by going design-first, we also prevent specification and actual server response mismatch."]})]})}function u(r={}){const{wrapper:t}={...(0,o.a)(),...r.components};return t?(0,e.jsx)(t,{...r,children:(0,e.jsx)(i,{...r})}):i(r)}}}]);
