import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"], // your entry file
  format: ["iife"], // immediately-invoked function expression (self-contained)
  outExtension: () => ({ js: ".js" }),
  outDir: "dist",
  target: "es2020",
  minify: false, // keep readable
  sourcemap: false,
  clean: true, // clear dist/
  treeshake: true,
  platform: "browser",
  banner: {
    js: `// Shopify Custom GTM Pixel for Customer Events
// Compiled on ${new Date().toISOString()}`,
  },
});
