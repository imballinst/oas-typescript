import { z } from 'zod';
import { FormidableFile } from './types.js';

// Schemas.
export const Category = z
  .object({ id: z.number().int(), name: z.string() })
  .partial()
  .passthrough();
export interface Category extends z.infer<typeof Category> {}
export const Tag = z
  .object({ id: z.number().int(), name: z.string() })
  .partial()
  .passthrough();
export interface Tag extends z.infer<typeof Tag> {}
export const Pet = z
  .object({
    id: z.number().int().optional(),
    name: z.string(),
    category: Category.optional(),
    photoUrls: z.array(z.string()),
    tags: z.array(Tag).optional(),
    status: z.enum(['available', 'pending', 'sold']).optional()
  })
  .passthrough();
export interface Pet extends z.infer<typeof Pet> {}
export const uploadFileWithSmallerLimit_Body = z
  .object({
    profileImage: FormidableFile,
    profileImageArray: z.array(FormidableFile)
  })
  .partial()
  .passthrough();
export interface uploadFileWithSmallerLimit_Body
  extends z.infer<typeof uploadFileWithSmallerLimit_Body> {}
export const uploadFileMultipart_Body = z
  .object({ name: z.string(), profileImage: FormidableFile })
  .partial()
  .passthrough();
export interface uploadFileMultipart_Body
  extends z.infer<typeof uploadFileMultipart_Body> {}
export const Order = z
  .object({
    id: z.number().int(),
    petId: z.number().int(),
    quantity: z.number().int(),
    shipDate: z.string().datetime({ offset: true }),
    status: z.enum(['placed', 'approved', 'delivered']),
    complete: z.boolean()
  })
  .partial()
  .passthrough();
export interface Order extends z.infer<typeof Order> {}
export const User = z
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
export interface User extends z.infer<typeof User> {}

// Endpoints.
export const UpdatePetParameters = [
  {
    name: 'body',
    description: `Update an existent pet in the store`,
    type: 'Body',
    schema: Pet,
    formidableOptions: undefined
  }
] as const;
export const UpdatePetSecurity = {
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
    value: ['write:pets', 'read:pets'] as string[]
  }
} as const;

export const UpdatePetResponse = {
  schema: Pet,
  status: 200
} as const;
export type UpdatePetResponse = typeof UpdatePetResponse;

export const UpdatePetErrors = {
  '400': {
    status: 400,
    schema: z
      .object({ code: z.number().int(), type: z.string(), message: z.string() })
      .partial()
      .passthrough()
  },
  '404': {
    status: 404,
    schema: z
      .object({ code: z.number().int(), type: z.string(), message: z.string() })
      .partial()
      .passthrough()
  },
  '405': {
    status: 405,
    schema: z
      .object({ code: z.number().int(), type: z.string(), message: z.string() })
      .partial()
      .passthrough()
  }
} as const;
export type UpdatePetErrors = typeof UpdatePetErrors;

export const AddPetParameters = [
  {
    name: 'body',
    description: `Create a new pet in the store`,
    type: 'Body',
    schema: Pet,
    formidableOptions: undefined
  }
] as const;
export const AddPetSecurity = {
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
    value: ['write:pets', 'read:pets'] as string[]
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

export const AddPetResponse = {
  schema: Pet,
  status: 200
} as const;
export type AddPetResponse = typeof AddPetResponse;

export const AddPetErrors = {
  '405': {
    status: 405,
    schema: z
      .object({ code: z.number().int(), type: z.string(), message: z.string() })
      .partial()
      .passthrough()
  }
} as const;
export type AddPetErrors = typeof AddPetErrors;

export const GetPetByIdParameters = [
  {
    name: 'petId',
    type: 'Path',
    schema: z.number().int(),
    formidableOptions: undefined
  }
] as const;
export const GetPetByIdSecurity = {
  api_key: {
    meta: {
      type: 'apiKey',
      name: 'api_key',
      in: 'header'
    },
    value: [] as string[]
  },
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
    value: ['write:pets', 'read:pets'] as string[]
  }
} as const;

export const GetPetByIdResponse = {
  schema: Pet,
  status: 200
} as const;
export type GetPetByIdResponse = typeof GetPetByIdResponse;

export const GetPetByIdErrors = {
  '400': {
    status: 400,
    schema: z
      .object({ code: z.number().int(), type: z.string(), message: z.string() })
      .partial()
      .passthrough()
  },
  '404': {
    status: 404,
    schema: z
      .object({ code: z.number().int(), type: z.string(), message: z.string() })
      .partial()
      .passthrough()
  }
} as const;
export type GetPetByIdErrors = typeof GetPetByIdErrors;

