import { EmailValidator, ErrorsTypes, FieldValidatorCallback } from '@presentation/protocols'

import SignUpController from './signup.controller'

interface SutTypes {
  sut: SignUpController
  emailValidatorStub: EmailValidator
}

function makeEmailValidatorStub (): EmailValidator {
  class EmailValidatorStub implements EmailValidator {
    run: FieldValidatorCallback = () => undefined
  }

  return new EmailValidatorStub()
}

function makeSut (): SutTypes {
  const emailValidatorStub = makeEmailValidatorStub()
  const sut = new SignUpController(emailValidatorStub)

  return { sut, emailValidatorStub }
}

describe('SignUp Controller', function () {
  test('should return 400 if name does not exist', function () {
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
      field: 'name', error: ErrorsTypes.REQUIRED_ERROR_TYPE
    }]))
  })

  test('should return 400 if email does not exist', function () {
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
      field: 'email', error: ErrorsTypes.REQUIRED_ERROR_TYPE
    }]))
  })

  test('should return 400 if password does not exist', function () {
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
      field: 'password', error: ErrorsTypes.REQUIRED_ERROR_TYPE
    }]))
  })

  test('should return 400 if password confirm does not exist', function () {
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
      field: 'passwordConfirm', error: ErrorsTypes.REQUIRED_ERROR_TYPE
    }]))
  })

  test('should validate the correct email field', function () {
    const { sut, emailValidatorStub } = makeSut()
    const emailValidatorSpy = jest.spyOn(emailValidatorStub, 'run')

    const httpReq = {
      body: {
        email: 'lorem@gmail.com',
        name: 'lorem',
        password: 'lorem',
        passwordConfirm: 'lorem'
      }
    }

    sut.run(httpReq)
    expect(emailValidatorSpy).toBeCalledWith(httpReq.body.email)
  })

  test('should return 400 if email is invalid', function () {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'run').mockImplementationOnce(() => ErrorsTypes.INVALID_ERROR_TYPE)

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
      field: 'email', error: ErrorsTypes.INVALID_ERROR_TYPE
    }]))
  })

  test('should return 500 if EmailValidator throws', function () {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'run').mockImplementationOnce(() => {
      throw Error('')
    })

    const httpReq = {
      body: {
        email: 'lorem@gmail.com',
        name: 'lorem',
        password: 'lorem',
        passwordConfirm: 'lorem'
      }
    }

    const httpResp = sut.run(httpReq)
    expect(httpResp.statusCode).toBe(500)
    expect(httpResp.body).toEqual(ErrorsTypes.SERVER_ERROR_TYPE)
  })

  test('should return 400 if password and password confirm do not match', function () {
    const { sut } = makeSut()

    const httpReq = {
      body: {
        email: 'lorem@gmail.com',
        name: 'lorem',
        password: 'lorem',
        passwordConfirm: 'invalid'
      }
    }

    const httpResp = sut.run(httpReq)
    expect(httpResp.statusCode).toBe(400)
    expect(httpResp.body).toEqual(expect.arrayContaining([
      { field: 'password', error: ErrorsTypes.INVALID_ERROR_TYPE },
      { field: 'passwordConfirm', error: ErrorsTypes.INVALID_ERROR_TYPE }
    ]))
  })
})
