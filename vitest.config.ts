import { defineConfig } from "vitest/config"

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['src/**/*.test.{ts,tsx}', 'test/**/*.test.{ts,tsx}', 'cypress/**/*.test.{ts,tsx}'],
    exclude: ['**/node_modules/**/*'],
    setupFiles: ['test/internal/setupTests.ts'],
  },
})
