import FieldsErrors from '@presentation/helpers/fields-errors.helpers'

export type FieldValidatorFunction =
  (value: string) => (FieldsErrors | undefined)

export interface Field {
  field: string
  validators: FieldValidatorFunction[]
}

export interface FieldError {
  field: string
  error: FieldsErrors
}
