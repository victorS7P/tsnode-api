import { FieldError } from '@presentation/protocols/fields.protocols'
import { HttpResponse } from '@presentation/protocols/http.protocols'

export const badRequest = (errors: FieldError[]): HttpResponse => ({
  statusCode: 400,
  body: errors
})
