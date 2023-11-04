import { z } from 'zod';

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
export const ApiResponse = z
  .object({ code: z.number().int(), type: z.string(), message: z.string() })
  .partial()
  .passthrough();
export interface ApiResponse extends z.infer<typeof ApiResponse> {}
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
    schema: Pet
  }
] as const;
export const UpdatePetSecurity = [
  { petstore_auth: ['write:pets', 'read:pets'] }
];

export const UpdatePetResponse = {
  schema: Pet,
  status: 200
} as const;
export type UpdatePetResponse = typeof UpdatePetResponse;

export const UpdatePetErrors = {
  '400': {
    status: 400,
    schema: z.void()
  },
  '404': {
    status: 404,
    schema: z.void()
  },
  '405': {
    status: 405,
    schema: z.void()
  }
} as const;
export type UpdatePetErrors = typeof UpdatePetErrors;

export const AddPetParameters = [
  {
    name: 'body',
    description: `Create a new pet in the store`,
    type: 'Body',
    schema: Pet
  }
] as const;
export const AddPetSecurity = [{ petstore_auth: ['write:pets', 'read:pets'] }];

export const AddPetResponse = {
  schema: Pet,
  status: 200
} as const;
export type AddPetResponse = typeof AddPetResponse;

export const AddPetErrors = {
  '405': {
    status: 405,
    schema: z.void()
  }
} as const;
export type AddPetErrors = typeof AddPetErrors;

export const GetPetByIdParameters = [
  {
    name: 'petId',
    type: 'Path',
    schema: z.number().int()
  }
] as const;
export const GetPetByIdSecurity = [
  { api_key: [] },
  { petstore_auth: ['write:pets', 'read:pets'] }
];

export const GetPetByIdResponse = {
  schema: Pet,
  status: 200
} as const;
export type GetPetByIdResponse = typeof GetPetByIdResponse;

export const GetPetByIdErrors = {
  '400': {
    status: 400,
    schema: z.void()
  },
  '404': {
    status: 404,
    schema: z.void()
  }
} as const;
export type GetPetByIdErrors = typeof GetPetByIdErrors;

export const UpdatePetWithFormParameters = [
  {
    name: 'petId',
    type: 'Path',
    schema: z.number().int()
  },
  {
    name: 'name',
    type: 'Query',
    schema: z.string().optional()
  },
  {
    name: 'status',
    type: 'Query',
    schema: z.string().optional()
  }
] as const;
export const UpdatePetWithFormSecurity = [
  { petstore_auth: ['write:pets', 'read:pets'] }
];

export const UpdatePetWithFormResponse = {
  schema: z.void(),
  status: 204
} as const;
export type UpdatePetWithFormResponse = typeof UpdatePetWithFormResponse;

export const UpdatePetWithFormErrors = {
  '405': {
    status: 405,
    schema: ApiResponse
  }
} as const;
export type UpdatePetWithFormErrors = typeof UpdatePetWithFormErrors;

export const DeletePetParameters = [
  {
    name: 'api_key',
    type: 'Header',
    schema: z.string().optional()
  },
  {
    name: 'petId',
    type: 'Path',
    schema: z.number().int()
  }
] as const;
export const DeletePetSecurity = [
  { petstore_auth: ['write:pets', 'read:pets'] }
];

export const DeletePetResponse = {
  schema: z.void(),
  status: 204
} as const;
export type DeletePetResponse = typeof DeletePetResponse;

export const DeletePetErrors = {
  '400': {
    status: 400,
    schema: z.void()
  }
} as const;
export type DeletePetErrors = typeof DeletePetErrors;

export const UploadFileParameters = [
  {
    name: 'body',
    type: 'Body',
    schema: z.any()
  },
  {
    name: 'petId',
    type: 'Path',
    schema: z.number().int()
  },
  {
    name: 'additionalMetadata',
    type: 'Query',
    schema: z.string().optional()
  }
] as const;
export const UploadFileSecurity = [
  { petstore_auth: ['write:pets', 'read:pets'] }
];

export const UploadFileResponse = {
  schema: ApiResponse,
  status: 200
} as const;
export type UploadFileResponse = typeof UploadFileResponse;

export const UploadFileErrors = {} as const;
export type UploadFileErrors = typeof UploadFileErrors;

export const FindPetsByStatusParameters = [
  {
    name: 'status',
    type: 'Query',
    schema: z
      .enum(['available', 'pending', 'sold'])
      .optional()
      .default('available')
  }
] as const;
export const FindPetsByStatusSecurity = [
  { petstore_auth: ['write:pets', 'read:pets'] }
];

export const FindPetsByStatusResponse = {
  schema: z.array(Pet),
  status: 200
} as const;
export type FindPetsByStatusResponse = typeof FindPetsByStatusResponse;

export const FindPetsByStatusErrors = {
  '400': {
    status: 400,
    schema: z.void()
  }
} as const;
export type FindPetsByStatusErrors = typeof FindPetsByStatusErrors;

export const FindPetsByTagsParameters = [
  {
    name: 'tags',
    type: 'Query',
    schema: z.array(z.string()).optional()
  }
] as const;
export const FindPetsByTagsSecurity = [
  { petstore_auth: ['write:pets', 'read:pets'] }
];

export const FindPetsByTagsResponse = {
  schema: z.array(Pet),
  status: 200
} as const;
export type FindPetsByTagsResponse = typeof FindPetsByTagsResponse;

export const FindPetsByTagsErrors = {
  '400': {
    status: 400,
    schema: z.void()
  }
} as const;
export type FindPetsByTagsErrors = typeof FindPetsByTagsErrors;

export const GetInventoryParameters = [] as const;
export const GetInventorySecurity = [{ api_key: [] }];

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
    schema: Order
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
    schema: z.void()
  }
} as const;
export type PlaceOrderErrors = typeof PlaceOrderErrors;

export const GetOrderByIdParameters = [
  {
    name: 'orderId',
    type: 'Path',
    schema: z.number().int()
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
    schema: z.void()
  },
  '404': {
    status: 404,
    schema: z.void()
  }
} as const;
export type GetOrderByIdErrors = typeof GetOrderByIdErrors;

export const DeleteOrderParameters = [
  {
    name: 'orderId',
    type: 'Path',
    schema: z.number().int()
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
    schema: z.void()
  },
  '404': {
    status: 404,
    schema: z.void()
  }
} as const;
export type DeleteOrderErrors = typeof DeleteOrderErrors;

export const CreateUserParameters = [
  {
    name: 'body',
    description: `Created user object`,
    type: 'Body',
    schema: User
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
    schema: z.string()
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
    schema: z.void()
  },
  '404': {
    status: 404,
    schema: z.void()
  }
} as const;
export type GetUserByNameErrors = typeof GetUserByNameErrors;

export const UpdateUserParameters = [
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
    schema: z.string()
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
    schema: z.void()
  },
  '404': {
    status: 404,
    schema: z.void()
  }
} as const;
export type DeleteUserErrors = typeof DeleteUserErrors;

export const CreateUsersWithListInputParameters = [
  {
    name: 'body',
    type: 'Body',
    schema: z.array(User)
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
    schema: z.void()
  }
} as const;
export type CreateUsersWithListInputErrors =
  typeof CreateUsersWithListInputErrors;

export const LoginUserParameters = [
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
] as const;

export const LoginUserResponse = {
  schema: z.string(),
  status: 200
} as const;
export type LoginUserResponse = typeof LoginUserResponse;

export const LoginUserErrors = {
  '400': {
    status: 400,
    schema: z.void()
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
