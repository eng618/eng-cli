#!/usr/bin/env node --harmony

const shell = require('shelljs');
const {
  prompt,
} = require('inquirer');
const chalk = require('chalk');


/**
 * Start indicator.
 * @param {string} msg The message to be displayed
 */
function start(msg) {
  console.log(chalk.magenta(`==> ${msg}`));
};

/**
 * Info indicator.
 * @param {string} msg The message to be displayed
 */
function info(msg) {
  console.log(chalk.cyan(`==! ${msg}`));
};

/**
 * Warning indicator.
 * @param {string} msg The message to be displayed
 */
function warning(msg) {
  console.log(chalk.red(`==x ${msg}`));
};

/**
 * End indicator.
 * @param {string} msg The message to be displayed
 */
function end(msg) {
  console.log(chalk.green(`==# ${msg}`));
};

/**
 * Updates the systems ruby-gems
 */
function updateRubyGems() {
  start('Updating RubyGems');
  if (shell.exec('gem update --system').code !== 0) {
    shell.echo(warning('Error updating rubygems'));
    shell.exit(1);
  }
  end('Updating RubyGems completed');
}

/**
 * Synchronizes the dot files with the remote git repository.
 */
function syncDotFiles() {
  const gitString = 'git --git-dir=$HOME/.eng-cfg/ --work-tree=$HOME';

  start('Syncing dot-files');
  info('Fetching remote changes');
  if (shell.exec(`${gitString} fetch`).code !== 0) {
    shell.echo(warning('Error fetching'));
    shell.exit(1);
  }
  info('Showing status');
  if (shell.exec(`${gitString} status`).code !== 0) {
    shell.echo(warning('Error showing status'));
    shell.exit(1);
  }
  info('Pulling changes');
  if (shell.exec(`${gitString} pull --ff-only`).code !== 0) {
    shell.echo(warning('Error pulling'));
    shell.exit(1);
  }
  end('Syncing dot-files complete');
};

/**
 * Update node via nvm.
 */
function updateNode() {
  start('Updating node');
  if (shell.exec('nvm install node', {
      shell: '$NVM_DIR/nvm.sh',
    }).code !== 0) {
    shell.echo(warning('Error installing node'));
    shell.exit(1);
  }
  info('Switching to default');
  if (shell.exec(
      'nvm use --delete-prefix default', {
        shell: '$NVM_DIR/nvm.sh',
      }).code !== 0) {
    shell.echo(warning('Error switching to nvm default'));
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

  if (shell.exec('brew update').code !== 0) {
    shell.echo(warning('Error updating brew'));
    shell.exit(1);
  }

  if (shell.exec('brew outdated').code !== 0) {
    shell.echo(warning('Error showing outdated brew packages'));
    shell.exit(1);
  }

  prompt(upgrade).then((answers) => {
    if (answers.shouldUpdate) {
      if (shell.exec('brew upgrade').code !== 0) {
        shell.echo(warning('Error showing packages to clean up'));
        shell.exit(1);
      }
    } else {
      info('Skipping brew update');
    }

    if (shell.exec('brew cleanup --dry-run').code !== 0) {
      shell.echo(warning('Error showing packages to clean up'));
      shell.exit(1);
    }

    prompt(cleanup).then((answers) => {
      if (answers.shouldCleanup) {
        if (shell.exec('brew cleanup').code !== 0) {
          shell.echo(warning('Error cleaning up packages'));
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
function updateNvm() {
  const command = 'curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash';

  start('Updating NVM');

  shell.exec(command, (code, stdout, stderr) => {
    if (code !== 0) {
      shell.echo(warning(`Error updating NVM:\n${stderr}`));
      shell.exit(1);
    }
  });

  end('Update NVM complete');
};

/**
 * Update avn.
 */
function updateAvn() {
  const command = 'yarn global upgrade avn avn-nvm avn-n';

  start('Updating avn');

  shell.exec(command, (code, stdout, stderr) => {
    if (code !== 0) {
      shell.echo(warning(`Error updating avn:\n${stderr}`));
      shell.exit(1);
    };
    shell.exec('avn setup'), (code, stdout, stderr) => {
      if (code !== 0) {
        shell.echo(warning(`Error setting up avn:\n${stderr}`));
        shell.exit(1);
      };
    };
  });

  end('Update avn complete');
};

/**
 * Update yarn.
 */
function updateYarn() {
  start('Updating yarn global packages');

  shell.exec('yarn global upgrade-interactive', (code, stdout, stderr) => {
    if (code !== 0) {
      shell.echo(warning(`Error updating yarn packages:\n${stderr}`));
      shell.exit(1);
    }
  });

  end('Update yarn global packages complete');
};

module.exports = function() {
  updateRubyGems();
  syncDotFiles();
  updateNode();
  updateBrew();
  updateNvm();
  updateAvn();
  updateYarn();
};
