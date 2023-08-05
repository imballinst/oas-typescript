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
  function getInventory(axiosConfig?: AxiosRequestConfig) {
    let url = `/store/inventory`;

    const config = {
      ...defaultAxiosRequestConfig,
      ...axiosConfig,
      headers: {
        ...defaultAxiosRequestConfig?.headers,
        ...axiosConfig?.headers
      }
    };
    return axios(url, config);
  }
  function placeOrder(
    fnParam: z.infer<typeof PlaceOrderParams>,
    axiosConfig?: AxiosRequestConfig
  ) {
    let url = `/store/order`;

    const config = {
      ...defaultAxiosRequestConfig,
      ...axiosConfig,
      headers: {
        ...defaultAxiosRequestConfig?.headers,
        ...axiosConfig?.headers
      }
    };
    return axios(url, { ...config, data: fnParam.body });
  }
  function getOrderById(
    fnParam: z.infer<typeof GetOrderByIdParams>,
    axiosConfig?: AxiosRequestConfig
  ) {
    let url = `/store/order/${fnParam.params.orderId}`;

    const config = {
      ...defaultAxiosRequestConfig,
      ...axiosConfig,
      headers: {
        ...defaultAxiosRequestConfig?.headers,
        ...axiosConfig?.headers
      }
    };
    return axios(url, config);
  }
  function deleteOrder(
    fnParam: z.infer<typeof DeleteOrderParams>,
    axiosConfig?: AxiosRequestConfig
  ) {
    let url = `/store/order/${fnParam.params.orderId}`;

    const config = {
      ...defaultAxiosRequestConfig,
      ...axiosConfig,
      headers: {
        ...defaultAxiosRequestConfig?.headers,
        ...axiosConfig?.headers
      }
    };
    return axios(url, config);
  }

  return {
    getInventory,
    placeOrder,
    getOrderById,
    deleteOrder
  };
}
