import { EqualToValueFieldValidator, ErrorsTypes, RequiredFieldValidator } from '@protocols'

export const requiredValue: RequiredFieldValidator = () => (value) =>
  (value === undefined || value === null || value === '') ? ErrorsTypes.REQUIRED_ERROR_TYPE : undefined

export const equalsToValue: EqualToValueFieldValidator = (equalsTo) => value =>
  (Boolean(value) && value !== equalsTo) ? ErrorsTypes.INVALID_ERROR_TYPE : undefined
