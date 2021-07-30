import { requiredError } from '@presentation/helpers/error.helper'

import SignUpController from './signup.controller'

describe('SignUp Controller', function () {
  test('Should require name', function () {
    const sut = new SignUpController()
    const httpReq = {
      body: {
        email: 'lorem@gmail.com',
        password: 'lorem',
        passwordConfirm: 'lorem'
      }
    }

    const httpResp = sut.run(httpReq)
    expect(httpResp.statusCode).toBe(400)
    expect(httpResp.body).toEqual(expect.arrayContaining([requiredError('name')]))
  })

  test('should require email', function () {
    const sut = new SignUpController()
    const httpReq = {
      body: {
        name: 'lorem',
        password: 'lorem',
        passwordConfirm: 'lorem'
      }
    }

    const httpResp = sut.run(httpReq)
    expect(httpResp.statusCode).toBe(400)
    expect(httpResp.body).toEqual(expect.arrayContaining([requiredError('email')]))
  })

  test('should require password', function () {
    const sut = new SignUpController()
    const httpReq = {
      body: {
        email: 'lorem@gmail.com',
        name: 'lorem',
        passwordConfirm: 'lorem'
      }
    }

    const httpResp = sut.run(httpReq)
    expect(httpResp.statusCode).toBe(400)
    expect(httpResp.body).toEqual(expect.arrayContaining([requiredError('password')]))
  })

  test('should require password confirm', function () {
    const sut = new SignUpController()
    const httpReq = {
      body: {
        email: 'lorem@gmail.com',
        name: 'lorem',
        password: 'lorem'
      }
    }

    const httpResp = sut.run(httpReq)
    expect(httpResp.statusCode).toBe(400)
    expect(httpResp.body).toEqual(expect.arrayContaining([requiredError('passwordConfirm')]))
  })
})
