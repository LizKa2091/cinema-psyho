import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
   rootDir: '.',
   preset: 'ts-jest',
   testEnvironment: 'jest-fixed-jsdom',
   testPathIgnorePatterns: ['/node_modules/', '/dist/'],
   moduleNameMapper: {
      '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
      '\\.(jpg|jpeg|png|gif|webp)$' : '<rootDir>/mocks/fileMock.js'
   },
   setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
   transform: {
      '^.+\\.tsx?$': 'ts-jest',
   },
   transformIgnorePatterns: [
      '/node_modules/(?!antd)',
   ],
   collectCoverage: true,
};

export default config;