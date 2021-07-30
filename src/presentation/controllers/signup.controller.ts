import { HttpRequest, HttpResponse } from '@presentation/interfaces/http.interface'
import { FieldError } from '@presentation/interfaces/field-error.interface'

import { badRequest } from '@presentation/helpers/http.helper'
import { isEmptyOrUndefined } from '@presentation/helpers/validators.helper'

import { requiredError } from '@presentation/helpers/error.helper'

export default class SignUpController {
  run (httpReq: HttpRequest): HttpResponse {
    const requiredFields = ['name', 'email', 'password', 'passwordConfirm']
    const errors: FieldError[] = []

    for (const field of requiredFields) {
      if (isEmptyOrUndefined(httpReq.body[field])) {
        errors.push(requiredError(field))
      }
    }

    return badRequest(errors)
  }
}
