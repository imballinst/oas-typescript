import {
  GetInventoryControllerFunction,
  PlaceOrderControllerFunction,
  GetOrderByIdControllerFunction,
  DeleteOrderControllerFunction
} from '../generated/controller-types/StoreControllerTypes.js';

export class StoreController {
  static getInventory: GetInventoryControllerFunction = (params) => {
    return {
      data: undefined,
      status: 200
    };
  };
  static placeOrder: PlaceOrderControllerFunction = (params) => {
    return {
      data: undefined,
      status: 200
    };
  };
  static getOrderById: GetOrderByIdControllerFunction = (params) => {
    return {
      data: undefined,
      status: 200
    };
  };
  static deleteOrder: DeleteOrderControllerFunction = (params) => {
    return {
      data: undefined,
      status: 204
    };
  };
}
