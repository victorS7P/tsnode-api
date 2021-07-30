import { FieldError } from './field-error.interface'

export interface HttpRequest {
  body?: any
}

export interface HttpResponse {
  body: FieldError[]
  statusCode: number
}
