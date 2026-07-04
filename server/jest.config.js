/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: "node",
  testMatch: ["**/__tests__/**/*.test.js"],
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  testPathIgnorePatterns: [
    "/node_modules/",
    "/dist/",
    "/build/",
  ],
  testTimeout: 15000,
  setupFilesAfterEnv: ['<rootDir>/src/__tests__/setup.js']
};