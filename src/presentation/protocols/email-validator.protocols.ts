import { FieldValidatorCallback } from './fields.protocols'

export interface EmailValidator {
  run: FieldValidatorCallback
}
