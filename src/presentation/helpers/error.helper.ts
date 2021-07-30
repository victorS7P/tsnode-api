import { FieldError } from '../interfaces/field-error.interface'

const REQUIRED_ERROR_TYPE = 'required_field'

export const requiredError = (field: string): FieldError => ({
  field,
  type: REQUIRED_ERROR_TYPE
})
