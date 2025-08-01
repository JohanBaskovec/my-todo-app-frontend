import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import { globalIgnores } from "eslint/config";
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";
import prettier from "eslint-config-prettier";
import pluginPrettier from "eslint-plugin-prettier";

export default tseslint.config([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      ...tseslint.configs.strictTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
      reactX.configs["recommended-typescript"],
      reactHooks.configs["recommended-latest"],
      reactDom.configs.recommended,
      reactRefresh.configs.vite,
    ],
    plugins: { prettier: pluginPrettier },
    rules: {
      // we disable this rule because it prevents interpolating numbers (${number}) inside of strings
      // and using the conditional rendering shortcut {bool && <Component />}
      "@typescript-eslint/restrict-template-expressions": 0,
      "prettier/prettier": "error", // show Prettier formatting issues as ESLint errors
    },
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      ecmaVersion: 2020,
      globals: globals.browser,
    },
  },
  prettier,
]);
