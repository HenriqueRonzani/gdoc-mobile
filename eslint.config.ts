import { defineConfig } from 'eslint/config'
import tseslint from 'typescript-eslint'
import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import importPlugin from 'eslint-plugin-import'

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      },
      globals: {
        ...globals.es2021,
        ...globals.browser
      }
    },
    plugins: {
      js,
      'react': react as never,
      'react-hooks': reactHooks as never,
      'import': importPlugin
    },
    extends: [
      js.configs.recommended,
      ...tseslint.configs.strict
    ],
    settings: {
      react: {
        version: 'detect'
      }
    },
    ignores: [
      'node_modules',
      'dist/**',
      'android/**',
      'ios/**'
    ],
    rules: {
      /**
       *  ESTILO DE INDENTAÇÃO E CHAVES
       */
      'indent': ['error', 2],
      'brace-style': ['error', '1tbs'],
      'space-before-blocks': ['error', 'always'],
      'padded-blocks': ['error', 'never'],
      'block-spacing': ['error', 'always'],

      /**
       * ESPAÇAMENTO E WHITESPACE
       */
      'arrow-spacing': ['error', { before: true, after: true }],
      'keyword-spacing': ['error', { before: true, after: true }],
      'space-infix-ops': 'error',
      'space-in-parens': ['error', 'never'],
      'no-trailing-spaces': ['error', { skipBlankLines: false }],
      'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],
      'no-tabs': 'error',

      /**
       * STRINGS, ASPAS E PONTUAÇÃO
       */
      'quotes': ['error', 'single'],
      'quote-props': ['error', 'consistent-as-needed'],
      'comma-dangle': ['error', 'never'],
      'semi': ['error', 'never'],
      'eol-last': ['error', 'always'],
      'linebreak-style': ['error', 'unix'],

      /**
       * ARROW FUNCTIONS
       */
      'arrow-parens': ['error', 'as-needed', { requireForBlockBody: true }],

      /**
       * OUTRAS BOAS PRÁTICAS
       */
      'prefer-const': 'error',
      'no-const-assign': 'error',
      'eqeqeq': 'error',
      'no-implicit-coercion': 'error',
      'prefer-template': 'error',
      'no-useless-return': 'error',
      'no-unexpected-multiline': 'error',

      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          varsIgnorePattern: '^_',
          argsIgnorePattern: '^_'
        }
      ],

      ...reactHooks.configs.flat.recommended.rules,
      ...react.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
      'react/prop-types': 'off'
    }
  }
])
