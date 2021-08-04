import { Controller, EmailValidator, HttpRequest, HttpResponse, Field, FieldError } from '@presentation/protocols'
import { badRequest, serverError, requiredValue, equalsToValue } from '@presentation/helpers'

export default class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator

  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  run (httpReq: HttpRequest): HttpResponse {
    const errors: FieldError[] = []

    const fields: Field[] = [
      {
        field: 'name',
        validators: [requiredValue()]
      },
      {
        field: 'email',
        validators: [requiredValue(), this.emailValidator.run]
      },
      {
        field: 'password',
        validators: [requiredValue(), equalsToValue(httpReq.body.passwordConfirm)]
      },
      {
        field: 'passwordConfirm',
        validators: [requiredValue(), equalsToValue(httpReq.body.password)]
      }
    ]

    try {
      for (const { field, validators } of fields) {
        for (const validator of validators) {
          const error = validator(httpReq.body[field])

          if (error !== undefined) {
            errors.push({ field, error })
          }
        }
      }

      return badRequest(errors)
    } catch (_error) {
      return serverError()
    }
  }
}
