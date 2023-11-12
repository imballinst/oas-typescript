import {
  GetInventoryControllerFunction,
  PlaceOrderControllerFunction,
  GetOrderByIdControllerFunction,
  DeleteOrderControllerFunction
} from '../static/controller-types/StoreControllerTypes';

export class StoreController {
  static getInventory: GetInventoryControllerFunction = (params) => {
    return {
      body: undefined,
      status: undefined
    };
  };
  static placeOrder: PlaceOrderControllerFunction = (params) => {
    return {
      body: undefined,
      status: undefined
    };
  };
  static getOrderById: GetOrderByIdControllerFunction = (params) => {
    return {
      body: undefined,
      status: undefined
    };
  };
  static deleteOrder: DeleteOrderControllerFunction = (params) => {
    return {
      body: undefined,
      status: undefined
    };
  };
}
