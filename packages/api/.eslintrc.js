module.exports = {
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    '../../.eslintrc.js',
  ],
  ignorePatterns: ['.eslintrc.js', '**/*spec.ts'],
};