export const UpdatePetWithFormParameters = [
  {
    name: 'petId',
    type: 'Path',
    schema: z.number().int(),
    formidableOptions: undefined
  },
  {
    name: 'name',
    type: 'Query',
    schema: z.string().optional(),
    formidableOptions: undefined
  },
  {
    name: 'status',
    type: 'Query',
    schema: z.string().optional(),
    formidableOptions: undefined
  }
] as const;
export const UpdatePetWithFormSecurity = {
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
    value: ['write:pets', 'read:pets'] as string[]
  }
} as const;

export const UpdatePetWithFormResponse = {
  schema: z.void(),
  status: 204
} as const;
export type UpdatePetWithFormResponse = typeof UpdatePetWithFormResponse;

export const UpdatePetWithFormErrors = {
  '405': {
    status: 405,
    schema: z
      .object({ code: z.number().int(), type: z.string(), message: z.string() })
      .partial()
      .passthrough()
  }
} as const;
export type UpdatePetWithFormErrors = typeof UpdatePetWithFormErrors;

export const DeletePetParameters = [
  {
    name: 'api_key',
    type: 'Header',
    schema: z.string().optional(),
    formidableOptions: undefined
  },
  {
    name: 'petId',
    type: 'Path',
    schema: z.number().int(),
    formidableOptions: undefined
  }
] as const;
export const DeletePetSecurity = {
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
    value: ['write:pets', 'read:pets'] as string[]
  }
} as const;

export const DeletePetResponse = {
  schema: z.void(),
  status: 204
} as const;
export type DeletePetResponse = typeof DeletePetResponse;

export const DeletePetErrors = {
  '400': {
    status: 400,
    schema: z
      .object({ code: z.number().int(), type: z.string(), message: z.string() })
      .partial()
      .passthrough()
  }
} as const;
export type DeletePetErrors = typeof DeletePetErrors;

export const UploadFileMultipartParameters = [
  {
    name: 'body',
    type: 'Body',
    schema: uploadFileMultipart_Body,
    formidableOptions: {}
  },
  {
    name: 'petId',
    type: 'Path',
    schema: z.number().int(),
    formidableOptions: undefined
  },
  {
    name: 'additionalMetadata',
    type: 'Query',
    schema: z.string().optional(),
    formidableOptions: undefined
  }
] as const;
export const UploadFileMultipartSecurity = {
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
    value: ['write:pets', 'read:pets'] as string[]
  }
} as const;

export const UploadFileMultipartResponse = {
  schema: z
    .object({ code: z.number().int(), type: z.string(), message: z.string() })
    .partial()
    .passthrough(),
  status: 200
} as const;
export type UploadFileMultipartResponse = typeof UploadFileMultipartResponse;

export const UploadFileMultipartErrors = {} as const;
export type UploadFileMultipartErrors = typeof UploadFileMultipartErrors;

export const UploadFileParameters = [
  {
    name: 'body',
    type: 'Body',
    schema: z.object({ profileImage: FormidableFile }).passthrough(),
    formidableOptions: {}
  },
  {
    name: 'petId',
    type: 'Path',
    schema: z.number().int(),
    formidableOptions: undefined
  },
  {
    name: 'additionalMetadata',
    type: 'Query',
    schema: z.string().optional(),
    formidableOptions: undefined
  }
] as const;
export const UploadFileSecurity = {
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
    value: ['write:pets', 'read:pets'] as string[]
  }
} as const;

export const UploadFileResponse = {
  schema: z.void(),
  status: 200
} as const;
export type UploadFileResponse = typeof UploadFileResponse;

export const UploadFileErrors = {} as const;
export type UploadFileErrors = typeof UploadFileErrors;

export const UploadFileWithSmallerLimitParameters = [
  {
    name: 'body',
    type: 'Body',
    schema: uploadFileWithSmallerLimit_Body,
    formidableOptions: {
      profileImage: {
        maxFileSize: 0.01
      },
      profileImageArray: {
        maxFiles: 1
      }
    }
  },
  {
    name: 'petId',
    type: 'Path',
    schema: z.number().int(),
    formidableOptions: undefined
  },
  {
    name: 'additionalMetadata',
    type: 'Query',
    schema: z.string().optional(),
    formidableOptions: undefined
  }
] as const;
export const UploadFileWithSmallerLimitSecurity = {
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
    value: ['write:pets', 'read:pets'] as string[]
  }
} as const;

