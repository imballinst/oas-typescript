import {
  AddPetParameters,
  AddPetErrors,
  AddPetResponse,
  UpdatePetParameters,
  UpdatePetErrors,
  UpdatePetResponse
} from '../client.js';
import { ParsedRequestInfo } from '../utils.js';
import { ControllerReturnType, ErrorStatuses } from '../types.js';

export type AddPetControllerFunction = (
  params: ParsedRequestInfo<typeof AddPetParameters>
) => ControllerReturnType<{
  success: AddPetResponse;
  error: AddPetErrors;
}>;

export type UpdatePetControllerFunction = (
  params: ParsedRequestInfo<typeof UpdatePetParameters>
) => ControllerReturnType<{
  success: UpdatePetResponse;
  error: UpdatePetErrors;
}>;
