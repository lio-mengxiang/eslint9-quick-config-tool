import { spinner } from '@clack/prompts';
import { execPromise } from '../utils';
import { packageSeparator } from './constants';

const s = spinner();

export async function setDevDependencies(packages: string[]) {
  let pkgString = '';
  for (let i = 0; i < packages.length; i++) {
    const npmPackage = packages[i].split(packageSeparator);
    pkgString += ` devDependencies.${npmPackage[0]}=${npmPackage[1]}`;
  }
  s.start('start set devDependencies in package.json');
  await execPromise(`npm pkg set ${pkgString}`)
    .then(() => {
      s.stop('set new devDependencies to package.json successfully');
    })
    .catch(() => {
      s.stop('fail to set new devDependencies to package.json');
    });
}
