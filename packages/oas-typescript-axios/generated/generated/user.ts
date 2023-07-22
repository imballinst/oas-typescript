import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const User = z
  .object({
    id: z.number().int(),
    username: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    email: z.string(),
    password: z.string(),
    phone: z.string(),
    userStatus: z.number().int()
  })
  .partial()
  .passthrough();

export const schemas = {
  User
};

const endpoints = makeApi([
  {
    method: 'post',
    path: '/user',
    description: `This can only be done by the logged in user.`,
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        description: `Created user object`,
        type: 'Body',
        schema: User
      }
    ],
    response: User
  },
  {
    method: 'post',
    path: '/user/createWithList',
    description: `Creates list of users with given input array`,
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: z.array(User)
      }
    ],
    response: User
  },
  {
    method: 'get',
    path: '/user/login',
    requestFormat: 'json',
    parameters: [
      {
        name: 'username',
        type: 'Query',
        schema: z.string().optional()
      },
      {
        name: 'password',
        type: 'Query',
        schema: z.string().optional()
      }
    ],
    response: z.string(),
    errors: [
      {
        status: 400,
        description: `Invalid username/password supplied`,
        schema: z.void()
      }
    ]
  },
  {
    method: 'post',
    path: '/user/logout',
    requestFormat: 'json',
    response: z.void()
  },
  {
    method: 'get',
    path: '/user/:username',
    requestFormat: 'json',
    parameters: [
      {
        name: 'username',
        type: 'Path',
        schema: z.string()
      }
    ],
    response: User,
    errors: [
      {
        status: 400,
        description: `Invalid username supplied`,
        schema: z.void()
      },
      {
        status: 404,
        description: `User not found`,
        schema: z.void()
      }
    ]
  },
  {
    method: 'put',
    path: '/user/:username',
    description: `This can only be done by the logged in user.`,
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        description: `Update an existent user in the store`,
        type: 'Body',
        schema: User
      },
      {
        name: 'username',
        type: 'Path',
        schema: z.string()
      }
    ],
    response: User
  },
  {
    method: 'delete',
    path: '/user/:username',
    description: `This can only be done by the logged in user.`,
    requestFormat: 'json',
    parameters: [
      {
        name: 'username',
        type: 'Path',
        schema: z.string()
      }
    ],
    response: z.void(),
    errors: [
      {
        status: 400,
        description: `Invalid username supplied`,
        schema: z.void()
      },
      {
        status: 404,
        description: `User not found`,
        schema: z.void()
      }
    ]
  }
]);

export const UserApi = new Zodios(endpoints);

export function createApiClient(baseUrl: string, options?: ZodiosOptions) {
  return new Zodios(baseUrl, endpoints, options);
}
