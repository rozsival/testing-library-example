/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  moduleFileExtensions: ['js', 'ts', 'tsx'],
  moduleNameMapper: {
    '\\.css$': 'identity-obj-proxy',
  },
  preset: 'ts-jest',
  setupFilesAfterEnv: ['./src/setupTests.ts'],
  testEnvironment: 'node',
  verbose: true,
};
