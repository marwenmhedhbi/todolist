module.exports = {
    env: {
        es6: true,
        node: true,
    },
    parser: "@typescript-eslint/parser", // Specifies the ESLint parser
    extends: [
      "plugin:react/recommended", // Uses the recommended rules from @eslint-plugin-react
      "plugin:@typescript-eslint/recommended", // Uses the recommended rules from the @typescript-eslint/eslint-plugin
      "prettier/@typescript-eslint", // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
      "plugin:prettier/recommended" // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
    ],
    settings: {
        'import/parsers': {
          '@typescript-eslint/parser': ['.ts'],
        },
        'import/resolver': {
          typescript: {},
        },
      },
    plugins: ['@typescript-eslint', 'eslint-plugin-prettier'],
    rules: {
        'prettier/prettier': 'warn',
        'no-console': 'off',
        'no-unused-vars': [
            'error',
            {
                argsIgnorePattern: '^_',
                varsIgnorePattern: '^_',
            },
        ],
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        'prefer-const': 'error',
    },
    parserOptions: {
      ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
      sourceType: "module" // Allows for the use of imports
    },
  };