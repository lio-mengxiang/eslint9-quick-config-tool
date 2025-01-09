import chalk from 'chalk';

interface logMsg {
  (msg: string, onlyText: true): string;
  (msg: string, onlyText: false): void;
  (msg: string): void;
}

function noop(msg: string): string {
  return msg;
}

function log(fn: (msg: string) => string): logMsg {
  return (msg: string, onlyText?: true | false) => {
    if (onlyText) return fn(msg);
    console.log(fn(msg));
  };
}

export const print = {
  success: log(chalk.green),
  error: log(chalk.red),
  warn: log(chalk.yellow),
  info: log(chalk.cyan),
  log: log(noop),
};
