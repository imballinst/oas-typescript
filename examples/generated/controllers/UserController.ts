import {
  CreateUserControllerFunction,
  CreateUsersWithListInputControllerFunction,
  LoginUserControllerFunction,
  LogoutUserControllerFunction,
  GetUserByNameControllerFunction,
  UpdateUserControllerFunction,
  DeleteUserControllerFunction
} from '../generated/controller-types/UserControllerTypes.js';

export class UserController {
  static createUser: CreateUserControllerFunction = (params) => {
    return {
      data: undefined,
      status: 200
    };
  };
  static createUsersWithListInput: CreateUsersWithListInputControllerFunction =
    (params) => {
      return {
        data: undefined,
        status: 200
      };
    };
  static loginUser: LoginUserControllerFunction = (params) => {
    return {
      data: undefined,
      status: 200
    };
  };
  static logoutUser: LogoutUserControllerFunction = (params) => {
    return {
      data: undefined,
      status: 204
    };
  };
  static getUserByName: GetUserByNameControllerFunction = (params) => {
    return {
      data: undefined,
      status: 200
    };
  };
  static updateUser: UpdateUserControllerFunction = (params) => {
    return {
      data: undefined,
      status: 200
    };
  };
  static deleteUser: DeleteUserControllerFunction = (params) => {
    return {
      data: undefined,
      status: 204
    };
  };
}
