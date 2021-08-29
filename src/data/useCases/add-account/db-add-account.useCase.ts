import { AccountModel } from '@models'
import { AddAccount, AddAccountModel } from '@useCases'

import { AddAccountRepository, Encrypter } from '@data/protocols'

export class DBAddAccount implements AddAccount {
  private readonly encrypter: Encrypter
  private readonly addAccountRepository: AddAccountRepository

  constructor (encrypter: Encrypter, addAccountRepository: AddAccountRepository) {
    this.encrypter = encrypter
    this.addAccountRepository = addAccountRepository
  }

  async run (accountData: AddAccountModel): Promise<AccountModel> {
    const password = await this.encrypter.run(accountData.password)
    return await this.addAccountRepository.run({ ...accountData, password })
  }
}
