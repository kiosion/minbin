'use strict';

module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      legacyDecorators: true
    },
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json']
  },
  plugins: ['ember', 'prettier', '@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:ember/recommended',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  env: {
    browser: true,
    node: true
  },
  rules: {
    'ember/no-shadow-route-definition': ['off'],
    'ember/no-actions-hash': ['off'],
    'ember/no-action': ['off'],
    '@typescript-eslint/no-unused-vars': ['error', { varsIgnorePattern: '^_*' }]
  },
  overrides: [
    {
      files: [
        './.eslintrc.js',
        './ember-cli-build.js',
        './testem.js',
        './blueprints/*/index.js',
        './config/**/*.js',
        './lib/*/index.js',
        './server/**/*.js'
      ],
      parserOptions: {
        sourceType: 'script'
      },
      env: {
        browser: false,
        node: true
      },
      plugins: ['node'],
      extends: ['plugin:node/recommended'],
      rules: {
        'node/no-unpublished-require': 'off'
      }
    },
    {
      files: ['tests/**/*-test.{js,ts}'],
      extends: ['plugin:qunit/recommended']
    },
    {
      files: ['./.eslintrc.js', './tailwind.config.js', './ember-cli-build.js'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-call': 'off',
        '@typescript-eslint/no-unsafe-argument': 'off'
      }
    },
    {
      files: ['**/*.js'],
      rules: {
        '@typescript-eslint/ban-ts-comment': 'off'
      }
    }
  ],
  ignorePatterns: [
    'node_modules/',
    'bower_components/',
    '.templatelint-rc.js',
    'testem.js',
    '.prettierrc.json'
  ]
};
