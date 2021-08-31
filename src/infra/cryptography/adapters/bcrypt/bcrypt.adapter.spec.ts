import bcrypt from 'bcrypt'

import { Encrypter } from '@data/protocols'
import { BCryptAdapter } from './bcrypt.adapter'

const makeSut = (salt: number): Encrypter => {
  return new BCryptAdapter(salt)
}

describe('BCryptAdapter', () => {
  const hashedValue = 'hash'
  const salt = 12

  const hashSpy = jest.spyOn(bcrypt, 'hash')

  test('should call hash with corret values', async () => {
    const sut = makeSut(salt)
    await sut.run('password')

    expect(hashSpy).toHaveBeenCalledWith('password', salt)
  })

  test('should return hashed value', async () => {
    const sut = makeSut(salt)

    hashSpy.mockResolvedValue(hashedValue as never)
    const result = await sut.run('password')

    expect(result).toEqual(hashedValue)
  })

  test('should throws if bcrypt rejects', async () => {
    const sut = makeSut(salt)

    hashSpy.mockRejectedValueOnce(new Error('error') as never)
    const promise = sut.run('password')

    await expect(promise).rejects.toThrowError('error')
  })
})
