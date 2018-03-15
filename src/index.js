#!/usr/bin/env node --harmony

const program = require('commander');
const chalk = require('chalk');

const pkg = require('../package.json');
const header = require('../assets/asci-header');
const {
  updateAll,
  updateSystem,
  updateDotFiles,
  updateNode,
  updateBrew,
  updateNvm,
  updateAvn,
  updateYarn,
} = require('./upgrade');


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
