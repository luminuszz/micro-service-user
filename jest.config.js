// eslint-disable-next-line @typescript-eslint/no-var-requires
const { pathsToModuleNameMapper } = require('ts-jest/utils');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { compilerOptions } = require('./tsconfig.json');

module.exports = {
  setupFiles: ['dotenv/config'],

  clearMocks: true,
  verbose: true,
  collectCoverage: true,
  preset: 'ts-jest',
  collectCoverageFrom: ['<rootDir>/src/core/services/*.ts'],
  coverageDirectory: 'coverage',
  coverageReporters: ['text-summary', 'lcov'],
  testEnvironment: 'node',
  testMatch: ['**/*.spec.ts'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>',
  }),
};
