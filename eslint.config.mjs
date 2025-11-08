// @ts-check

import eslint from "@eslint/js";
import { defineConfig, globalIgnores } from "eslint/config";
import prettierConfig from "eslint-config-prettier";
import tseslint from "typescript-eslint";

export default defineConfig(
  [globalIgnores(["./dist/*", "./coverage/*"])],
  eslint.configs.recommended,
  tseslint.configs.stylistic,
  tseslint.configs.strict,
  prettierConfig,
  {
    rules: {
      "@typescript-eslint/explicit-function-return-type": ["error"],
    },
  },
);