export const UploadFileWithSmallerLimitResponse = {
  schema: z.void(),
  status: 200
} as const;
export type UploadFileWithSmallerLimitResponse =
  typeof UploadFileWithSmallerLimitResponse;

export const UploadFileWithSmallerLimitErrors = {} as const;
export type UploadFileWithSmallerLimitErrors =
  typeof UploadFileWithSmallerLimitErrors;

export const FindPetsByStatusParameters = [
  {
    name: 'status',
    type: 'Query',
    schema: z
      .enum(['available', 'pending', 'sold'])
      .optional()
      .default('available'),
    formidableOptions: undefined
  }
] as const;
export const FindPetsByStatusSecurity = {
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
    value: ['write:pets', 'read:pets'] as string[]
  }
} as const;

export const FindPetsByStatusResponse = {
  schema: z.array(Pet),
  status: 200
} as const;
export type FindPetsByStatusResponse = typeof FindPetsByStatusResponse;

export const FindPetsByStatusErrors = {
  '400': {
    status: 400,
    schema: z
      .object({ code: z.number().int(), type: z.string(), message: z.string() })
      .partial()
      .passthrough()
  }
} as const;
export type FindPetsByStatusErrors = typeof FindPetsByStatusErrors;

export const FindPetsByTagsParameters = [
  {
    name: 'tags',
    type: 'Query',
    schema: z.array(z.string()).optional(),
    formidableOptions: undefined
  }
] as const;
export const FindPetsByTagsSecurity = {
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
    value: ['write:pets', 'read:pets'] as string[]
  }
} as const;

export const FindPetsByTagsResponse = {
  schema: z.array(Pet),
  status: 200
} as const;
export type FindPetsByTagsResponse = typeof FindPetsByTagsResponse;

export const FindPetsByTagsErrors = {
  '400': {
    status: 400,
    schema: z
      .object({ code: z.number().int(), type: z.string(), message: z.string() })
      .partial()
      .passthrough()
  }
} as const;
export type FindPetsByTagsErrors = typeof FindPetsByTagsErrors;

export const GetInventoryParameters = [] as const;
export const GetInventorySecurity = {
  api_key: {
    meta: {
      type: 'apiKey',
      name: 'api_key',
      in: 'header'
    },
    value: [] as string[]
  }
} as const;

export const GetInventoryResponse = {
  schema: z.record(z.number().int()),
  status: 200
} as const;
export type GetInventoryResponse = typeof GetInventoryResponse;

export const GetInventoryErrors = {} as const;
export type GetInventoryErrors = typeof GetInventoryErrors;

export const PlaceOrderParameters = [
  {
    name: 'body',
    type: 'Body',
    schema: Order,
    formidableOptions: undefined
  }
] as const;

export const PlaceOrderResponse = {
  schema: Order,
  status: 200
} as const;
export type PlaceOrderResponse = typeof PlaceOrderResponse;

export const PlaceOrderErrors = {
  '405': {
    status: 405,
    schema: z
      .object({ code: z.number().int(), type: z.string(), message: z.string() })
      .partial()
      .passthrough()
  }
} as const;
export type PlaceOrderErrors = typeof PlaceOrderErrors;

export const GetOrderByIdParameters = [
  {
    name: 'orderId',
    type: 'Path',
    schema: z.number().int(),
    formidableOptions: undefined
  }
] as const;

export const GetOrderByIdResponse = {
  schema: Order,
  status: 200
} as const;
export type GetOrderByIdResponse = typeof GetOrderByIdResponse;

export const GetOrderByIdErrors = {
  '400': {
    status: 400,
    schema: z
      .object({ code: z.number().int(), type: z.string(), message: z.string() })
      .partial()
      .passthrough()
  },
  '404': {
    status: 404,
    schema: z
      .object({ code: z.number().int(), type: z.string(), message: z.string() })
      .partial()
      .passthrough()
  }
} as const;
export type GetOrderByIdErrors = typeof GetOrderByIdErrors;

export const DeleteOrderParameters = [
  {
    name: 'orderId',
    type: 'Path',
    schema: z.number().int(),
    formidableOptions: undefined
  }
] as const;

export const DeleteOrderResponse = {
  schema: z.void(),
  status: 204
} as const;
export type DeleteOrderResponse = typeof DeleteOrderResponse;

export const DeleteOrderErrors = {
  '400': {
    status: 400,
    schema: z
      .object({ code: z.number().int(), type: z.string(), message: z.string() })
      .partial()
      .passthrough()
  },
  '404': {
    status: 404,
    schema: z
      .object({ code: z.number().int(), type: z.string(), message: z.string() })
      .partial()
      .passthrough()
  }
} as const;
export type DeleteOrderErrors = typeof DeleteOrderErrors;

