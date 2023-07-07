import {
  CreateUserParameters,
  CreateUsersWithListInputParameters,
  LoginUserParameters,
  LogoutUserParameters,
  GetUserByNameParameters,
  UpdateUserParameters,
  DeleteUserParameters
} from '../generated/client';
import { ParsedRequestInfo } from '../utils';

export class UserController {
  static async createUser(
    params: ParsedRequestInfo<typeof CreateUserParameters>
  ) {
    return {
      body: undefined,
      status: 200
    };
  }
  static async createUsersWithListInput(
    params: ParsedRequestInfo<typeof CreateUsersWithListInputParameters>
  ) {
    return {
      body: undefined,
      status: 200
    };
  }
  static async loginUser(
    params: ParsedRequestInfo<typeof LoginUserParameters>
  ) {
    return {
      body: undefined,
      status: 200
    };
  }
  static async logoutUser(
    params: ParsedRequestInfo<typeof LogoutUserParameters>
  ) {
    return {
      body: undefined,
      status: 200
    };
  }
  static async getUserByName(
    params: ParsedRequestInfo<typeof GetUserByNameParameters>
  ) {
    return {
      body: undefined,
      status: 200
    };
  }
  static async updateUser(
    params: ParsedRequestInfo<typeof UpdateUserParameters>
  ) {
    return {
      body: undefined,
      status: 200
    };
  }
  static async deleteUser(
    params: ParsedRequestInfo<typeof DeleteUserParameters>
  ) {
    return {
      body: undefined,
      status: 200
    };
  }
}
