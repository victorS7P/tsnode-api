import { FieldValidatorFunction } from '@presentation/protocols/fields.protocols'
import FieldsErrors from './fields-errors.helpers'

export const requiredValue: FieldValidatorFunction = value =>
  (value === undefined || value === null || value === '') ? FieldsErrors.REQUIRED_ERROR_TYPE : undefined
