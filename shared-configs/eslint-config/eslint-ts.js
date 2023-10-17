module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier'
  ],
  rules: {
    'no-unused-vars': 'off',
    '@typescript-eslint/no-explicit-any': 'off'
  },
  ignorePatterns: [
    'node_modules',
    'dist',
    'dist-ssr',
    'public',
    '*.local',
    '*.css',
    '.DS_Store'
  ]
}
