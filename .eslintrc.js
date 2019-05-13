module.exports = {
  extends: ['airbnb'],
  parser: 'babel-eslint',
  plugins: ['react', 'jsx-a11y', 'import'],
  globals: {
    document: false,
    window: false,
    localStorage: false,
    Image: true,
  },
  rules: {
    'react/prefer-stateless-function': 'off',
    'linebreak-style': 'off',
    'react/jsx-filename-extension': 'off',
    "react/destructuring-assignment": 'off',
    "react/forbid-prop-types": "off",
  },
  env: {
    jest: true,
  },
  settings: {
    "import/resolver": {
      node: {
        paths: ["src"]
      }
    }
  }
};