import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "\\.(scss|sass|css)$": "identity-obj-proxy"
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
  testMatch: ["**/__tests__/**/*.test.ts?(x)"],
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.json" // 💥 ahora apunta al correcto
    }
  }
};

export default config;
