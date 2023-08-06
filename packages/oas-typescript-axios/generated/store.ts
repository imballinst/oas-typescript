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
    axiosConfig?: AxiosRequestConfig
  ): Promise<GetInventoryResponse> {
    let url = `/store/inventory`;

    const config = {
      ...defaultAxiosRequestConfig,
      ...axiosConfig,
      headers: {
        ...defaultAxiosRequestConfig?.headers,
        ...axiosConfig?.headers
      }
    };
    const response = await axios(url, config);
    return z.record(z.number().int()).parse(response.data);
  }
  async function placeOrder(
    fnParam: z.infer<typeof PlaceOrderParams>,
    axiosConfig?: AxiosRequestConfig
  ): Promise<Order> {
    let url = `/store/order`;

    const config = {
      ...defaultAxiosRequestConfig,
      ...axiosConfig,
      headers: {
        ...defaultAxiosRequestConfig?.headers,
        ...axiosConfig?.headers
      }
    };
    const response = await axios(url, { ...config, data: fnParam.body });
    return Order.parse(response.data);
  }
  async function getOrderById(
    fnParam: z.infer<typeof GetOrderByIdParams>,
    axiosConfig?: AxiosRequestConfig
  ): Promise<Order> {
    let url = `/store/order/${fnParam.params.orderId}`;

    const config = {
      ...defaultAxiosRequestConfig,
      ...axiosConfig,
      headers: {
        ...defaultAxiosRequestConfig?.headers,
        ...axiosConfig?.headers
      }
    };
    const response = await axios(url, config);
    return Order.parse(response.data);
  }
  async function deleteOrder(
    fnParam: z.infer<typeof DeleteOrderParams>,
    axiosConfig?: AxiosRequestConfig
  ): Promise<void> {
    let url = `/store/order/${fnParam.params.orderId}`;

    const config = {
      ...defaultAxiosRequestConfig,
      ...axiosConfig,
      headers: {
        ...defaultAxiosRequestConfig?.headers,
        ...axiosConfig?.headers
      }
    };
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
