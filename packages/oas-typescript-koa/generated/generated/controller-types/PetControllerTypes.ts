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
  success: {
    schema: AddPetResponse;
    status: 200;
  };
  error: {
    '405': {
      schema: 'AddPetErrors';
      status: '405';
    };
  };
}>;

export type UpdatePetControllerFunction = (
  params: ParsedRequestInfo<typeof UpdatePetParameters>
) => ControllerReturnType<{
  success: {
    schema: UpdatePetResponse;
    status: 200;
    headers: {
      'x-ratelimit': {
        schema: 'string';
        nullable: true;
      };
    };
  };
  error: {
    '400': {
      schema: 'UpdatePetErrors';
      status: '400';
    };
    '404': {
      schema: 'UpdatePetErrors';
      status: '404';
    };
    '405': {
      schema: 'UpdatePetErrors';
      status: '405';
    };
  };
}>;
