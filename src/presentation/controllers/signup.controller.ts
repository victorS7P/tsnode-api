import Controller from '@presentation/protocols/controller.protocols'
import EmailValidator from '@presentation/protocols/email-validator.protocols'

import { HttpRequest, HttpResponse } from '@presentation/protocols/http.protocols'
import { Field, FieldError } from '@presentation/protocols/fields.protocols'

import { badRequest } from '@presentation/helpers/http.helpers'
import { requiredValue } from '@presentation/helpers/fields-validators.helpers'

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
        validators: [requiredValue]
      },
      {
        field: 'email',
        validators: [requiredValue, this.emailValidator.run]
      },
      {
        field: 'password',
        validators: [requiredValue]
      },
      {
        field: 'passwordConfirm',
        validators: [requiredValue]
      }
    ]

    for (const { field, validators } of fields) {
      for (const validator of validators) {
        const error = validator(httpReq.body[field])

        if (error !== undefined) {
          errors.push({ field, error })
        }
      }
    }

    return badRequest(errors)
  }
}
