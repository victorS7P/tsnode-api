import { AccountModel } from '@models'
import { AddAccountModel } from '@useCases'

export interface AddAccountRepository {
  run: (accountData: AddAccountModel) => Promise<AccountModel>
}
