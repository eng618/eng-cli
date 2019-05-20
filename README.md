```
 ▄▄▄▄▄▄▄▄▄▄▄  ▄▄        ▄  ▄▄▄▄▄▄▄▄▄▄▄               ▄▄▄▄▄▄▄▄▄▄▄  ▄            ▄▄▄▄▄▄▄▄▄▄▄
▐░░░░░░░░░░░▌▐░░▌      ▐░▌▐░░░░░░░░░░░▌             ▐░░░░░░░░░░░▌▐░▌          ▐░░░░░░░░░░░▌
▐░█▀▀▀▀▀▀▀▀▀ ▐░▌░▌     ▐░▌▐░█▀▀▀▀▀▀▀▀▀              ▐░█▀▀▀▀▀▀▀▀▀ ▐░▌           ▀▀▀▀█░█▀▀▀▀
▐░▌          ▐░▌▐░▌    ▐░▌▐░▌                       ▐░▌          ▐░▌               ▐░▌
▐░█▄▄▄▄▄▄▄▄▄ ▐░▌ ▐░▌   ▐░▌▐░▌ ▄▄▄▄▄▄▄▄  ▄▄▄▄▄▄▄▄▄▄▄ ▐░▌          ▐░▌               ▐░▌
▐░░░░░░░░░░░▌▐░▌  ▐░▌  ▐░▌▐░▌▐░░░░░░░░▌▐░░░░░░░░░░░▌▐░▌          ▐░▌               ▐░▌
▐░█▀▀▀▀▀▀▀▀▀ ▐░▌   ▐░▌ ▐░▌▐░▌ ▀▀▀▀▀▀█░▌ ▀▀▀▀▀▀▀▀▀▀▀ ▐░▌          ▐░▌               ▐░▌
▐░▌          ▐░▌    ▐░▌▐░▌▐░▌       ▐░▌             ▐░▌          ▐░▌               ▐░▌
▐░█▄▄▄▄▄▄▄▄▄ ▐░▌     ▐░▐░▌▐░█▄▄▄▄▄▄▄█░▌             ▐░█▄▄▄▄▄▄▄▄▄ ▐░█▄▄▄▄▄▄▄▄▄  ▄▄▄▄█░█▄▄▄▄
▐░░░░░░░░░░░▌▐░▌      ▐░░▌▐░░░░░░░░░░░▌             ▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌
 ▀▀▀▀▀▀▀▀▀▀▀  ▀        ▀▀  ▀▀▀▀▀▀▀▀▀▀▀               ▀▀▀▀▀▀▀▀▀▀▀  ▀▀▀▀▀▀▀▀▀▀▀  ▀▀▀▀▀▀▀▀▀▀▀
```

---

# eng-cli

Personal package with shortcuts and cli helpers to help with my workflow.

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/eng-cli.svg)](https://npmjs.org/package/eng-cli)
[![Codecov](https://codecov.io/gh/ENG618/eng-cli/branch/master/graph/badge.svg)](https://codecov.io/gh/ENG618/eng-cli)
[![Downloads/week](https://img.shields.io/npm/dw/eng-cli.svg)](https://npmjs.org/package/eng-cli)
[![License](https://img.shields.io/npm/l/eng-cli.svg)](https://github.com/ENG618/eng-cli/blob/master/package.json)

<!-- toc -->

- [eng-cli](#eng-cli)
- [Install](#install)
- [Usage](#usage)
- [Commands](#commands)
  - [`eng hello`](#eng-hello)
  - [`eng help [COMMAND]`](#eng-help-command)
    <!-- tocstop -->

# Install

This package is intended to be installed globally. To install simply run:****

```shell
yarn global add eng-cli

# or

npm i -g eng-cil
```

# Usage

<!-- usage -->

```sh-session
$ npm install -g eng-cli
$ eng COMMAND
running command...
$ eng (-v|--version|version)
eng-cli/0.2.0 darwin-x64 node-v10.15.3
$ eng --help [COMMAND]
USAGE
  $ eng COMMAND
...
```

<!-- usagestop -->

# Commands

<!-- commands -->

- [eng-cli](#eng-cli)
- [Install](#install)
- [Usage](#usage)
- [Commands](#commands)
  - [`eng hello`](#eng-hello)
  - [`eng help [COMMAND]`](#eng-help-command)

## `eng hello`

Describe the command here

```
USAGE
  $ eng hello

OPTIONS
  -n, --name=name  name to print

DESCRIPTION
  ...
  Extra documentation goes here
```

_See code: [src/commands/hello.js](https://github.com/ENG618/eng-cli/blob/v0.2.0/src/commands/hello.js)_

## `eng help [COMMAND]`

display help for eng

```
USAGE
  $ eng help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.1.6/src/commands/help.ts)_

<!-- commandsstop -->

---

[Changelog](./CHANGELOG.md)
