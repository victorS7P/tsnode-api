export interface Encrypter {
  run: (string) => Promise<string>
}
