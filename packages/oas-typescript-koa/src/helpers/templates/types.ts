export interface OperationInfo {
  operationId: string;
  functionType: string;
  parametersName?: string;
  response?: string;
  responseSuccessStatus: number;
  errors?: string;
}
