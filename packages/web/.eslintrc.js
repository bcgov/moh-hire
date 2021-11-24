module.exports = {
  plugins: ['jsx-a11y', 'prettier'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    '../../.eslintrc.js',
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
};
