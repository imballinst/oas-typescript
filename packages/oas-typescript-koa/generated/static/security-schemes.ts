const securitySchemes = {
  petstore_auth: {
    type: 'oauth2',
    flows: {
      implicit: {
        authorizationUrl: 'https://petstore3.swagger.io/oauth/authorize',
        scopes: {
          'write:pets': 'modify pets in your account',
          'read:pets': 'read your pets'
        }
      }
    }
  },
  api_key: {
    type: 'apiKey',
    name: 'api_key',
    in: 'header'
  }
} as const;

export type SecuritySchemes = Partial<typeof securitySchemes>;
