#!/usr/bin/env node --harmony

const program = require('commander');
const {prompt} = require('inquirer');
const shell = require('shelljs');
const chalk = require('chalk');

const pkg = require('../package.json');
const header = require('../assets/asci-header');
const {updateAll, updateSystem, updateDotFiles, updateNode, updateBrew, updateNvm, updateAvn, updateYarn} = require('./upgrade');


const questions = [{
  type: 'input',
  name: 'firstWord',
  message: 'enter a word...',
}, {
  type: 'input',
  name: 'secondWord',
  message: 'enter another word...',
}];

  program
    .version(pkg.version)
    .description(`${chalk.red(header)}
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
    .description('Upgrade dev software')
    .action(() => {
      updateSystem();
    });

  program
    .command('update-node')
    .alias('un')
    .description('Basic Hello World check!')
    .action(() => {
      updateNode();
    });

  program
    .command('test-input')
    .alias('ti')
    .description('Short little test to see if input is working')
    .action(() => {
      prompt(questions).then((answers) => {
        const output = `${answers.firstWord} ${answers.secondWord}`;
        console.log(chalk.magenta(output));
      });
    });

  program
    .command('print-working-dir')
    .alias('pwd')
    .description('prints the current working directory')
    .action(() => {
      if (shell.exec('pwd').code !== 0) {
        shell.echo('Error: Git commit failed');
        shell.exit(1);
      }
    });

  program.parse(process.argv);
