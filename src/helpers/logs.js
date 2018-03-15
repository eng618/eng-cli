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
function warn(msg) {
  console.log(chalk.red(`==x ${msg}`));
};

/**
 * End indicator.
 * @param {string} msg The message to be displayed
 */
function end(msg) {
  console.log(chalk.green(`==# ${msg}`));
};

module.exports = {
  start,
  info,
  warn,
  end,
};
