#!/usr/bin/env node --harmony

// import './eng';

const program = require('commander');
const { prompt } = require('inquirer');
const shell = require('shelljs');
const chalk = require('chalk');



const questions = [{
  type: 'input',
  name: 'firstWord',
  message: 'enter a word...'
}, {
  type: 'input',
  name: 'secondWord',
  message: 'enter another word...'
}];

// program
//   .description('[eng]arcia shell automation tool - (c) 2018 Eric N. Garcia')
//   .alias('eng');

program
  .command('hello-world')
  .alias('hw')
  .description('Basic Hello World check!')
  .action(() => {
    console.log('Hello World!');
  });

program
  .command('test-input')
  .alias('ti')
  .description('Short little test to see if input is working')
  .action(() => {
    prompt(questions).then(answers => {
      console.log(chalk.magenta(`The first word is ${answers.firstWord}, and the second is ${answers.secondWord}`))
    });
  });

program
  .command('update')
  .alias('u')
  .description('Update dev software')
  .action(() => {
    console.log('This should be updating your stuff...');
  });

program
  .command('print-working-dir')
  .alias('pwd')
  .description('prints the current working directory')
  .action(() => {
    console.log(chalk.red('This is a test'));
    if (shell.exec('pwd').code !== 0) {
      shell.echo('Error: Git commit failed');
      shell.exit(1);
    }
  });

program.parse(process.argv);
