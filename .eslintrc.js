const standardRestrictedGlobals = require('eslint-restricted-globals');

const noRestrictedGlobals = ['error', 'isNaN', 'isFinite'].concat(
  standardRestrictedGlobals,
);

module.exports = {
  extends: [
    'airbnb-base',
    'react-app',
    'react-app/jest',
  ],
  env: {
    es6: true,
    browser: true,
    jest: true,
    worker: true,
    serviceworker: true,
  },
  rules: {
    'no-restricted-globals': noRestrictedGlobals,
    'no-restricted-syntax': [
      'error',
      'LabeledStatement',
      'WithStatement',
    ],
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
};
