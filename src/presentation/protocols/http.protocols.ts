import { ErrorsTypes, FieldError } from '@protocols'

export interface HttpRequest {
  body?: any
}

export interface HttpResponse {
  body?: (FieldError[] | ErrorsTypes.SERVER_ERROR_TYPE)
  statusCode: number
}
