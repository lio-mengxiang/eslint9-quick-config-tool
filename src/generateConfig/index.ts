import type { Command } from 'commander';
import type { frameworksPropsType, languagePropsType, shareDataProps } from './types';
// not type
import { cancel, confirm, group, intro, select } from '@clack/prompts';
import { compose } from '../utils';
import { answer, JS, TS, REACT, VUE, NEXT, NEXT_JS } from './constants';
import { handleEslint } from './handleEslint';
import { runner } from './runner';

export function generateConfig(program: Command, commandName: string) {
  program
    .command(commandName)
    .description('generate eslint configuration file')
    .action(async () => {
      intro('start to configure eslint9.x config file');

      const config = await group<{
        languageType: symbol | languagePropsType;
        frameworksType: symbol | frameworksPropsType;
        tailwind: symbol | boolean;
        prettier: symbol | boolean;
      }>(
        {
          languageType: () =>
            select<
              {
                value: languagePropsType;
                label: string;
              }[],
              languagePropsType
            >({
              message: 'Would you like to use Typescript in your project ?',
              initialValue: TS,
              options: [
                {
                  value: TS,
                  label: TS,
                },
                {
                  value: JS,
                  label: JS,
                },
              ],
            }),
          frameworksType: () =>
            select<
              {
                value: frameworksPropsType;
                label: string;
              }[],
              frameworksPropsType
            >({
              message: 'Which framework would you use in your project ?',
              initialValue: REACT,
              options: [
                {
                  value: REACT,
                  label: REACT,
                },
                {
                  value: VUE,
                  label: VUE,
                },
                {
                  value: NEXT,
                  label: NEXT_JS,
                },
              ],
            }),
          tailwind: () =>
            confirm({
              message: 'Would you like to use TailWind CSS in your project ?',
              initialValue: true,
            }),
          prettier: () =>
            confirm({
              message: 'Would you like to use Prettier in your project ?',
              initialValue: true,
            }),
        },
        {
          onCancel: () => {
            cancel('Operation cancelled.');
            process.exit(0);
          },
        },
      );

      const { languageType, frameworksType, tailwind, prettier } = config;
      compose<shareDataProps>([handleEslint, runner], {
        [answer]: {
          react: frameworksType === REACT,
          vue: frameworksType === VUE,
          nextjs: frameworksType === NEXT,
          javascript: languageType === JS,
          typescript: languageType === TS,
          tailwind,
          prettier,
        },
      });
    });
}
