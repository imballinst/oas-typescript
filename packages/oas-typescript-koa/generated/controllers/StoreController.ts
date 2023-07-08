import {
  GetInventoryResponse,
  PlaceOrderParameters,
  PlaceOrderErrors,
  PlaceOrderResponse,
  GetOrderByIdParameters,
  GetOrderByIdErrors,
  GetOrderByIdResponse,
  DeleteOrderParameters,
  DeleteOrderErrors
} from '../generated/client.js';
import { ParsedRequestInfo } from '../generated/utils.js';
import { ControllerReturnType, ErrorStatuses } from '../generated/types.js';

export class StoreController {
  static async getInventory(
    params: ParsedRequestInfo<typeof undefined>
  ): Promise<
    ControllerReturnType<
      typeof GetInventoryResponse,
      ErrorStatuses<typeof undefined>,
      200
    >
  > {
    return {
      data: undefined,
      status: 200
    };
  }
  static async placeOrder(
    params: ParsedRequestInfo<typeof PlaceOrderParameters>
  ): Promise<
    ControllerReturnType<
      typeof PlaceOrderResponse,
      ErrorStatuses<typeof PlaceOrderErrors>,
      200
    >
  > {
    return {
      data: undefined,
      status: 200
    };
  }
  static async getOrderById(
    params: ParsedRequestInfo<typeof GetOrderByIdParameters>
  ): Promise<
    ControllerReturnType<
      typeof GetOrderByIdResponse,
      ErrorStatuses<typeof GetOrderByIdErrors>,
      200
    >
  > {
    return {
      data: undefined,
      status: 200
    };
  }
  static async deleteOrder(
    params: ParsedRequestInfo<typeof DeleteOrderParameters>
  ): Promise<
    ControllerReturnType<
      typeof undefined,
      ErrorStatuses<typeof DeleteOrderErrors>,
      NaN
    >
  > {
    return {
      data: undefined,
      status: NaN
    };
  }
}