export const CreateUserParameters = [
  {
    name: 'body',
    description: `Created user object`,
    type: 'Body',
    schema: User,
    formidableOptions: undefined
  }
] as const;

export const CreateUserResponse = {
  schema: User,
  status: 200
} as const;
export type CreateUserResponse = typeof CreateUserResponse;

export const CreateUserErrors = {} as const;
export type CreateUserErrors = typeof CreateUserErrors;

export const GetUserByNameParameters = [
  {
    name: 'username',
    type: 'Path',
    schema: z.string(),
    formidableOptions: undefined
  }
] as const;

export const GetUserByNameResponse = {
  schema: User,
  status: 200
} as const;
export type GetUserByNameResponse = typeof GetUserByNameResponse;

export const GetUserByNameErrors = {
  '400': {
    status: 400,
    schema: z
      .object({ code: z.number().int(), type: z.string(), message: z.string() })
      .partial()
      .passthrough()
  },
  '404': {
    status: 404,
    schema: z
      .object({ code: z.number().int(), type: z.string(), message: z.string() })
      .partial()
      .passthrough()
  }
} as const;
export type GetUserByNameErrors = typeof GetUserByNameErrors;

export const UpdateUserParameters = [
  {
    name: 'body',
    description: `Update an existent user in the store`,
    type: 'Body',
    schema: User,
    formidableOptions: undefined
  },
  {
    name: 'username',
    type: 'Path',
    schema: z.string(),
    formidableOptions: undefined
  }
] as const;

export const UpdateUserResponse = {
  schema: User,
  status: 200
} as const;
export type UpdateUserResponse = typeof UpdateUserResponse;

export const UpdateUserErrors = {} as const;
export type UpdateUserErrors = typeof UpdateUserErrors;

export const DeleteUserParameters = [
  {
    name: 'username',
    type: 'Path',
    schema: z.string(),
    formidableOptions: undefined
  }
] as const;

export const DeleteUserResponse = {
  schema: z.void(),
  status: 204
} as const;
export type DeleteUserResponse = typeof DeleteUserResponse;

export const DeleteUserErrors = {
  '400': {
    status: 400,
    schema: z
      .object({ code: z.number().int(), type: z.string(), message: z.string() })
      .partial()
      .passthrough()
  },
  '404': {
    status: 404,
    schema: z
      .object({ code: z.number().int(), type: z.string(), message: z.string() })
      .partial()
      .passthrough()
  }
} as const;
export type DeleteUserErrors = typeof DeleteUserErrors;

export const CreateUsersWithListInputParameters = [
  {
    name: 'body',
    type: 'Body',
    schema: z.array(User),
    formidableOptions: undefined
  }
] as const;

export const CreateUsersWithListInputResponse = {
  schema: User,
  status: 200
} as const;
export type CreateUsersWithListInputResponse =
  typeof CreateUsersWithListInputResponse;

export const CreateUsersWithListInputErrors = {
  default: {
    status: 'default',
    schema: z
      .object({ code: z.number().int(), type: z.string(), message: z.string() })
      .partial()
      .passthrough()
  }
} as const;
export type CreateUsersWithListInputErrors =
  typeof CreateUsersWithListInputErrors;

export const LoginUserParameters = [
  {
    name: 'username',
    type: 'Query',
    schema: z.string().optional(),
    formidableOptions: undefined
  },
  {
    name: 'password',
    type: 'Query',
    schema: z.string().optional(),
    formidableOptions: undefined
  }
] as const;

export const LoginUserResponse = {
  schema: z.object({ status: z.string() }).partial().passthrough(),
  status: 200,
  headers: {
    'X-Rate-Limit': {
      schema: z.number()
    },
    'X-Expires-After': {
      schema: z.string()
    }
  }
} as const;
export type LoginUserResponse = typeof LoginUserResponse;

export const LoginUserErrors = {
  '400': {
    status: 400,
    schema: z
      .object({ code: z.number().int(), type: z.string(), message: z.string() })
      .partial()
      .passthrough()
  }
} as const;
export type LoginUserErrors = typeof LoginUserErrors;

export const LogoutUserParameters = [] as const;

export const LogoutUserResponse = {
  schema: z.void(),
  status: 204
} as const;
export type LogoutUserResponse = typeof LogoutUserResponse;

export const LogoutUserErrors = {} as const;
export type LogoutUserErrors = typeof LogoutUserErrors;
