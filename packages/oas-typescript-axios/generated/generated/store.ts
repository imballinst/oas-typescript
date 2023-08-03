import { z } from 'zod';
import axios from 'axios';

// Schemas.
export const Order = z
  .object({
    id: z.number().int(),
    petId: z.number().int(),
    quantity: z.number().int(),
    shipDate: z.string().datetime({ offset: true }),
    status: z.enum(['placed', 'approved', 'delivered']),
    complete: z.boolean()
  })
  .partial()
  .passthrough();
export interface Order extends z.infer<typeof Order> {}

const PlaceOrderParams = z.object({ body: Order });
const GetOrderByIdParams = z.object({
  params: z.object({ orderId: z.number().int() })
});
const DeleteOrderParams = z.object({
  params: z.object({ orderId: z.number().int() })
});

export function storeApi() {
  function getInventory() {
    let url = `/store/inventory`;

    return axios(url);
  }
  function placeOrder(fnParam: z.infer<typeof PlaceOrderParams>) {
    let url = `/store/order`;

    return axios(url, { data: fnParam.body });
  }
  function getOrderById(fnParam: z.infer<typeof GetOrderByIdParams>) {
    let url = `/store/order/${fnParam.params.orderId}`;

    return axios(url);
  }
  function deleteOrder(fnParam: z.infer<typeof DeleteOrderParams>) {
    let url = `/store/order/${fnParam.params.orderId}`;

    return axios(url);
  }

  return {
    getInventory,
    placeOrder,
    getOrderById,
    deleteOrder
  };
}
