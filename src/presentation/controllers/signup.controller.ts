import { Controller, EmailValidator, HttpRequest, HttpResponse, Field, FieldError } from '@protocols'
import { badRequest, serverError, requiredValue, equalsToValue, created } from '@helpers'
import { AddAccount } from '@useCases'

export default class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator
  private readonly addAccount: AddAccount

  constructor (emailValidator: EmailValidator, addAccount: AddAccount) {
    this.emailValidator = emailValidator
    this.addAccount = addAccount
  }

  async run (httpReq: HttpRequest): Promise<HttpResponse> {
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
        const account = await this.addAccount.run({
          name: httpReq.body.name,
          email: httpReq.body.email,
          password: httpReq.body.password
        })

        return created(account)
      }
    } catch (_error) {
      return serverError()
    }
  }
}
