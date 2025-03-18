import type { nextFucType, oraShowType, returnType, whichConfigurationProps } from './types';
// not types
import ejs from 'ejs';
import { eslintTemplate } from '../template';
import { execPromise } from '@/utils';
import { answer, packageSeparator } from './constants';

const ejsTemp = ejs.compile(eslintTemplate);

export async function handleEslint(
  shareData: {
    answer: whichConfigurationProps;
    eslint: {
      commands?: oraShowType[];
      packages?: string[];
    };
  },
  next: nextFucType,
) {
  const {
    [answer]: { typescript, react, vue, nextjs, tailwind, prettier },
  } = shareData;

  const result: returnType = {};

  const reactPackages = [
    `eslint-plugin-react${packageSeparator}7.37.2`,
    `eslint-plugin-react-hooks${packageSeparator}5.1.0`,
    `eslint-plugin-react-refresh${packageSeparator}0.4.16`,
  ];

  result.packages = [];
  result.commands = [];

  result.packages.push(
    ...[
      `eslint${packageSeparator}9.17.0`,
      `@eslint/js${packageSeparator}9.17.0`,
      `eslint-plugin-import-x${packageSeparator}4.6.1`,
      `eslint-import-resolver-typescript${packageSeparator}3.7.0`,
      `globals${packageSeparator}15.14.0`,
    ],
  );

  if (typescript) {
    result.packages.push(...[`typescript-eslint${packageSeparator}8.18.1`]);
  }

  if (vue) {
    result.packages.push(...[`eslint-plugin-vue${packageSeparator}9.32.0`]);
  }

  if (tailwind) {
    result.packages.push(...[`eslint-plugin-tailwindcss${packageSeparator}3.17.5`]);
  }

  if (prettier) {
    result.packages.push(...[`eslint-plugin-prettier${packageSeparator}5.2.1`]);
  }

  if (nextjs) {
    result.packages.push(...[`@next/eslint-plugin-next${packageSeparator}15.2.3`, ...reactPackages]);
  }

  if (react && !nextjs) {
    result.packages.push(...reactPackages);
  }

  result.commands.push({
    label: '【done】',
    text: 'generating eslint.config.mjs...',
    successText: 'eslint.config.mjs has been generated in current directory',
    failText: 'fail to generate eslint.config.mjs in current directory',
    fn: () =>
      execPromise(`cat << EOF > eslint.config.mjs
${ejsTemp({ javascript: true, typescript, react: nextjs || react, vue, nextjs, tailwind, prettier })}
EOF`),
  });

  shareData.eslint = result;
  next();
}
