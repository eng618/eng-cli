#!/usr/bin/env node --harmony
import * as path from 'path';

import * as program from 'commander';
import chalk from 'chalk';

import * as header from './assets/asci-header';
import {
  updateAll,
  updateSystem,
  updateDotFiles,
  updateNode,
  updateBrew,
  updateNvm,
  updateAvn,
  updateYarn,
} from './upgrade';

const pkgPath: String = path.resolve(__dirname, 'package.json');
import pkg from pkgPath;


program
  .version(pkg.version)
  .description(`${chalk.red(header)}\n
  [eng]arcia shell automation tool - (c) 2018 Eric N. Garcia`);

program
  .command('upgrade-all')
  .alias('u')
  .description('Upgrade dev software')
  .action(() => {
    updateAll();
  });

program
  .command('update-system')
  .alias('us')
  .description('Upgrade system\'s Ruby environment')
  .action(() => {
    updateSystem();
  });

program
  .command('update-dot-files')
  .alias('udf')
  .description('Synchronizes .files with remote repository')
  .action(() => {
    updateDotFiles();
  });

program
  .command('update-node')
  .alias('un')
  .description('Basic Hello World check!')
  .action(() => {
    updateNode();
  });

program
  .command('update-brew')
  .alias('ub')
  .description('Update brew, and all installed packages')
  .action(() => {
    updateBrew();
  });


program
  .command('update-nvm')
  .alias('unvm')
  .description('Update nvm')
  .action(() => {
    updateNvm();
  });

program
  .command('update-avn')
  .alias('uavn')
  .description('Update avn')
  .action(() => {
    updateAvn();
  });

program
  .command('update-yarn')
  .alias('uy')
  .description('Update all globally install yarn packages.')
  .action(() => {
    updateYarn();
  });

program.parse(process.argv);

export default function() {

}
