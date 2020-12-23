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
    'lines-between-class-members': 'off',
    'import/prefer-default-export': 'off',
    // 'plugin/react-recommended'
  },
};
