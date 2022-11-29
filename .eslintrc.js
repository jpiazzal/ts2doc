module.exports = {
    parser: '@typescript-eslint/parser',
    ignorePatterns: ['node_modules', 'dist', '*.d.ts', 'coverage', 'jest.config.js'],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:github/recommended',
        'plugin:sonarjs/recommended',
        'plugin:unicorn/recommended',
        'prettier'
    ],
    plugins: ['@typescript-eslint', 'github', 'prettier', 'sonarjs'],
    rules: {
        // OFF
        'eslint-comments/no-unused-disable': 'off',
        'filenames/match-regex': 'off',
        'import/named': 'off', // doesn't work well
        'import/no-named-as-default': 'off', // doesn't work well
        'import/no-unresolved': 'off',
        'unicorn/no-null': 'off',
        // ERRORS
        '@typescript-eslint/no-unused-vars': 'error',
        'import/order': [
            'error',
            {
                groups: [
                    'builtin', // Node "builtin" modules, eg: import path from "path";
                    'external', // External modules, eg: import moment from "moment";
                    'internal', // Internal modules (absolute imports), eg: import {apiService} from "app/services/core";
                    ['sibling', 'parent', 'index'], // Relative imports, eg: import foo from "../foo"; / import bar from "./bar"; / import main from "./";
                    'object', // "object"-imports (TypeScript only), eg: import log = console.log;
                    'type' // "type" imports (TypeScript only), eg: import type { Foo } from "foo";
                ],
                'newlines-between': 'always',
                alphabetize: {
                    order: 'asc',
                    caseInsensitive: true
                }
            }
        ],
        'no-console': 'error',
        'prettier/prettier': 'error',
        'unicorn/filename-case': [
            'error',
            {
                cases: {
                    camelCase: true,
                    pascalCase: true
                }
            }
        ],
        'unicorn/prevent-abbreviations': [
            'error',
            {
                replacements: {
                    props: false,
                    i: false,
                    str: false,
                    args: false,
                    doc: false
                }
            }
        ]
    }
};
