import validator from 'validator'

import { EmailValidator, ErrorsTypes, FieldErrorType } from '@presentation/protocols'

export class EmailValidatorAdapter implements EmailValidator {
  run (email: string): FieldErrorType {
    return (validator.isEmail(email) ? undefined : ErrorsTypes.INVALID_ERROR_TYPE)
  }
}
