import { fakeAccount } from '@fakes'

import { AccountModel } from '@models'
import { AddAccount, AddAccountModel } from '@useCases'
import { Encrypter, AddAccountRepository } from '@data/protocols'

import { DBAddAccount } from './db-add-account.useCase'

interface SutTypes {
  sut: AddAccount
  encrypterStub: Encrypter
  addAccountRepositoryStub: AddAccountRepository
}

function makeEncrypterStub (): Encrypter {
  class EncrypterStub implements Encrypter {
    async run (string): Promise<string> {
      return await new Promise(resolve => resolve('hash'))
    }
  }

  return new EncrypterStub()
}

function makeAddAccountRepositoryStub (): AddAccountRepository {
  class AddAccountRepositoryStub implements AddAccountRepository {
    async run (accountData: AddAccountModel): Promise<AccountModel> {
      return await new Promise(resolve => resolve({ ...fakeAccount, password: 'hash' }))
    }
  }

  return new AddAccountRepositoryStub()
}

function makeSut (): SutTypes {
  const encrypterStub = makeEncrypterStub()
  const addAccountRepositoryStub = makeAddAccountRepositoryStub()

  const sut = new DBAddAccount(encrypterStub, addAccountRepositoryStub)

  return { encrypterStub, sut, addAccountRepositoryStub }
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

  test('should throw error if encrypter rejects', async function () {
    const { sut, encrypterStub } = makeSut()

    jest.spyOn(encrypterStub, 'run').mockRejectedValueOnce(new Error('rejected'))
    const promise = sut.run(accountData)

    await expect(promise).rejects.toThrow('rejected')
  })

  test('should call add account repository with account data', async function () {
    const { sut, addAccountRepositoryStub } = makeSut()

    const addAccountRepositorySpy = jest.spyOn(addAccountRepositoryStub, 'run')
    await sut.run(accountData)

    expect(addAccountRepositorySpy).toHaveBeenCalledWith({ ...accountData, password: 'hash' })
  })

  test('should throw error if add account repository rejects', async function () {
    const { sut, addAccountRepositoryStub } = makeSut()

    jest.spyOn(addAccountRepositoryStub, 'run').mockRejectedValueOnce(new Error('rejected'))
    const promise = sut.run(accountData)

    await expect(promise).rejects.toThrow('rejected')
  })

  test('should throw error if add account repository rejects', async function () {
    const { sut } = makeSut()
    const account = await sut.run(accountData)

    expect(account).toEqual({ ...fakeAccount, password: 'hash' })
  })
})
