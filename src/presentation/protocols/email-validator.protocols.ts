import { FieldValidatorFunction } from './fields.protocols'

export default interface EmailValidator {
  run: FieldValidatorFunction
}
