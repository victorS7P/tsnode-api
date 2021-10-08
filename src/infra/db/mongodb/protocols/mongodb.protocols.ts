export interface MongoDBClient {
  connect: (string) => Promise<void>
  disconnect: () => Promise<void>
}
