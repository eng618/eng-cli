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
  .command('upgrade')
  .alias('u')
  .option('-a, --all', 'Upgrade all')
  .option('-s, --system', 'Upgrade systems RubyGems')
  .option('-d, --dot-files', 'Sync dotfiles')
  .option('-n, --node', 'Upgrade node, nvm, and avn')
  .option('-b, --brew', 'Upgrade brew and installed packages')
  .option('-y, --yarn', 'Upgrade yarn globally installed packages')
  .description('Upgrade dev software')
  .action(() => {
    console.log(program.all);
    // updateAll();
  });

program.parse(process.argv);

if (!program.args.length) {
  program.help();
}
