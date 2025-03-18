import jsLint from '@eslint/js';
import eslintPluginImportX from 'eslint-plugin-import-x';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import tsLint from 'typescript-eslint';
import globals from 'globals';
var a = 2;
const ignoresConfig = {
  name: 'ignores',
  ignores: ['**/node_modules/', '**/.vscode/', '**/.husky/'],
};

const tsLintConfig = [...tsLint.configs.recommended].map((conf) => ({
  ...conf,
  files: ['**/*.{ts,tsx}'],
}));

const tsLintCustomConfig = {
  files: ['**/*.{ts,tsx}'],
  rules: {
    '@typescript-eslint/no-explicit-any': 0,
  },
};

const jsLintConfig = {
  rules: {
    files: ['**/*.{js,mjs,cjs}'],
    ...jsLint.configs.recommended.rules,
  },
};

const prettierConfig = eslintPluginPrettierRecommended;

const importJSConfig = eslintPluginImportX.flatConfigs.recommended;
const importTSConfig = eslintPluginImportX.flatConfigs.typescript;

const importCommonConfig = {
  files: ['**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}'],
  rules: {
    'import-x/no-dynamic-require': 'warn',
    'import-x/no-nodejs-modules': 'warn',
  },
};

const globalsConfig = {
  languageOptions: {
    /**
     * @zh 指定要使用的ECMAScript版本
     * @en Indicates the ECMAScript version of the code being linted.
     */
    ecmaVersion: 2022,
    /**
     * @zh 代码类型，有三种选择：script、module和commonjs，script是指普通的js文件，module是指es6的模块化文件，commonjs是指nodejs的模块化文件
     * @en There are three types of code: script, module, and commonjs. script refers to ordinary js files, module refers to es6 modular files, and commonjs refers to nodejs modular files
     */
    sourceType: 'module',
    /**
     * @zh node 或者浏览器中的全局变量很多，如果我们一个个进行声明显得繁琐,因此就需要用到env，这是对环境定义的一组全局变量的预设
     * @en There are many global variables in node or browser, it would be cumbersome if we declare them one by one, So we need to a preset for a set of global variables defined
     */
    globals: {
      ...globals.browser,
      ...globals.es2021,
      ...globals.node,
    },
  },
};

export default [
  ignoresConfig,
  jsLintConfig,
  ...tsLintConfig,
  tsLintCustomConfig,
  prettierConfig,
  importJSConfig,
  importTSConfig,
  importCommonConfig,
  globalsConfig,
];
