import { 
  GetInventoryParameters,
  PlaceOrderParameters,
  GetOrderByIdParameters,
  DeleteOrderParameters
} from '../client'
import { FilterByParameterType } from '../utils';

export class StoreController {
static async getInventory(params: FilterByParameterType<typeof GetInventoryParameters>) {

}
  static async placeOrder(params: FilterByParameterType<typeof PlaceOrderParameters>) {

}
  static async getOrderById(params: FilterByParameterType<typeof GetOrderByIdParameters>) {

}
  static async deleteOrder(params: FilterByParameterType<typeof DeleteOrderParameters>) {

}
}