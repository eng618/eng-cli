const chalk = require('chalk');

module.exports = {
  /**
   * Start indicator.
   * @param {string} msg The message to be displayed
   */
  start: function start(msg) {
    console.log(chalk.magenta(`==> ${msg}`));
  },

  /**
   * Info indicator.
   * @param {string} msg The message to be displayed
   */
  info: function info(msg) {
    console.log(chalk.cyan(`==! ${msg}`));
  },

  /**
   * Warning indicator.
   * @param {string} msg The message to be displayed
   */
  warn: function warn(msg) {
    console.log(chalk.red(`==x ${msg}`));
  },

  /**
   * End indicator.
   * @param {string} msg The message to be displayed
   */
  end: function end(msg) {
    console.log(chalk.green(`==# ${msg}`));
  },

};
