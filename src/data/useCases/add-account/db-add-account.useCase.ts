import { AccountModel } from '@models'
import { AddAccount, AddAccountModel } from '@useCases'

import { Encrypter } from '@data/protocols'

export class DBAddAccount implements AddAccount {
  private readonly encrypter: Encrypter

  constructor (encrypter: Encrypter) {
    this.encrypter = encrypter
  }

  async run (values: AddAccountModel): Promise<AccountModel> {
    await this.encrypter.run(values.password)
    return await new Promise(resolve => resolve(null as unknown as AccountModel))
  }
}
