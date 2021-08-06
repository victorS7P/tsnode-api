import validator from 'validator'

import { EmailValidator, ErrorsTypes } from '@presentation/protocols'
import { EmailValidatorAdapter } from '@adapters'

const isEmailSpy = jest.spyOn(validator, 'isEmail').mockReturnValue(true)

const makeSut = (): EmailValidator => {
  return new EmailValidatorAdapter()
}

describe('EmailValidatorAdapter', () => {
  test('should call validator with correct e-mail', () => {
    makeSut().run('any_email')
    expect(isEmailSpy).toHaveBeenCalledWith('any_email')
  })

  test('should return INVALID_ERROR_TYPE if validator return false', () => {
    isEmailSpy.mockReturnValueOnce(false)
    const error = makeSut().run('any_email')
    expect(error).toEqual(ErrorsTypes.INVALID_ERROR_TYPE)
  })

  test('should return undefined if validator return true', () => {
    const error = makeSut().run('any_email')
    expect(error).toBe(undefined)
  })
})
