import { IResponse } from '../interfaces/response.interface';

export interface IErrorResponse<T> extends IResponse<T> {
  errorMessage: string;
  errorMessageCode: string;
}
