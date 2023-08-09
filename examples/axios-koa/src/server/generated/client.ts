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
export const UpdatePetResponse = Pet;
export const UpdatePetErrors = [
  {
    status: 400,
    description: `Invalid ID supplied`,
    schema: z.void()
  },
  {
    status: 404,
    description: `Pet not found`,
    schema: z.void()
  },
  {
    status: 405,
    description: `Validation exception`,
    schema: z.void()
  }
] as const;

export const AddPetParameters = [
  {
    name: 'body',
    description: `Create a new pet in the store`,
    type: 'Body',
    schema: Pet
  }
] as const;
export const AddPetSecurity = [{ petstore_auth: ['write:pets', 'read:pets'] }];
export const AddPetResponse = Pet;
export const AddPetErrors = [
  {
    status: 405,
    description: `Invalid input`,
    schema: z.void()
  }
] as const;

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
export const GetPetByIdResponse = Pet;
export const GetPetByIdErrors = [
  {
    status: 400,
    description: `Invalid ID supplied`,
    schema: z.void()
  },
  {
    status: 404,
    description: `Pet not found`,
    schema: z.void()
  }
] as const;

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
export const UpdatePetWithFormResponse = z.void();
export const UpdatePetWithFormErrors = [
  {
    status: 405,
    description: `Invalid input`,
    schema: ApiResponse
  }
] as const;

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
export const DeletePetResponse = z.void();
export const DeletePetErrors = [
  {
    status: 400,
    description: `Invalid pet value`,
    schema: z.void()
  }
] as const;

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
export const UploadFileResponse = ApiResponse;
export const UploadFileErrors = [] as const;

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
export const FindPetsByStatusResponse = z.array(Pet);
export const FindPetsByStatusErrors = [
  {
    status: 400,
    description: `Invalid status value`,
    schema: z.void()
  }
] as const;

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
export const FindPetsByTagsResponse = z.array(Pet);
export const FindPetsByTagsErrors = [
  {
    status: 400,
    description: `Invalid tag value`,
    schema: z.void()
  }
] as const;

export const GetInventoryParameters = [] as const;
export const GetInventorySecurity = [{ api_key: [] }];
export const GetInventoryResponse = z.record(z.number());
export const GetInventoryErrors = [] as const;

export const PlaceOrderParameters = [
  {
    name: 'body',
    type: 'Body',
    schema: Order
  }
] as const;
export const PlaceOrderResponse = Order;
export const PlaceOrderErrors = [
  {
    status: 405,
    description: `Invalid input`,
    schema: z.void()
  }
] as const;

export const GetOrderByIdParameters = [
  {
    name: 'orderId',
    type: 'Path',
    schema: z.number().int()
  }
] as const;
export const GetOrderByIdResponse = Order;
export const GetOrderByIdErrors = [
  {
    status: 400,
    description: `Invalid ID supplied`,
    schema: z.void()
  },
  {
    status: 404,
    description: `Order not found`,
    schema: z.void()
  }
] as const;

export const DeleteOrderParameters = [
  {
    name: 'orderId',
    type: 'Path',
    schema: z.number().int()
  }
] as const;
export const DeleteOrderResponse = z.void();
export const DeleteOrderErrors = [
  {
    status: 400,
    description: `Invalid ID supplied`,
    schema: z.void()
  },
  {
    status: 404,
    description: `Order not found`,
    schema: z.void()
  }
] as const;

export const CreateUserParameters = [
  {
    name: 'body',
    description: `Created user object`,
    type: 'Body',
    schema: User
  }
] as const;
export const CreateUserResponse = User;
export const CreateUserErrors = [] as const;

export const GetUserByNameParameters = [
  {
    name: 'username',
    type: 'Path',
    schema: z.string()
  }
] as const;
export const GetUserByNameResponse = User;
export const GetUserByNameErrors = [
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
] as const;

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
export const UpdateUserResponse = User;
export const UpdateUserErrors = [] as const;

export const DeleteUserParameters = [
  {
    name: 'username',
    type: 'Path',
    schema: z.string()
  }
] as const;
export const DeleteUserResponse = z.void();
export const DeleteUserErrors = [
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
] as const;

export const CreateUsersWithListInputParameters = [
  {
    name: 'body',
    type: 'Body',
    schema: z.array(User)
  }
] as const;
export const CreateUsersWithListInputResponse = User;
export const CreateUsersWithListInputErrors = [] as const;

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
export const LoginUserResponse = z.string();
export const LoginUserErrors = [
  {
    status: 400,
    description: `Invalid username/password supplied`,
    schema: z.void()
  }
] as const;

export const LogoutUserParameters = [] as const;
export const LogoutUserResponse = z.void();
export const LogoutUserErrors = [] as const;
