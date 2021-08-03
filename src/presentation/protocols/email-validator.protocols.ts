import { FieldValidatorFunction } from './fields.protocols'

export interface EmailValidator {
  run: FieldValidatorFunction
}
