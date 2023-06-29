import { z } from 'zod';

const Category = z.object({ id: z.number().int(), name: z.string() }).partial();
const Tag = z.object({ id: z.number().int(), name: z.string() }).partial();
const Pet = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  category: Category.optional(),
  photoUrls: z.array(z.string()),
  tags: z.array(Tag).optional(),
  status: z.enum(['available', 'pending', 'sold']).optional()
});
const ApiResponse = z
  .object({ code: z.number().int(), type: z.string(), message: z.string() })
  .partial();
const Order = z
  .object({
    id: z.number().int(),
    petId: z.number().int(),
    quantity: z.number().int(),
    shipDate: z.string().datetime({ offset: true }),
    status: z.enum(['placed', 'approved', 'delivered']),
    complete: z.boolean()
  })
  .partial();
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
  .partial();

export const schemas = {
  Category,
  Tag,
  Pet,
  ApiResponse,
  Order,
  User
};

export const endpointParameters = {
  updatePet: {
    parameters: [
      {
        name: 'body',
        description: `Update an existent pet in the store`,
        type: 'Body',
        schema: Pet
      }
    ],
    security: [{ petstore_auth: ['write:pets', 'read:pets'] }],
    response: Pet,
    errors: {
      '400': {
        status: 400,
        description: `Invalid ID supplied`,
        schema: z.void()
      },
      '404': {
        status: 404,
        description: `Pet not found`,
        schema: z.void()
      },
      '405': {
        status: 405,
        description: `Validation exception`,
        schema: z.void()
      }
    }
  },
  addPet: {
    parameters: [
      {
        name: 'body',
        description: `Create a new pet in the store`,
        type: 'Body',
        schema: Pet
      }
    ],
    security: [{ petstore_auth: ['write:pets', 'read:pets'] }],
    response: Pet,
    errors: {
      '405': {
        status: 405,
        description: `Invalid input`,
        schema: z.void()
      }
    }
  },
  getPetById: {
    parameters: [
      {
        name: 'petId',
        type: 'Path',
        schema: z.number().int()
      }
    ],
    security: [{ api_key: [] }, { petstore_auth: ['write:pets', 'read:pets'] }],
    response: Pet,
    errors: {
      '400': {
        status: 400,
        description: `Invalid ID supplied`,
        schema: z.void()
      },
      '404': {
        status: 404,
        description: `Pet not found`,
        schema: z.void()
      }
    }
  },
  updatePetWithForm: {
    parameters: [
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
    ],
    security: [{ petstore_auth: ['write:pets', 'read:pets'] }],
    response: z.void(),
    errors: {
      '405': {
        status: 405,
        description: `Invalid input`,
        schema: z.void()
      }
    }
  },
  deletePet: {
    parameters: [
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
    ],
    security: [{ petstore_auth: ['write:pets', 'read:pets'] }],
    response: z.void(),
    errors: {
      '400': {
        status: 400,
        description: `Invalid pet value`,
        schema: z.void()
      }
    }
  },
  uploadFile: {
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: z.instanceof(File)
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
    ],
    security: [{ petstore_auth: ['write:pets', 'read:pets'] }],
    response: ApiResponse
  },
  findPetsByStatus: {
    parameters: [
      {
        name: 'status',
        type: 'Query',
        schema: z
          .enum(['available', 'pending', 'sold'])
          .optional()
          .default('available')
      }
    ],
    security: [{ petstore_auth: ['write:pets', 'read:pets'] }],
    response: z.array(Pet),
    errors: {
      '400': {
        status: 400,
        description: `Invalid status value`,
        schema: z.void()
      }
    }
  },
  findPetsByTags: {
    parameters: [
      {
        name: 'tags',
        type: 'Query',
        schema: z.array(z.string()).optional()
      }
    ],
    security: [{ petstore_auth: ['write:pets', 'read:pets'] }],
    response: z.array(Pet),
    errors: {
      '400': {
        status: 400,
        description: `Invalid tag value`,
        schema: z.void()
      }
    }
  },
  getInventory: {
    parameters: [],
    security: [{ api_key: [] }],
    response: z.record(z.number())
  },
  placeOrder: {
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: Order
      }
    ],
    response: Order,
    errors: {
      '405': {
        status: 405,
        description: `Invalid input`,
        schema: z.void()
      }
    }
  },
  getOrderById: {
    parameters: [
      {
        name: 'orderId',
        type: 'Path',
        schema: z.number().int()
      }
    ],
    response: Order,
    errors: {
      '400': {
        status: 400,
        description: `Invalid ID supplied`,
        schema: z.void()
      },
      '404': {
        status: 404,
        description: `Order not found`,
        schema: z.void()
      }
    }
  },
  deleteOrder: {
    parameters: [
      {
        name: 'orderId',
        type: 'Path',
        schema: z.number().int()
      }
    ],
    response: z.void(),
    errors: {
      '400': {
        status: 400,
        description: `Invalid ID supplied`,
        schema: z.void()
      },
      '404': {
        status: 404,
        description: `Order not found`,
        schema: z.void()
      }
    }
  },
  createUser: {
    parameters: [
      {
        name: 'body',
        description: `Created user object`,
        type: 'Body',
        schema: User
      }
    ],
    response: z.void()
  },
  getUserByName: {
    parameters: [
      {
        name: 'username',
        type: 'Path',
        schema: z.string()
      }
    ],
    response: User,
    errors: {
      '400': {
        status: 400,
        description: `Invalid username supplied`,
        schema: z.void()
      },
      '404': {
        status: 404,
        description: `User not found`,
        schema: z.void()
      }
    }
  },
  updateUser: {
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
    response: z.void()
  },
  deleteUser: {
    parameters: [
      {
        name: 'username',
        type: 'Path',
        schema: z.string()
      }
    ],
    response: z.void(),
    errors: {
      '400': {
        status: 400,
        description: `Invalid username supplied`,
        schema: z.void()
      },
      '404': {
        status: 404,
        description: `User not found`,
        schema: z.void()
      }
    }
  },
  createUsersWithListInput: {
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: z.array(User)
      }
    ],
    response: User
  },
  loginUser: {
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
    errors: {
      '400': {
        status: 400,
        description: `Invalid username/password supplied`,
        schema: z.void()
      }
    }
  },
  logoutUser: {
    parameters: [],
    response: z.void()
  }
};
