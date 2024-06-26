import react from 'eslint-plugin-react/configs/recommended.js';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import tsParser from '@typescript-eslint/parser';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import reactHooks from 'eslint-plugin-react-hooks';
import next from '@next/eslint-plugin-next'
import { fixupPluginRules } from "@eslint/compat";

export default tseslint.config({
  files: ['**/*.{ts,tsx}'],
  ignores: ['./.next/**', './node_modules/**',],
  extends: [
    eslint.configs.recommended,
    ...tseslint.configs.strictTypeChecked,
    ...tseslint.configs.stylisticTypeChecked,
    eslintPluginUnicorn.configs['flat/recommended'],
    react,
  ],
  plugins: {
    "react-hooks": reactHooks,
    "@next/next": fixupPluginRules(next)
  },
  rules: {
    ...reactHooks.configs.recommended.rules,
    ...next.configs.recommended.rules,
    'unicorn/filename-case': "off",
    'unicorn/no-array-reduce': 'off',
    'unicorn/no-null': 'off',
    'unicorn/prevent-abbreviations': 'off',
    // 'unicorn/no-useless-undefined': 'off',
    // "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/consistent-type-definitions": "off",
    "@typescript-eslint/no-unnecessary-condition": "off",
    // "@typescript-eslint/no-misused-promises": "off",
    // "max-len": 0,
    "react/react-in-jsx-scope": "off",
  },
  languageOptions: {
    parser: tsParser,
    parserOptions: {
      sourceType: 'module',
      project: './tsconfig.json',
    }
  }
},
{
  // disable type-aware linting on JS files
  files: ['**/*.js'],
  ...tseslint.configs.disableTypeChecked,
});