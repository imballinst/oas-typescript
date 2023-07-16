import {
  GetInventoryParameters,
  GetInventoryErrors,
  GetInventoryResponse,
  PlaceOrderParameters,
  PlaceOrderErrors,
  PlaceOrderResponse,
  GetOrderByIdParameters,
  GetOrderByIdErrors,
  GetOrderByIdResponse,
  DeleteOrderParameters,
  DeleteOrderErrors,
  DeleteOrderResponse
} from '../client.js';
import { ParsedRequestInfo } from '../utils.js';
import { ControllerReturnType, ErrorStatuses } from '../types.js';

export type GetInventoryControllerFunction = (
  params: ParsedRequestInfo<typeof GetInventoryParameters>
) => ControllerReturnType<
  typeof GetInventoryResponse,
  ErrorStatuses<typeof GetInventoryErrors>,
  200
>;

export type PlaceOrderControllerFunction = (
  params: ParsedRequestInfo<typeof PlaceOrderParameters>
) => ControllerReturnType<
  typeof PlaceOrderResponse,
  ErrorStatuses<typeof PlaceOrderErrors>,
  200
>;

export type GetOrderByIdControllerFunction = (
  params: ParsedRequestInfo<typeof GetOrderByIdParameters>
) => ControllerReturnType<
  typeof GetOrderByIdResponse,
  ErrorStatuses<typeof GetOrderByIdErrors>,
  200
>;

export type DeleteOrderControllerFunction = (
  params: ParsedRequestInfo<typeof DeleteOrderParameters>
) => ControllerReturnType<
  typeof DeleteOrderResponse,
  ErrorStatuses<typeof DeleteOrderErrors>,
  204
>;
