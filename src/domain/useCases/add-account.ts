import { AccountModel } from '@models'

export interface AddAccountModel
  extends Omit<AccountModel, 'id'> {}

export interface AddAccount {
  run: (values: AddAccountModel) => AccountModel
}
