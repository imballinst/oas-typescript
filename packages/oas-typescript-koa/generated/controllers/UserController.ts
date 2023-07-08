import {
  CreateUserParameters,
  CreateUserResponse,
  CreateUsersWithListInputParameters,
  CreateUsersWithListInputResponse,
  LoginUserParameters,
  LoginUserErrors,
  LoginUserResponse,
  LogoutUserParameters,
  LogoutUserResponse,
  GetUserByNameParameters,
  GetUserByNameErrors,
  GetUserByNameResponse,
  UpdateUserParameters,
  UpdateUserResponse,
  DeleteUserParameters,
  DeleteUserErrors
} from '../generated/client.js';
import { ParsedRequestInfo } from '../generated/utils.js';
import { ControllerReturnType, ErrorStatuses } from '../generated/types.js';

export class UserController {
  static async createUser(
    params: ParsedRequestInfo<typeof CreateUserParameters>
  ): Promise<
    ControllerReturnType<
      typeof CreateUserResponse,
      ErrorStatuses<typeof undefined>,
      NaN
    >
  > {
    return {
      data: undefined,
      status: NaN
    };
  }
  static async createUsersWithListInput(
    params: ParsedRequestInfo<typeof CreateUsersWithListInputParameters>
  ): Promise<
    ControllerReturnType<
      typeof CreateUsersWithListInputResponse,
      ErrorStatuses<typeof undefined>,
      200
    >
  > {
    return {
      data: undefined,
      status: 200
    };
  }
  static async loginUser(
    params: ParsedRequestInfo<typeof LoginUserParameters>
  ): Promise<
    ControllerReturnType<
      typeof LoginUserResponse,
      ErrorStatuses<typeof LoginUserErrors>,
      200
    >
  > {
    return {
      data: undefined,
      status: 200
    };
  }
  static async logoutUser(
    params: ParsedRequestInfo<typeof LogoutUserParameters>
  ): Promise<
    ControllerReturnType<
      typeof LogoutUserResponse,
      ErrorStatuses<typeof undefined>,
      NaN
    >
  > {
    return {
      data: undefined,
      status: NaN
    };
  }
  static async getUserByName(
    params: ParsedRequestInfo<typeof GetUserByNameParameters>
  ): Promise<
    ControllerReturnType<
      typeof GetUserByNameResponse,
      ErrorStatuses<typeof GetUserByNameErrors>,
      200
    >
  > {
    return {
      data: undefined,
      status: 200
    };
  }
  static async updateUser(
    params: ParsedRequestInfo<typeof UpdateUserParameters>
  ): Promise<
    ControllerReturnType<
      typeof UpdateUserResponse,
      ErrorStatuses<typeof undefined>,
      NaN
    >
  > {
    return {
      data: undefined,
      status: NaN
    };
  }
  static async deleteUser(
    params: ParsedRequestInfo<typeof DeleteUserParameters>
  ): Promise<
    ControllerReturnType<
      typeof undefined,
      ErrorStatuses<typeof DeleteUserErrors>,
      NaN
    >
  > {
    return {
      data: undefined,
      status: NaN
    };
  }
}
