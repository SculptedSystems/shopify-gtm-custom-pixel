// @ts-check

import eslint from "@eslint/js";
import { defineConfig, globalIgnores } from "eslint/config";
import prettierConfig from "eslint-config-prettier";
import tseslint from "typescript-eslint";

export default defineConfig(
  prettierConfig,
  eslint.configs.recommended,
  //tseslint.configs.strict, // TODO: enalbe
  tseslint.configs.stylistic,
  [globalIgnores(["./dist/*", "./coverage/*"])],
);
