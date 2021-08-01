import FieldsErrors from '@presentation/helpers/fields-errors.helpers'
import EmailValidator from '@presentation/protocols/email-validator.protocols'
import { FieldValidatorFunction } from '@presentation/protocols/fields.protocols'

import SignUpController from './signup.controller'

interface SutTypes {
  sut: SignUpController
  emailValidatorStub: EmailValidator
}

function makeSut (): SutTypes {
  class EmailValidatorStub implements EmailValidator {
    run: FieldValidatorFunction = () => undefined
  }

  const emailValidatorStub = new EmailValidatorStub()
  const sut = new SignUpController(emailValidatorStub)

  return { sut, emailValidatorStub }
}

describe('SignUp Controller', function () {
  test('Should require name', function () {
    const { sut } = makeSut()
    const httpReq = {
      body: {
        email: 'lorem@gmail.com',
        password: 'lorem',
        passwordConfirm: 'lorem'
      }
    }

    const httpResp = sut.run(httpReq)
    expect(httpResp.statusCode).toBe(400)
    expect(httpResp.body).toEqual(expect.arrayContaining([{
      field: 'name', error: FieldsErrors.REQUIRED_ERROR_TYPE
    }]))
  })

  test('should require email', function () {
    const { sut } = makeSut()
    const httpReq = {
      body: {
        name: 'lorem',
        password: 'lorem',
        passwordConfirm: 'lorem'
      }
    }

    const httpResp = sut.run(httpReq)
    expect(httpResp.statusCode).toBe(400)
    expect(httpResp.body).toEqual(expect.arrayContaining([{
      field: 'email', error: FieldsErrors.REQUIRED_ERROR_TYPE
    }]))
  })

  test('should require password', function () {
    const { sut } = makeSut()
    const httpReq = {
      body: {
        email: 'lorem@gmail.com',
        name: 'lorem',
        passwordConfirm: 'lorem'
      }
    }

    const httpResp = sut.run(httpReq)
    expect(httpResp.statusCode).toBe(400)
    expect(httpResp.body).toEqual(expect.arrayContaining([{
      field: 'password', error: FieldsErrors.REQUIRED_ERROR_TYPE
    }]))
  })

  test('should require password confirm', function () {
    const { sut } = makeSut()
    const httpReq = {
      body: {
        email: 'lorem@gmail.com',
        name: 'lorem',
        password: 'lorem'
      }
    }

    const httpResp = sut.run(httpReq)
    expect(httpResp.statusCode).toBe(400)
    expect(httpResp.body).toEqual(expect.arrayContaining([{
      field: 'passwordConfirm', error: FieldsErrors.REQUIRED_ERROR_TYPE
    }]))
  })

  test('should validate email as a correct email', function () {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'run').mockReturnValueOnce(FieldsErrors.INVALID_ERROR_TYPE)

    const httpReq = {
      body: {
        email: 'lorem@gmail.com',
        name: 'lorem',
        password: 'lorem',
        passwordConfirm: 'lorem'
      }
    }

    const httpResp = sut.run(httpReq)
    expect(httpResp.statusCode).toBe(400)
    expect(httpResp.body).toEqual(expect.arrayContaining([{
      field: 'email', error: FieldsErrors.INVALID_ERROR_TYPE
    }]))
  })
})
