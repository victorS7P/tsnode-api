import { FieldError } from './fields.protocols'

export interface HttpRequest {
  body?: any
}

export interface HttpResponse {
  body: FieldError[]
  statusCode: number
}
