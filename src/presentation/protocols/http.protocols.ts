import { ErrorsTypes } from '@presentation/protocols'
import { FieldError } from './fields.protocols'

export interface HttpRequest {
  body?: any
}

export interface HttpResponse {
  body: (FieldError[] | ErrorsTypes.SERVER_ERROR_TYPE)
  statusCode: number
}
