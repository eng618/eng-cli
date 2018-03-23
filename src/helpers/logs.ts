import chalk from 'chalk';

/**
 * Start indicator.
 * @param {string} msg The message to be displayed
 */
function start(msg: String) {
  console.log(chalk.magenta(`==> ${msg}`));
};

/**
 * Info indicator.
 * @param {string} msg The message to be displayed
 */
function info(msg: String) {
  console.log(chalk.cyan(`==! ${msg}`));
};

/**
 * Warning indicator.
 * @param {string} msg The message to be displayed
 */
function warn(msg: String) {
  console.log(chalk.red(`==x ${msg}`));
};

/**
 * End indicator.
 * @param {string} msg The message to be displayed
 */
function end(msg: String) {
  console.log(chalk.green(`==# ${msg}`));
};

export = {
  start,
  info,
  warn,
  end,
};
