import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["iife"],
  outExtension: () => ({ js: ".js" }),
  outDir: "dist",
  target: "es2020",
  minify: true,
  sourcemap: false,
  clean: true,
  treeshake: true,
  platform: "browser",
  banner: {
    js: `// Shopify Custom GTM Pixel for Customer Events
// Compiled on ${new Date().toISOString()}`,
  },
});
