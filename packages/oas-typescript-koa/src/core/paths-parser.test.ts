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
                $ref: '#/components/schema/User'
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
          errorType: 'GetUserErrors',
          responseSuccessStatus: 200,
          parametersName: 'GetUserParameters',
          response: 'GetUserResponse',
          hasDefaultResponseStatus: false
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

  if (result.status > 400) {
    ctx.body = result.error
  } else {
    ctx.body = result.data
  }
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
                $ref: '#/components/schema/User'
              },
              default: {
                description: 'Unknown error during operation execution',
                $ref: '#/components/schema/Error'
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
          errorType: 'GetUserErrors',
          responseSuccessStatus: 200,
          hasDefaultResponseStatus: true,
          parametersName: 'GetUserParameters',
          response: 'GetUserResponse'
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

  if (result.status > 400) {
    ctx.body = result.error
  } else {
    ctx.body = result.data
  }
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
