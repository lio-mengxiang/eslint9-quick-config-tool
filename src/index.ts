import { program } from 'commander';
import { bin, version } from '../package.json' assert { type: 'json' };
import { generateConfig } from './generateConfig';

const commandName = Object.keys(bin)?.[0];
program.name(commandName).version(version, '-v, --version');

generateConfig(program, commandName);

/**
 * @zh commander解析命令行参数
 * @en parse the command-line arguments by commander
 */
program.parse(process.argv);

/**
 * @zh 如果命令行没有参数如执行mx，则会显示帮助文档
 * @en if there are no arguments to the command line, such as executing mx, the help documentation will be shown
 */
if (!program.args[0]) {
  program.help();
}
