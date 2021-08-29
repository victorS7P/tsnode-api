export default {
  moduleNameMapper: {
    '@data/(.*)': '<rootDir>/src/data/$1',
    '@models/(.*)': '<rootDir>/src/domain/models/$1',
    '@useCases/(.*)': '<rootDir>/src/domain/useCases/$1',
    '@presentation/(.*)': '<rootDir>/src/presentation/$1',
    '@protocols': '<rootDir>/src/presentation/protocols/index.ts',
    '@helpers': '<rootDir>/src/presentation/helpers/index.ts',
    '@models': '<rootDir>/src/domain/models/index.ts',
    '@useCases': '<rootDir>/src/domain/useCases/index.ts',
    '@adapters': '<rootDir>/src/utils/adapters/index.ts',
    '@fakes': '<rootDir>/tests/fakes/index.ts'
  },
  roots: ['<rootDir>/src'],
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  transform: {
    '.+\\.ts$': 'ts-jest'
  }
}
