import { AddAccount } from '@useCases'
import { Encrypter } from '@data/protocols'

import { DBAddAccount } from './db-add-account.useCase'

interface SutTypes {
  sut: AddAccount
  encrypterStub: Encrypter
}

function makeEncrypterStub (): Encrypter {
  class EncrypterStub implements Encrypter {
    async run (string): Promise<string> {
      return await new Promise(resolve => resolve('hash'))
    }
  }

  return new EncrypterStub()
}

function makeSut (): SutTypes {
  const encrypterStub = makeEncrypterStub()
  const sut = new DBAddAccount(encrypterStub)

  return { encrypterStub, sut }
}

describe('DBAddAccount Usecase', function () {
  const accountData = {
    name: 'valid_name',
    email: 'valid_email',
    password: 'valid_password'
  }

  test('should call encrypter with account passowrd', async function () {
    const { sut, encrypterStub } = makeSut()

    const encrypterSpy = jest.spyOn(encrypterStub, 'run')
    await sut.run(accountData)

    expect(encrypterSpy).toHaveBeenCalledWith(accountData.password)
  })

  test('should throw error if encrypter rehects', async function () {
    const { sut, encrypterStub } = makeSut()

    jest.spyOn(encrypterStub, 'run').mockRejectedValueOnce(new Error('rejected'))
    const promise = sut.run(accountData)

    await expect(promise).rejects.toThrow('rejected')
  })
})
