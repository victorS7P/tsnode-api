import { ErrorsTypes } from '@protocols'

export type FieldValidatorCallback =
  (value: string) => (ErrorsTypes | undefined)

export type RequiredFieldValidator =
  () => FieldValidatorCallback

export type EmailFieldValidator =
  () => FieldValidatorCallback

export type EqualToValueFieldValidator =
  (equalsTo: string) => FieldValidatorCallback

export type FieldValidatorFunctionFactory = (
  RequiredFieldValidator |
  EmailFieldValidator |
  EqualToValueFieldValidator
)

export interface Field {
  field: string
  validators: FieldValidatorCallback[]
}

export interface FieldError {
  field: string
  error: ErrorsTypes
}
