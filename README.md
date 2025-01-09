<div align="center" style="margin-top: 12px">
  <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://assets.vercel.com/image/upload/v1662130559/nextjs/Icon_dark_background.png">
      <img alt="mx-design logo" src="./assets/logo.png" height="108">
    </picture>
  <h2>config-eslint9</h2>
</div>

English | [中文](./README.zh.md)

This CLI tool helps you quickly create an ESLint 9.x configuration file.

## Usage

### Install package

```bash
npm i @mx-design/config-eslint9 -D
```

```bash
yarn add @mx-design/config-eslint9 -D
```

```bash
pnpm add @mx-design/config-eslint9 -D
```

### Add command to scripts in package.json

```bash
npm pkg set scripts.eslintConfig="config-eslint9"
```

the above action will add command in your package.json like this:

```javascript
 "scripts": {
    ...other command...,
    "eslintConfig": "config-eslint9"
  },
```

### Run command

```
npm run eslintConfig
```

```
yarn run eslintConfig
```

```
pnpm run eslintConfig
```

## Documentation

In this section, I'll explain why I configure ESLint the way I do. Welcome to provide feedback or suggestions through issues.

### Javascript Configuration

> I will set eslint:9.17.0, @eslint/js@9.17.0 globals@15.14.0 in devDependencies of package.json

Most articles and projects that introduce ESLint 9.x will show JavaScript configuration like the following:

```javascript
import jsLint from '@eslint/js';
export default [jsLint.configs.recommended];
```
This approach is not ideal because it does not limit the linting scope.

Why is limiting the scope important? Even when using TypeScript, you may need to lint some JavaScript files, such as eslint.config.mjs or .prettierrc.js.

I improved this by using the following configuration:

```javascript
import jsLint from '@eslint/js';
const jsLintConfig = {
  files: ['**/*.{js,mjs,cjs}'],
  rules: {
    ...jsLint.configs.recommended.rules,
  },
};
```

actually, the source code of jsLint.configs.recommended is just some rules like this:

```javascript
module.exports = Object.freeze({
  rules: Object.freeze({
    'constructor-super': 'error',
    'for-direction': 'error',
    // ... other rules
  }),
});
```

### Typescript Configuration

> I will set etypescript-eslint@8.18.1 in devDependencies of package.json

In most articles and projects introducing ESLint 9.x, you will see TypeScript configuration like this:

```javascript
import tsLint from 'typescript-eslint';
export default [jsLint.configs.recommended, ...tsLint.configs.recommended];
```

The drawback is the same as with the `JavaScript Config` section: it does not limit the linting scope.

Alternatively, you might see

```javascript
export default [
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,jsx,tsx}'],
    languageOptions: {
      parser: '@typescript-eslint/parser',
      parserOptions: {
        sourceType: 'module',
      },
    },
  },
];
```

This is acceptable but does not include the recommended TypeScript rules.

I improved it to the following configuration:

```javascript
import tsLint from 'typescript-eslint';
// recommended rules and parser in it
const tsLintConfig = [...tsLint.configs.recommended].map((conf) => ({
  ...conf,
  files: ['**/*.{ts,tsx}'],
}));

const tsLintCustomConfig = {
  files: ['**/*.{ts,tsx}'],
  rules: {
    // overwrite ts rules
    '@typescript-eslint/no-explicit-any': 0,
  },
};
```

The source code of `tsLint.configs.recommended` is like this:

```javascript
import plugin from '@typescript-eslint/eslint-plugin';
import parser from '@typescript-eslint/parser';
import config from '@typescript-eslint/eslint-plugin/use-at-your-own-risk/eslint-recommended-raw';
export default (
  plugin: FlatConfig.Plugin,
  parser: FlatConfig.Parser,
): FlatConfig.ConfigArray => [
  {
    languageOptions: {
      parser,
      sourceType: 'module',
  },
    plugins: {
      '@typescript-eslint': plugin,
    },
  },
  /**
   * disables rules from eslint:recommended which are already handled by TypeScript.
   * enables rules that make sense due to TS's typechecking / transpilation.
   */
  ...config('minimatch'),
  {
    rules: {
      '@typescript-eslint/ban-ts-comment': 'error',
      'no-array-constructor': 'off',
      '@typescript-eslint/no-array-constructor': 'error',
      ... other rules,
    },
  },
];
```


## Next.js Configuration

> I will set @eslint/eslintrc@3.2.0, eslint-plugin-react@7.37.2,
 eslint-plugin-react-hooks@5.1.0 and eslint-plugin-react-refresh@0.4.16 in devDependencies of package.json

For nextjs, I use official configuration to add  `next/core-web-vitals`, but I remove `next/typescript`. Actually, `next/typescript` is `plugin:@typescript-eslint/recommended` rules included in our typescript configuration.


## Eslint-plugin-import-x

More efficient and lightweight `eslint-plugin-import`. 

I also import the `eslint-import-resolver-typescript` which resolve paths defined in tsconfig.json located  `<root>/tsconfig.json` by default.


It includes flowing rules in `eslintPluginImportX.flatConfigs.typescript`
```
{
  settings: {
    'import-x/resolver': {
      typescript: true;
    };
  }
}
```

`eslint-import-resolver-typescript` was used to make  `<root>/tsconfig.json` alias work. So we don't need set it in normally.

## Vue、Tailwind CSS 、prettier

I just config it according to official advice.


