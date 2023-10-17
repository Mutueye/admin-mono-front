module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    // will use this parser to parse <script> tag content in *.vue file
    parser: '@typescript-eslint/parser',
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/vue3-recommended',
    // 'plugin:vue/vue3-essential',
    'prettier'
  ],
  rules: {
    'vue/multi-word-component-names': 'off',
    'vue/no-dupe-keys': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-unused-vars': 'off'
  },
  // https://stackoverflow.com/questions/63509978/global-module-definition-for-typescript
  overrides: [
    {
      files: ['*.ts', '*.vue'],
      rules: {
        'no-undef': 'off'
      }
    }
  ],
  ignorePatterns: [
    'node_modules',
    '.DS_Store',
    'dist',
    'dist-ssr',
    '*.local',
    '*.css',
    'public/*',
    'docs',
    'auto-imports.d.ts',
    'components.d.ts'
  ]
}
