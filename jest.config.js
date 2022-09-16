module.exports = {
  preset: 'ts-jest',
  verbose: true,
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  globals: {
    'ts-jest': {
      useESM: true,
    },
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  modulePathIgnorePatterns: [
    "<rootDir>/tests/kms",
  ],
  testTimeout: 50000,
  detectOpenHandles: true
};
