#!/usr/bin/env node --harmony

import shell from 'shelljs';
import {
  prompt,
} from 'inquirer';
import Promise from 'bluebird';
import {
  start,
  info,
  warn,
  end,
} from './helpers/logs';


/**
 * Helper Function to execute commands synchronously with a completed callback.
 * @param {string} cmd The command to be ran.
 * @param {string} errMsg The possible error message to be displayed.
 * @return {Promise}
 */
function runUpgradeCommand(cmd: String, errMsg: String) {
  return new Promise((resolve) => {
    shell.exec(cmd, (code, stdout, stderr) => {
      if (code !== 0) {
        shell.echo(warn(`Error ${errMsg}:\n${stderr}`));
        shell.exit(1);
      };
      resolve('resolved');
    });
  });
};

/**
 * Helper Function to execute commands synchronously with a completed callback.
 * @param {string} cmd The command to be ran.
 * @param {string} shell The preferred shell to run command in.
 * @param {string} errMsg The possible error message to be displayed.
 * @return {Promise}
 */
function runUpgradeCommandWithShell(cmd: String, shell: String, errMsg: String) {
  return new Promise((resolve, reject) => {
    shell.exec(cmd, `{shell: ${shell}}`, (code, stdout, stderr) => {
      if (code !== 0) {
        reject(`Error: ${errMsg}`);
        shell.echo(warn(`Error ${errMsg}:\n${stderr}`));
        shell.exit(1);
      };
      resolve('resolved');
    });
  });
};

/**
 * Helper function to handle promise rejection errors.
 * @param {string} err The rejected error.
 */
function catchErr(err: String) {
  warn(`Something went wrong installing node with nvm

    Error: ${err}`);
};


/**
 * Updates the systems ruby-gems
 */
async function updateSystem() {
  start('Updating RubyGems');

  command = 'gem update --system';
  error = 'updating ruby-gems';

  await runUpgradeCommand(command, error);

  end('Updating RubyGems completed');
};

/**
 * Synchronizes the dot files with the remote git repository.
 */
async function updateDotFiles() {
  const gitString = 'git --git-dir=$HOME/.eng-cfg/ --work-tree=$HOME';

  start('Syncing dot-files');

  info('Fetching remote changes');
  await runUpgradeCommand(`${gitString} fetch`, 'fetching');

  info('Showing status');
  await runUpgradeCommand(`${gitString} status`, 'showing status');

  info('Pulling changes');
  await runUpgradeCommand(`${gitString} pull --ff-only`, 'pulling');

  end('Syncing dot-files complete');
};

/**
 * Update node via nvm.
 */
async function updateNode() {
  const shell = `$NVM_DIR/nvm.sh`;
  let command = 'nvm install node';

  start('Updating node');

  await runUpgradeCommandWithShell(command, shell, 'installing node')
    .catch((err) => catchErr(err));

  info('Switching to default');
  command = 'nvm use --delete-prefix default';
  await runUpgradeCommandWithShell(command, shell, 'switching to nvm default')
    .catch((err) => catchErr(err));

  end('node update complete');
};

/**
 * Update brew packages.
 */
async function updateBrew() {
  start('Updating brew');

  const upgrade = {
    type: 'confirm',
    name: 'shouldUpdate',
    message: 'Want to upgrade the above outdated brew packages?',
    default: 'Yes',
  };

  const cleanup = {
    type: 'confirm',
    name: 'shouldCleanup',
    message: 'Want to cleanup the above old brew packages?',
    default: 'Yes',
  };

  await runUpgradeCommand('brew update', 'updating brew');
  await runUpgradeCommand('brew outdated', 'showing outdated');
  await prompt(upgrade).then((answers) => {
    if (answers.shouldUpdate) {
      runUpgradeCommand('brew upgrade', 'upgrading brew');
    } else {
      info('Skipping brew update');
    }
  });
  await runUpgradeCommand('brew cleanup --dry-run', 'showing packages to cleanup'); // eslint-disable-line
  await prompt(cleanup).then((answers) => {
    if (answers.shouldCleanup) {
      runUpgradeCommand('brew cleanup', 'cleaning brew packages');
    } else {
      info('Skipping brew cleanup');
    }
  });
};

/**
 * Update NVM.
 */
async function updateNvm() {
  const command = 'curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash';

  start('Updating NVM');
  await runUpgradeCommand(command, 'updating NVM');
  end('Update NVM complete');
};

/**
 * Update yarn.
 */
async function updateYarn() {
  start('Updating yarn global packages');

  await runUpgradeCommand(
    'yarn global upgrade-interactive',
    'updating yarn packages'
  );

  end('Update yarn global packages complete');
};

/**
 * Update avn.
 */
async function updateAvn() {
  start('Updating avn');

  await runUpgradeCommand('avn setup', 'setting up avn');

  end('Update avn complete');
};

/**
 * Run update on all.
 */
async function updateAll() {
  await updateSystem();
  await updateDotFiles();
  await updateNode();
  await updateBrew();
  await updateNvm();
  await updateYarn();
  await updateAvn();
}

export {
  updateAll,
  updateSystem,
  updateDotFiles,
  updateNode,
  updateBrew,
  updateNvm,
  updateAvn,
  updateYarn,
};
