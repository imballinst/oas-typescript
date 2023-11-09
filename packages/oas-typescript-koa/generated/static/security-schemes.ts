const securitySchemes = {
  petstore_auth: {
    meta: {
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
    value: [] as string[]
  },
  api_key: {
    meta: {
      type: 'apiKey',
      name: 'api_key',
      in: 'header'
    },
    value: [] as string[]
  }
} as const;

export type SecuritySchemes = Partial<typeof securitySchemes>;
