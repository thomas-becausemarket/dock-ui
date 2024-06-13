module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended', // Ensure Prettier is integrated
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: [
    'react-refresh',
    'prettier',
    'import', // Add the import plugin
    'simple-import-sort' // Add the simple-import-sort plugin
  ],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'prettier/prettier': 'error',
    'simple-import-sort/imports': 'error', // Add import sorting rule
    'simple-import-sort/exports': 'error', // Add export sorting rule
    'import/first': 'error', // Ensure all imports appear before other statements
    'import/newline-after-import': 'error', // Ensure there's a newline after import statements
    'import/no-duplicates': 'error' // Disallow duplicate imports
  },
}
