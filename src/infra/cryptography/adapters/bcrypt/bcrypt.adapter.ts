import bcrypt from 'bcrypt'

import { Encrypter } from '@data/protocols'

export class BCryptAdapter implements Encrypter {
  private readonly salt: number

  constructor (salt: number) {
    this.salt = salt
  }

  async run (value: string): Promise<string> {
    return await bcrypt.hash(value, this.salt)
  }
}
