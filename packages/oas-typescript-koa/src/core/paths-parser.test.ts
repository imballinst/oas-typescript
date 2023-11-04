import { expect, test } from 'vitest';
import { parsePaths } from './paths-parser';

// Valid cases.
test('parsePaths with all requirements fulfilled', () => {
  expect(
    parsePaths({
      paths: {
        '/users/{user}': {
          get: {
            tags: ['users'],
            operationId: 'getUser',
            responses: {
              '200': {
                description: 'Successful operation returns user response',
                content: {
                  'application/json': {
                    schema: {
                      $ref: '#/components/schemas/User'
                    }
                  }
                },
                headers: {
                  'x-ratelimit': {
                    schema: { type: 'string' }
                  },
                  'x-ratelimit-expires-in': {
                    schema: { type: 'number', nullable: true }
                  }
                }
              },
              '400': {
                description: 'invalid request',
                content: {
                  'application/json': {
                    schema: {
                      $ref: '#/components/schemas/ApiResponse'
                    }
                  }
                }
              }
            }
          }
        }
      }
    })
  ).toEqual({
    allServerSecurityImports: [],
    controllerImportsPerController: {
      UsersController: ['GetUserParameters', 'GetUserErrors', 'GetUserResponse']
    },
    controllerToOperationsRecord: {
      UsersController: [
        {
          operationId: 'getUser',
          functionType: 'GetUserControllerFunction',
          parametersName: 'GetUserParameters',
          responseType: {
            success: 'GetUserResponse',
            error: 'GetUserErrors'
          },
          response: {
            success: {
              schema: 'User',
              status: 200,
              headers: {
                'x-ratelimit': { schema: 'z.string()' },
                'x-ratelimit-expires-in': {
                  schema: 'z.number()',
                  nullable: true
                }
              }
            },
            error: {
              '400': {
                schema: 'ApiResponse',
                status: '400'
              }
            }
          }
        }
      ]
    },
    parametersImportsPerController: {
      UsersController: ['GetUserParameters']
    },
    routers: [
      `  
router.get('/users/:user', async (ctx, next) => {
  const parsedRequestInfo = KoaGeneratedUtils.parseRequestInfo({ 
    ctx,
    oasParameters: GetUserParameters
  })
  if (!parsedRequestInfo) {
    ctx.status = 400
    return
  }

  const result = await UsersController.getUser(parsedRequestInfo)
  ctx.status = result.status
  ctx.body = result.body
})`.trim()
    ]
  } satisfies ReturnType<typeof parsePaths>);
});

test('parsePaths with 2xx and default should result in 2xx and all errors', () => {
  expect(
    parsePaths({
      paths: {
        '/users/{user}': {
          get: {
            tags: ['users'],
            operationId: 'getUser',
            responses: {
              '200': {
                description: 'Successful operation returns user response',
                content: {
                  'application/json': {
                    schema: {
                      $ref: '#/components/schemas/User'
                    }
                  }
                }
              },
              default: {
                description: 'Unknown error during operation execution',
                content: {
                  'application/json': {
                    schema: {
                      $ref: '#/components/schemas/Error'
                    }
                  }
                }
              }
            }
          }
        }
      }
    })
  ).toEqual({
    allServerSecurityImports: [],
    controllerImportsPerController: {
      UsersController: ['GetUserParameters', 'GetUserErrors', 'GetUserResponse']
    },
    controllerToOperationsRecord: {
      UsersController: [
        {
          operationId: 'getUser',
          functionType: 'GetUserControllerFunction',
          parametersName: 'GetUserParameters',
          response: {
            success: {
              schema: 'User',
              status: 200
            },
            error: {
              default: {
                schema: 'Error',
                status: 'default'
              }
            }
          },
          responseType: {
            success: 'GetUserResponse',
            error: 'GetUserErrors'
          }
        }
      ]
    },
    parametersImportsPerController: {
      UsersController: ['GetUserParameters']
    },
    routers: [
      `  
router.get('/users/:user', async (ctx, next) => {
  const parsedRequestInfo = KoaGeneratedUtils.parseRequestInfo({ 
    ctx,
    oasParameters: GetUserParameters
  })
  if (!parsedRequestInfo) {
    ctx.status = 400
    return
  }

  const result = await UsersController.getUser(parsedRequestInfo)
  ctx.status = result.status
  ctx.body = result.body
})`.trim()
    ]
  } satisfies ReturnType<typeof parsePaths>);
});

// Invalid cases.
test('parsePaths throws when there are no tags', () => {
  expect(() =>
    parsePaths({
      paths: {
        '/users/{user}': {
          get: {
            operationId: 'getUser',
            responses: {}
          }
        }
      }
    })
  ).toThrowError(
    `The tag for the method get of /users/{user} is not defined. Define it, then try again.`
  );
});

test('parsePaths throws when there are no operationId', () => {
  expect(() =>
    parsePaths({
      paths: {
        '/users/{user}': {
          get: {
            tags: ['users'],
            responses: {}
          }
        }
      }
    })
  ).toThrowError(
    `The operation ID for the method get of /users/{user} is not defined. Define it, then try again.`
  );
});

test('parsePaths throws when there is no 2xx or 3xx response', () => {
  expect(() =>
    parsePaths({
      paths: {
        '/users/{user}': {
          get: {
            tags: ['users'],
            operationId: 'getUser',
            responses: {}
          }
        }
      }
    })
  ).toThrowError(
    `Invalid response of getUser: should have 2xx or 3xx response defined`
  );
});
