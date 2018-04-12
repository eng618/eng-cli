#!/usr/bin/env node --harmony

const program = require('commander');
const chalk = require('chalk');

const pkg = require('../package.json');
const header = require('./assets/asci-header');


program
  .version(pkg.version)
  .description(`${chalk.red(header)}\n
  [eng]arcia shell automation tool - (c) 2018 Eric N. Garcia`)
  .command('upgrade', 'Upgrade dev software').alias('u')
  .parse(process.argv);

if (!program.args.length) program.help();
