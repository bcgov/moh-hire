module.exports = {
  plugins: ['jsx-a11y', 'react', 'react-hooks'],
  extends: ['../../.eslintrc.js'],
  rules: {
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  ignorePatterns: ['.eslintrc.js', 'build'],
};
