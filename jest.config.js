// @ts-nocheck
const nextJest = require('next/jest');

const createJestConfig = nextJest({ dir: './' });
const customJestConfig = {
  testEnvironment: 'jest-environment-jsdom',
  // moduleNameMapper: {
  //   '^@/db(.*)$': ['./src/db/$1'],
  //   '^@/lib(.*)$': ['./src/lib/$1'],
  //   '^@/components(.*)$': ['./src/components/$1'],
  //   '^@/theme(.*)$': ['./src/theme/$1'],
  //   '^@/api-utils(.*)$': ['./src/api-utils/$1'],
  // },
};
module.exports = createJestConfig(customJestConfig);
