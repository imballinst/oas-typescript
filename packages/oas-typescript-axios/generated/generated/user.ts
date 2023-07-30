import { z } from 'zod';
import axios from 'axios';
import { getQueryParameterString } from './utils/query.js';

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

export function userApi() {
  function createUser(fnParam: z.infer<typeof CreateUserParams>) {
    let url = `/user`;

    return axios(url);
  }
  function createUsersWithListInput(
    fnParam: z.infer<typeof CreateUsersWithListInputParams>
  ) {
    let url = `/user/createWithList`;

    return axios(url);
  }
  function loginUser(fnParam: z.infer<typeof LoginUserParams>) {
    let url = `/user/login`;
    url += getQueryParameterString(fnParam.query);

    return axios(url);
  }
  function logoutUser() {
    let url = `/user/logout`;

    return axios(url);
  }
  function getUserByName(fnParam: z.infer<typeof GetUserByNameParams>) {
    let url = `/user/:username`;

    return axios(url);
  }
  function updateUser(fnParam: z.infer<typeof UpdateUserParams>) {
    let url = `/user/:username`;

    return axios(url);
  }
  function deleteUser(fnParam: z.infer<typeof DeleteUserParams>) {
    let url = `/user/:username`;

    return axios(url);
  }

  return {
    createUser,
    createUsersWithListInput,
    loginUser,
    logoutUser,
    getUserByName,
    updateUser,
    deleteUser
  };
}
