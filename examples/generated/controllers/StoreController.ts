import {
  GetInventoryParameters,
  PlaceOrderParameters,
  GetOrderByIdParameters,
  DeleteOrderParameters
} from '../generated/client.js';
import { ParsedRequestInfo } from '../generated/utils.js';

export class StoreController {
  static async getInventory(
    params: ParsedRequestInfo<typeof GetInventoryParameters>
  ) {
    return {
      body: undefined,
      status: 200
    };
  }
  static async placeOrder(
    params: ParsedRequestInfo<typeof PlaceOrderParameters>
  ) {
    return {
      body: undefined,
      status: 200
    };
  }
  static async getOrderById(
    params: ParsedRequestInfo<typeof GetOrderByIdParameters>
  ) {
    return {
      body: undefined,
      status: 200
    };
  }
  static async deleteOrder(
    params: ParsedRequestInfo<typeof DeleteOrderParameters>
  ) {
    return {
      body: undefined,
      status: 200
    };
  }
}
