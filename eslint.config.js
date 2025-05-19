import { defineConfig } from "eslint/config";
import globals from "globals";
import pluginSecurity from "eslint-plugin-security";

export default defineConfig([
  {
    languageOptions: {
      ecmaVersion: "latest",
      globals: {
        ...globals.browser,
        ...globals.es6,
        ...globals.node,
      },
    },
    plugins: {
      security: pluginSecurity,
    },
    rules: {
      indent: ["error", 4],
      semi: ["error", "always"],
      ...pluginSecurity.configs.recommended.rules, // Ajoute les règles du plugin correctement
    },
  },
]);

