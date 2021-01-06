const path = require('path')
const resolve = _path => path.resolve(__dirname, _path)

module.exports = {
  env: {
    browser: true,
    es6: true
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
  },
  extends:[
    "plugin:@typescript-eslint/recommended",
  ],
  rules: {
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    "@typescript-eslint/no-explicit-any": ["off"]
	}
};
