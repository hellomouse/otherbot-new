module.exports = {
  extends: [
    "eslint:recommended",
    "@hellomouse",
  ],
  parserOptions: {
    ecmaVersion: 8,
    sourceType: "module"
  },
  env: {
    es6: true,
    node: true
  },
  rules: {
    'comma-dangle': 'off',
    'arrow-parens': ['error', 'as-needed'],
    'indent': ['error', 2],
    'no-console': 'off',
    'object-curly-spacing': ['error', 'always'],
    'space-infix-ops': ['error', { int32Hint: true }],
    'max-len': ['error', 120]
  }
};
