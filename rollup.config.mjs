import json from '@rollup/plugin-json';
import { dirname, resolve as nodeResolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'rollup';
import alias from 'rollup-plugin-alias';
import esbuild from 'rollup-plugin-esbuild';
/**
 * A Rollup/Vite plugin that automatically declares NodeJS built-in modules as external. Also handles npm dependencies, devDependencies, peerDependencies and optionalDependencies.
 */
import externals from 'rollup-plugin-node-externals';

const __dirname = dirname(fileURLToPath(import.meta.url));

const esmConfig = defineConfig({
  input: './src/index.ts',
  plugins: [
    externals(),
    alias({
      entries: [{ find: '@', replacement: nodeResolve(__dirname, './src') }],
      resolve: ['.ts', 'js', '/index.ts'],
    }),
    esbuild({
      include: /\.[jt]sx?$/,
      target: 'esnext',
      minify: false,
      // jsx: 'transform',
      // jsxFactory: 'React.createElement',
      // jsxFragment: 'React.Fragment',
      // tsconfig: nodeResolve(__dirname, './tsconfig.build.json'),
    }),
    json(),
  ],
  output: {
    dir: 'esm/',
    format: 'esm',
    entryFileNames: '[name].mjs',
    // separate chunks and removing unused exports
    preserveModules: true,
  },
});

export default esmConfig;
