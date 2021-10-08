import { MongoClient } from 'mongodb'

import { MongoDBClient } from '@mongodb/protocols'

export const MongoDBClientHelper = function (): MongoDBClient {
  let client: MongoClient

  return {
    async connect (url: string): Promise<void> {
      client = await MongoClient.connect(url)
    },

    async disconnect (): Promise<void> {
      await client.close()
    }
  }
}
