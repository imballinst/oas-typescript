import { z } from "zod";

export const Category = z
  .object({ id: z.number().int(), name: z.string() })
  .partial();
export const Tag = z
  .object({ id: z.number().int(), name: z.string() })
  .partial();
export const Pet = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  category: Category.optional(),
  photoUrls: z.array(z.string()),
  tags: z.array(Tag).optional(),
  status: z.enum(["available", "pending", "sold"]).optional(),
});
export const ApiResponse = z
  .object({ code: z.number().int(), type: z.string(), message: z.string() })
  .partial();
export const Order = z
  .object({
    id: z.number().int(),
    petId: z.number().int(),
    quantity: z.number().int(),
    shipDate: z.string().datetime({ offset: true }),
    status: z.enum(["placed", "approved", "delivered"]),
    complete: z.boolean(),
  })
  .partial();
export const User = z
  .object({
    id: z.number().int(),
    username: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    email: z.string(),
    password: z.string(),
    phone: z.string(),
    userStatus: z.number().int(),
  })
  .partial();

export const Parameters = [
  {
    name: "body",
    description: `Update an existent pet in the store`,
    type: "Body",
    schema: Pet,
  },
] as const;

export const Parameters = [
  {
    name: "body",
    description: `Create a new pet in the store`,
    type: "Body",
    schema: Pet,
  },
] as const;

export const Parameters = [
  {
    name: "petId",
    type: "Path",
    schema: z.number().int(),
  },
] as const;

export const Parameters = [
  {
    name: "petId",
    type: "Path",
    schema: z.number().int(),
  },
  {
    name: "name",
    type: "Query",
    schema: z.string().optional(),
  },
  {
    name: "status",
    type: "Query",
    schema: z.string().optional(),
  },
] as const;

export const Parameters = [
  {
    name: "api_key",
    type: "Header",
    schema: z.string().optional(),
  },
  {
    name: "petId",
    type: "Path",
    schema: z.number().int(),
  },
] as const;

export const Parameters = [
  {
    name: "body",
    type: "Body",
    schema: z.instanceof(File),
  },
  {
    name: "petId",
    type: "Path",
    schema: z.number().int(),
  },
  {
    name: "additionalMetadata",
    type: "Query",
    schema: z.string().optional(),
  },
] as const;

export const Parameters = [
  {
    name: "status",
    type: "Query",
    schema: z
      .enum(["available", "pending", "sold"])
      .optional()
      .default("available"),
  },
] as const;

export const Parameters = [
  {
    name: "tags",
    type: "Query",
    schema: z.array(z.string()).optional(),
  },
] as const;

export const Parameters = [] as const;

export const Parameters = [
  {
    name: "body",
    type: "Body",
    schema: Order,
  },
] as const;

export const Parameters = [
  {
    name: "orderId",
    type: "Path",
    schema: z.number().int(),
  },
] as const;

export const Parameters = [
  {
    name: "orderId",
    type: "Path",
    schema: z.number().int(),
  },
] as const;

export const Parameters = [
  {
    name: "body",
    description: `Created user object`,
    type: "Body",
    schema: User,
  },
] as const;

export const Parameters = [
  {
    name: "username",
    type: "Path",
    schema: z.string(),
  },
] as const;

export const Parameters = [
  {
    name: "body",
    description: `Update an existent user in the store`,
    type: "Body",
    schema: User,
  },
  {
    name: "username",
    type: "Path",
    schema: z.string(),
  },
] as const;

export const Parameters = [
  {
    name: "username",
    type: "Path",
    schema: z.string(),
  },
] as const;

export const Parameters = [
  {
    name: "body",
    type: "Body",
    schema: z.array(User),
  },
] as const;

export const Parameters = [
  {
    name: "username",
    type: "Query",
    schema: z.string().optional(),
  },
  {
    name: "password",
    type: "Query",
    schema: z.string().optional(),
  },
] as const;

export const Parameters = [] as const;
