<div align="center" style="margin-top: 12px">
  <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://assets.vercel.com/image/upload/v1662130559/nextjs/Icon_dark_background.png">
      <img alt="mx-design logo" src="./assets/logo.png" height="108">
    </picture>
  <h2>config-eslint9</h2>
</div>

[English](./README.md) | 中文

该 CLI 工具帮助你快速创建 ESLint 9.x 配置文件，并包含最佳实践。

## 使用方法

### 安装工具包

```bash
npm i @mx-design/config-eslint9 -D
```

```bash
yarn add @mx-design/config-eslint9 -D
```

```bash
pnpm add @mx-design/config-eslint9 -D
```

### 将命令添加到 package.json 的 scripts 中

```bash
npm pkg set scripts.eslintConfig="config-eslint9 config"
```

上述操作会在你的 package.json 中添加如下命令：

```javascript
 "scripts": {
    ...other command...,
    "eslintConfig": "config-eslint9 config"
  },
```

### 运行命令

```
npm run eslintConfig
```

```
yarn run eslintConfig
```

```
pnpm run eslintConfig
```

## 文档

在这一部分，我将解释我为什么以这种方式配置 ESLint。欢迎通过 Issues 提供反馈或建议。

### react 配置

> 将 eslint-plugin-react@7.37.2, eslint-plugin-react-hooks@5.1.0 和 eslint-plugin-react-refresh@0.4.16 安装到开发依赖中。

主要添加了 `react` 和 `react-hook` 的 eslint 配置规则。

### Javascript 配置

大多数介绍 ESLint 9.x 的文章和项目会展示如下的 JavaScript 配置：

```javascript
import jsLint from '@eslint/js';
export default [jsLint.configs.recommended];
```
这种方式并不理想，因为它没有限制 lint 的作用范围。

为什么限制作用范围很重要？即使你使用了 TypeScript，你仍然需要 lint 一些 JavaScript 文件，例如 `eslint.config.mjs` or `.prettierrc.js`.

我通过以下配置进行了改进：

```javascript
import jsLint from '@eslint/js';
const jsLintConfig = {
  files: ['**/*.{js,mjs,cjs}'],
  rules: {
    ...jsLint.configs.recommended.rules,
  },
};
```

实际上，`jsLint.configs.recommended` 的源代码只包含如下规则：

```javascript
module.exports = Object.freeze({
  rules: Object.freeze({
    'constructor-super': 'error',
    'for-direction': 'error',
    // ... other rules
  }),
});
```

### Typescript 配置

大多数介绍 ESLint 9.x 的文章和项目中，你会看到类似下面的 TypeScript 配置：

```javascript
import tsLint from 'typescript-eslint';
export default [jsLint.configs.recommended, ...tsLint.configs.recommended];
```

其缺点和 JavaScript 配置 部分相同：它没有限制 lint 的作用范围。

另一种方式是：

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

这种方式还可以，但没有包含推荐的 TypeScript 规则。

我改进为以下配置：

```javascript
import tsLint from 'typescript-eslint';
// 推荐的规则和 parser 在里面
const tsLintConfig = [...tsLint.configs.recommended].map((conf) => ({
  ...conf,
  files: ['**/*.{ts,tsx}'],
}));

const tsLintCustomConfig = {
  files: ['**/*.{ts,tsx}'],
  rules: {
    // 自定义或者覆盖 ts 规则
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
   * 禁用 eslint:recommended 中已经由 TypeScript 处理的规则。
   * 启用因 TypeScript 的类型检查和转译而合理的规则。
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


## Next.js 配置

对于 Next.js，主要添加了 `@next/eslint-plugin-next@15.2.3` 来支持 Next.js 的 lint 规则。


## Eslint-plugin-import-x

它是更高效且轻量化的 eslint-plugin-import。

我还引入了 `eslint-import-resolver-typescript`，主要用于解析别名，例如 `@/app`, 它默认使用 <root>/tsconfig.json 里的 path 来解析别名。

其中 `eslintPluginImportX.flatConfigs.typescript` 的规则里包含
```
{
  settings: {
    'import-x/resolver': {
      typescript: true;
    };
  }
}
```

这是用来让 `eslint-import-resolver-typescript` 解析 `<root>/tsconfig.json` 生效的配置，所以我们一般情况下无需再次配置


## Vue、Tailwind CSS 、prettier

根据官方建议进行了相应的配置。


