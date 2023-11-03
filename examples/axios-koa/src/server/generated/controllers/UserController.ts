import {
  CreateUserControllerFunction,
  CreateUsersWithListInputControllerFunction,
  LoginUserControllerFunction,
  LogoutUserControllerFunction,
  GetUserByNameControllerFunction,
  UpdateUserControllerFunction,
  DeleteUserControllerFunction
} from '../static/controller-types/UserControllerTypes.js';

export class UserController {
  static createUser: CreateUserControllerFunction = (params) => {
    return {
      data: undefined,
      status: undefined
    };
  };
  static createUsersWithListInput: CreateUsersWithListInputControllerFunction =
    (params) => {
      return {
        data: undefined,
        status: undefined
      };
    };
  static loginUser: LoginUserControllerFunction = (params) => {
    return {
      data: undefined,
      status: undefined
    };
  };
  static logoutUser: LogoutUserControllerFunction = (params) => {
    return {
      data: undefined,
      status: undefined
    };
  };
  static getUserByName: GetUserByNameControllerFunction = (params) => {
    return {
      data: undefined,
      status: undefined
    };
  };
  static updateUser: UpdateUserControllerFunction = (params) => {
    return {
      data: undefined,
      status: undefined
    };
  };
  static deleteUser: DeleteUserControllerFunction = (params) => {
    return {
      data: undefined,
      status: undefined
    };
  };
}
