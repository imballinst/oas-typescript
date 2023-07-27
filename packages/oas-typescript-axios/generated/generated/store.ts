import { z } from 'zod';

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

export class StoreApi {
  getInventory = () => {};
  placeOrder = (params: z.infer<typeof PlaceOrderParams>) => {};
  getOrderById = (params: z.infer<typeof GetOrderByIdParams>) => {};
  deleteOrder = (params: z.infer<typeof DeleteOrderParams>) => {};
}
