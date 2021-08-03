import { ErrorsTypes } from '@presentation/protocols'

export type FieldValidatorFunction =
  (value: string) => (ErrorsTypes | undefined)

export interface Field {
  field: string
  validators: FieldValidatorFunction[]
}

export interface FieldError {
  field: string
  error: ErrorsTypes
}
