import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import prettierConfig from "eslint-config-prettier";
import simpleImportSortPlugin from "eslint-plugin-simple-import-sort";

const ImportSortConfig = {
  plugins: {
    "simple-import-sort": simpleImportSortPlugin,
  },
  rules: {
    "simple-import-sort/imports": "error", // import 순서 강제
    "simple-import-sort/exports": "error", // export 순서 강제
  },
};

const eslintConfig = defineConfig([
  ...nextVitals,
  ImportSortConfig,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  prettierConfig,
]);

export default eslintConfig;
