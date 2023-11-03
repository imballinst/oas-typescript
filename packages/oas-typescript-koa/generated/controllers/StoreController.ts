import {
  GetInventoryControllerFunction,
  PlaceOrderControllerFunction,
  GetOrderByIdControllerFunction,
  DeleteOrderControllerFunction
} from '../static/controller-types/StoreControllerTypes.js';

export class StoreController {
  static getInventory: GetInventoryControllerFunction = (params) => {
    return {
      data: undefined,
      status: undefined
    };
  };
  static placeOrder: PlaceOrderControllerFunction = (params) => {
    return {
      data: undefined,
      status: undefined
    };
  };
  static getOrderById: GetOrderByIdControllerFunction = (params) => {
    return {
      data: undefined,
      status: undefined
    };
  };
  static deleteOrder: DeleteOrderControllerFunction = (params) => {
    return {
      data: undefined,
      status: undefined
    };
  };
}
