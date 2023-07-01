import { 
  GetInventoryParameters,
  PlaceOrderParameters,
  GetOrderByIdParameters,
  DeleteOrderParameters
} from '../client'
import { ParsedRequestInfo } from '../utils';

export class StoreController {
static async getInventory(params: ParsedRequestInfo<typeof GetInventoryParameters>) {

}
  static async placeOrder(params: ParsedRequestInfo<typeof PlaceOrderParameters>) {

}
  static async getOrderById(params: ParsedRequestInfo<typeof GetOrderByIdParameters>) {

}
  static async deleteOrder(params: ParsedRequestInfo<typeof DeleteOrderParameters>) {

}
}