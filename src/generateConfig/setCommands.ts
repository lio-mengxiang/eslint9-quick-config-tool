import { spinner } from '@clack/prompts';
import { print } from '@/utils';
import type { returnType } from './types';

const s = spinner();

export async function setCommands(commands: returnType['commands'] = []) {
  for (let i = 0; i < commands.length; i++) {
    const command = commands[i];
    s.start(command.text);
    await command
      .fn()
      .then(() => {
        s.stop(command.label ? `✅ ${print.success(command.label, true)} ${command.successText}` : command.successText);
      })
      .catch((error) => {
        s.stop(command.label ? `❌ ${print.error(command.label, true)} ${command.failText}` : command.failText);

        if (error) {
          print.error(`
            error.message: ${error.message}
            error.stack: ${error.stack}
            `);
        }
      });
  }
}
