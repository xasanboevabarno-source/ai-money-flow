import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const eslintRequire = createRequire(require.resolve('eslint/package.json'));
const { FlatCompat } = eslintRequire('@eslint/eslintrc');
const compat = new FlatCompat({baseDirectory: import.meta.dirname});
const config = [...compat.extends('next/core-web-vitals','next/typescript'), {ignores:['.next/**','node_modules/**','next-env.d.ts']}];
export default config;

