const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig');

module.exports = {
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/'
  }),
  preset: "ts-jest",
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts$': 'ts-jest'
  }
};
