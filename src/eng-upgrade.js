#!/usr/bin/env node --harmony

const program = require('commander');

const upgrade = require('./helpers/_upgrade');

program
  .option('-a, --all', 'Upgrade all')
  .option('-s, --system', 'Upgrade systems RubyGems', {
    isDefault: true,
  })
  .option('-d, --dot-files', 'Sync dotfiles')
  .option('-n, --node', 'Upgrade node, nvm, and avn')
  .option('-b, --brew', 'Upgrade brew and installed packages')
  .option('-y, --yarn', 'Upgrade yarn globally installed packages')
  .parse(process.argv);

// console.log(program);

let options = ['system', 'dotFiles', 'node', 'brew', 'yarn'];

if (program.all) {
  upgrade.all();
} else {
  for (var i = 0; i < options.length; i++) {
    let currentOption = options[i];
    if (program[currentOption]) {
      upgrade[options[i]]();
    }
  }
}
