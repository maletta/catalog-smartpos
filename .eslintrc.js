module.exports = {
  extends: [
    'airbnb',
    'plugin:cypress/recommended',
  ],
  parser: 'babel-eslint',
  plugins: [
    'react',
    'jsx-a11y',
    'import',
    'cypress',
    'chai-friendly',
  ],
  globals: {
    document: false,
    window: false,
    localStorage: false,
  },
  rules: {
    'react/prefer-stateless-function': 'off',
    'linebreak-style': 'off',
    'react/jsx-filename-extension': 'off',
    'react/destructuring-assignment': 'off',
    'react/require-default-props': 'off',
    'jsx-a11y/label-has-for': 'off',
    'jsx-a11y/label-has-associated-control': [ 2, {
      'labelComponents': ['label', 'Label', 'StyledLabel'],
      'labelAttributes': ['htmlFor'],
      'controlComponents': ['input']
    }],
    'react/forbid-prop-types': 'off',
    "no-unused-expressions": 0,
    "chai-friendly/no-unused-expressions": 2,
  },
  env: {
    jest: true,
    "cypress/globals": true,
  },
  settings: {
    'import/resolver': {
      node: {
        paths: ['src']
      }
    }
  }
};
