const {Command, flags} = require('@oclif/command')
const shell = require('shelljs')
const inquirer = require('inquirer')

/**
 * Helper Function to execute commands synchronously with a completed callback.
 * @param {string} cmd The command to be ran.
 * @param {string} errMsg The possible error message to be displayed.
 * @return {Promise} Resolves when command is completed
 */
function runUpgradeCommand(cmd, errMsg) {
  return new Promise((resolve, reject) => {
    shell.exec(cmd, (code, stdout, stderr) => {
      if (code !== 0) {
        // shell.echo(warn(`Error ${errMsg}:\n${stderr}`))
        shell.echo(`Error ${errMsg}:\n${stderr}`)
        shell.exit(1)
        reject(`Error ${errMsg}:\n${stderr}`)
      }
      shell.echo(`Program output: ${stdout}`)
      resolve()
    })
  })
}

/**
 * Update yarn.
 */
async function brew() {
  // start('Updating yarn global packages')
  process.stdout.write('Test for log\n')

  // await runUpgradeCommand(
  //   'yarn global upgrade',
  //   'updating yarn packages'
  // )

  // end('Update yarn global packages complete')
}

/**
 * Update yarn.
 */
async function yarn() {
  // start('Updating yarn global packages')

  await runUpgradeCommand(
    'yarn global upgrade',
    'updating yarn packages'
  )

  // end('Update yarn global packages complete')
}

/**
 * Upgrade command to update system and it's dependencies
 *
 * @class UpgradeCommand
 * @extends {Command}
 */
class UpgradeCommand extends Command {
  async run() {
    const {flags} = this.parse(UpgradeCommand)
    this.log(`${JSON.stringify(flags, null, 2)}`)

    if (Object.keys(flags).length === 0) {
      let {all} = await inquirer.prompt([
        {
          name: 'all',
          message: 'No flags passed, would you like up update everything',
          type: 'confirm',
        },
      ])
      if (!all) {
        this.log('Doing nothing')
        this.exit()
      }
    }

    if (flags.yarn) yarn()
    if (flags.brew) brew()
  }
}

UpgradeCommand.description = `Upgrade system and dependencies
...
You can specify what you want to update or update all, see help for details
`

UpgradeCommand.flags = {
  'dot-files': flags.boolean({
    char: 'd',
    description: 'Sync dotfiles',
  }),
  node: flags.boolean({
    char: 'n',
    description: 'Upgrade node, nvm, and avn',
  }),
  brew: flags.boolean({
    char: 'b',
    description: 'Upgrade brew and installed packages',
  }),
  yarn: flags.boolean({
    char: 'y',
    description: 'Upgrade yarn globally installed packages',
  }),
}

module.exports = UpgradeCommand
