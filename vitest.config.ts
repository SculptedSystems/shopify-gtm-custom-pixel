import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths({ projects: ["./tsconfig.json"] })],
  test: {
    include: ["tests/**/*.test.ts"],
    globals: true,
    setupFiles: ["./tests/setup.ts"],
    environment: "jsdom",
  },
});
