import { Controller, EmailValidator, HttpRequest, HttpResponse, Field, FieldError } from '@protocols'
import { badRequest, serverError, requiredValue, equalsToValue } from '@helpers'
import { AddAccount } from '@useCases'

export default class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator
  private readonly addAccount: AddAccount

  constructor (emailValidator: EmailValidator, addAccount: AddAccount) {
    this.emailValidator = emailValidator
    this.addAccount = addAccount
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

      if (errors.length > 0) {
        return badRequest(errors)
      } else {
        this.addAccount.run({
          name: httpReq.body.name,
          email: httpReq.body.email,
          password: httpReq.body.password
        })

        return {
          statusCode: 201
        }
      }
    } catch (_error) {
      return serverError()
    }
  }
}
