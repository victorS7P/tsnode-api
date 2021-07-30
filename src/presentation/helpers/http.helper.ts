import { FieldError } from '../interfaces/field-error.interface'
import { HttpResponse } from '../interfaces/http.interface'

export const badRequest = (errors: FieldError[]): HttpResponse => ({
  statusCode: 400,
  body: errors
})
