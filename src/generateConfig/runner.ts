import type { shareDataProps, shareDataProps2 } from './types';
// not type
import { outro } from '@clack/prompts';
import chalk from 'chalk';
import { print } from '../utils';
import { answer } from './constants';
import { setCommands } from './setCommands';
import { setDevDependencies } from './setDevDependencies';

export async function runner(shareData: shareDataProps2<shareDataProps, 'answer'>) {
  /**
   * set devDependencies
   */
  const packages: string[] = [];
  /**
   * set scripts
   */
  const commands = [];

  Object.keys(shareData).forEach((key) => {
    if (key === answer) return;
    const curr = shareData[key];
    if (Array.isArray(curr?.packages)) packages.push(...curr.packages);
    if (Array.isArray(curr?.commands)) commands.push(...curr.commands);
  });

  await setDevDependencies(packages);

  await setCommands(commands);

  outro(`${chalk.bgGreen(' >> please install packages by typing one of the following commands: ')} ${print.success(
    `
    · npm i
    · yarn i
    · pnpm i`,
    true,
  )}
    `);
}
