module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  coverageReporters: ['text-summary', 'html'],
  coverageDirectory: '<rootDir>/coverage',
  collectCoverageFrom: ['./src/**/*.{ts,tsx}', '!**/node_modules/**', '!**/vendor/**'],
  coverageThreshold: {
    global: {
      functions: 25,
      lines: 25,
      statements: 25,
    },
  },
  testPathIgnorePatterns: ['/node_modules/', '/__mocks__/'],
  transformIgnorePatterns: ['node_modules/(?!swiper|ssr-window|dom7)/'],
};
