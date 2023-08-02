module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  rootDir: '../',
  coverageReporters: ['text-summary', 'html'],
  coverageDirectory: '<rootDir>/coverage',
  collectCoverageFrom: ['./src/**/*.{ts,tsx}', '!**/node_modules/**', '!**/vendor/**'],
  coverageThreshold: {
    global: {
      branches: 25,
      functions: 25,
      lines: 25,
      statements: 25,
    },
  },
};
