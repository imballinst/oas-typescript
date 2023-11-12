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
} from '../client';
import { ParsedRequestInfo } from '../utils';
import { ControllerReturnType, ErrorStatuses } from '../types';

export type GetInventoryControllerFunction = (
  params: ParsedRequestInfo<typeof GetInventoryParameters>
) => ControllerReturnType<{
  success: GetInventoryResponse;
  error: GetInventoryErrors;
}>;

export type PlaceOrderControllerFunction = (
  params: ParsedRequestInfo<typeof PlaceOrderParameters>
) => ControllerReturnType<{
  success: PlaceOrderResponse;
  error: PlaceOrderErrors;
}>;

export type GetOrderByIdControllerFunction = (
  params: ParsedRequestInfo<typeof GetOrderByIdParameters>
) => ControllerReturnType<{
  success: GetOrderByIdResponse;
  error: GetOrderByIdErrors;
}>;

export type DeleteOrderControllerFunction = (
  params: ParsedRequestInfo<typeof DeleteOrderParameters>
) => ControllerReturnType<{
  success: DeleteOrderResponse;
  error: DeleteOrderErrors;
}>;
