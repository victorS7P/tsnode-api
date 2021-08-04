import { FieldError, HttpResponse, ErrorsTypes } from '@protocols'

export const badRequest = (errors: FieldError[]): HttpResponse => ({
  statusCode: 400,
  body: errors
})

export const serverError = (): HttpResponse => ({
  statusCode: 500,
  body: ErrorsTypes.SERVER_ERROR_TYPE
})

export const created = (data: any): HttpResponse => ({
  statusCode: 201,
  body: data
})
