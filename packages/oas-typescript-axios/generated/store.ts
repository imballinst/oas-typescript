import { z } from 'zod';
import axios, { AxiosRequestConfig } from 'axios';

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

const GetInventoryResponse = z.record(z.number().int());
interface GetInventoryResponse extends z.infer<typeof GetInventoryResponse> {}

const PlaceOrderParams = z.object({ body: Order });

const GetOrderByIdParams = z.object({
  params: z.object({ orderId: z.number().int() })
});

const DeleteOrderParams = z.object({
  params: z.object({ orderId: z.number().int() })
});

export function StoreApi({
  defaultAxiosRequestConfig
}: {
  defaultAxiosRequestConfig?: AxiosRequestConfig;
}) {
  async function getInventory(
    axiosRequestConfig?: AxiosRequestConfig
  ): Promise<GetInventoryResponse> {
    const { url, config } = getFinalUrlAndRequestConfig({
      url: `/store/inventory`,
      method: 'get',
      defaultAxiosRequestConfig,
      axiosRequestConfig
    });

    const response = await axios(url, config);
    return z.record(z.number().int()).parse(response.data);
  }
  async function placeOrder(
    fnParam: z.infer<typeof PlaceOrderParams>,
    axiosRequestConfig?: AxiosRequestConfig
  ): Promise<Order> {
    const { url, config } = getFinalUrlAndRequestConfig({
      url: `/store/order`,
      method: 'post',
      defaultAxiosRequestConfig,
      axiosRequestConfig
    });

    const response = await axios(url, { ...config, data: fnParam.body });
    return Order.parse(response.data);
  }
  async function getOrderById(
    fnParam: z.infer<typeof GetOrderByIdParams>,
    axiosRequestConfig?: AxiosRequestConfig
  ): Promise<Order> {
    const { url, config } = getFinalUrlAndRequestConfig({
      url: `/store/order/${fnParam.params.orderId}`,
      method: 'get',
      defaultAxiosRequestConfig,
      axiosRequestConfig
    });

    const response = await axios(url, config);
    return Order.parse(response.data);
  }
  async function deleteOrder(
    fnParam: z.infer<typeof DeleteOrderParams>,
    axiosRequestConfig?: AxiosRequestConfig
  ): Promise<void> {
    const { url, config } = getFinalUrlAndRequestConfig({
      url: `/store/order/${fnParam.params.orderId}`,
      method: 'delete',
      defaultAxiosRequestConfig,
      axiosRequestConfig
    });

    const response = await axios(url, config);
    return z.void().parse(response.data);
  }

  return {
    getInventory,
    placeOrder,
    getOrderById,
    deleteOrder
  };
}
