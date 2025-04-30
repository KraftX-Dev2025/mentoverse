import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    // Add this new rules configuration
    rules: {
      // Disable the type checking for 'any'
      "@typescript-eslint/no-explicit-any": "off",

      // Optionally disable unused vars warning
      "@typescript-eslint/no-unused-vars": "warn", // Changed to warning instead of error

      // Disable the unescaped entities rule
      "react/no-unescaped-entities": "off",
    },
  },
];

export default eslintConfig;
