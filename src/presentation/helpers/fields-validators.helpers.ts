import { ErrorsTypes, FieldValidatorFunction } from '@presentation/protocols'

export const requiredValue: FieldValidatorFunction = value =>
  (value === undefined || value === null || value === '') ? ErrorsTypes.REQUIRED_ERROR_TYPE : undefined
