#!/usr/bin/env node --harmony

const os = require('os');

const shell = require('shelljs');
const {
  prompt,
} = require('inquirer');
const Promise = require('bluebird');
const {start, info, warn, end} = require('./helpers/logs');


/**
 * Helper Function to execute commands synchronously with a completed callback.
 * @param {string} cmd The command to be ran.
 * @param {string} errMsg The possible error message to be displayed.
 * @return {Promise}
 */
function runUpgradeCommand(cmd, errMsg) {
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
 * @param {string} errMsg The possible error message to be displayed.
 * @return {Promise}
 */
function runUpgradeCommandWithShell(cmd, shell, errMsg) {
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
  start('Updating node');
  const cmd = 'nvm install node';
  const shell = '$NVM_DIR/nvm.sh';
  console.log(os.homedir());
  const options = `${os.homedir()}/.nvm/nvm.sh`;
  let command = `'${cmd}', ${options}`;

  // await runUpgradeCommand(command, 'installing node');
  await runUpgradeCommandWithShell(cmd, shell, 'installing node');

  // if (shell.exec('nvm install node', {
  //     shell: '$NVM_DIR/nvm.sh',
  //   }).code !== 0) {
  //   shell.echo(warn('Error installing node'));
  //   shell.exit(1);
  // }

  info('Switching to default');
  if (shell.exec(
      'nvm use --delete-prefix default', {
        shell: '$NVM_DIR/nvm.sh',
      }).code !== 0) {
    shell.echo(warn('Error switching to nvm default'));
    shell.exit(1);
  }

  end('node update complete');
};

/**
 * Update brew packages.
 */
function updateBrew() {
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

  shell.exec('brew update', (code, stdout, stderr) => {
    if (code !== 0) {
      shell.echo(warn(`Error updating brew:\n${stderr}`));
      shell.exit(1);
    }
  });

  shell.exec('brew outdated', (code, stdout, stderr) => {
    if (code !== 0) {
      shell.echo(warn(`Error showing outdated:\n${stderr}`));
      shell.exit(1);
    }
  });

  prompt(upgrade).then((answers) => {
    if (answers.shouldUpdate) {
      shell.exec('brew upgrade', (code, stdout, stderr) => {
        if (code !== 0) {
          shell.echo(warn(`Error upgrading brew:\n${stderr}`));
          shell.exit(1);
        }
      });

      if (shell.exec('brew upgrade').code !== 0) {
        shell.echo(warn('Error showing packages to clean up'));
        shell.exit(1);
      }
    } else {
      info('Skipping brew update');
    }

    if (shell.exec('brew cleanup --dry-run').code !== 0) {
      shell.echo(warn('Error showing packages to clean up'));
      shell.exit(1);
    }

    prompt(cleanup).then((answers) => {
      if (answers.shouldCleanup) {
        if (shell.exec('brew cleanup').code !== 0) {
          shell.echo(warn('Error cleaning up packages'));
          shell.exit(1);
        }
      } else {
        info('Skipping cleanup');
      }
      end('Updating brew completed');
    });
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
 * Update avn.
 */
async function updateAvn() {
  const command = 'yarn global upgrade avn avn-nvm avn-n';

  start('Updating avn');

  await runUpgradeCommand(command, 'updating avn');
  await runUpgradeCommand('avn setup', 'setting up avn');

  end('Update avn complete');
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
 * Run update on all.
 */
async function updateAll() {
  await updateSystem();
  await updateDotFiles();
  await updateNode();
  // await updateBrew();
  await updateNvm();
  await updateAvn();
  await updateYarn();
}

module.exports = {
  updateAll,
  updateSystem,
  updateDotFiles,
  updateNode,
  updateBrew,
  updateNvm,
  updateAvn,
  updateYarn,
};
