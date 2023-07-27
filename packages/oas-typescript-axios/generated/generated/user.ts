import { z } from 'zod';

// Schemas.
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

const CreateUserParams = z.object({ body: User });
const CreateUsersWithListInputParams = z.object({ body: z.array(User) });
const LoginUserParams = z.object({
  query: z.object({
    username: z.string().optional(),
    password: z.string().optional()
  })
});
const GetUserByNameParams = z.object({
  params: z.object({ username: z.string() })
});
const UpdateUserParams = z.object({
  params: z.object({ username: z.string() }),
  body: User
});
const DeleteUserParams = z.object({
  params: z.object({ username: z.string() })
});

export class UserApi {
  createUser = (params: z.infer<typeof CreateUserParams>) => {};
  createUsersWithListInput = (
    params: z.infer<typeof CreateUsersWithListInputParams>
  ) => {};
  loginUser = (params: z.infer<typeof LoginUserParams>) => {};
  logoutUser = () => {};
  getUserByName = (params: z.infer<typeof GetUserByNameParams>) => {};
  updateUser = (params: z.infer<typeof UpdateUserParams>) => {};
  deleteUser = (params: z.infer<typeof DeleteUserParams>) => {};
}
