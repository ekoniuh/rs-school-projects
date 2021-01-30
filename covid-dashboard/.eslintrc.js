module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  extends: ['airbnb-base', 'prettier'],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    // 'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'no-undef': 'off',
    'no-param-reassign': 'off',
    'no-restricted-syntax': 'off',
    'no-unused-vars': 'off',
    'new-cap': 'off',
    'no-console': 'off',
    'class-methods-use-this': 'off',
    'lines-between-class-members': 'off',
    'import/prefer-default-export': 'off',
    // 'plugin/react-recommended'
  },
};
