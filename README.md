migrations
==========



[![Version](https://img.shields.io/npm/v/migrations.svg)](https://npmjs.org/package/migrations)
[![CircleCI](https://circleci.com/gh/MunNaaS/migrations/tree/master.svg?style=shield)](https://circleci.com/gh/MunNaaS/migrations/tree/master)
[![Appveyor CI](https://ci.appveyor.com/api/projects/status/github/MunNaaS/migrations?branch=master&svg=true)](https://ci.appveyor.com/project/MunNaaS/migrations/branch/master)
[![Codecov](https://codecov.io/gh/MunNaaS/migrations/branch/master/graph/badge.svg)](https://codecov.io/gh/MunNaaS/migrations)
[![Downloads/week](https://img.shields.io/npm/dw/migrations.svg)](https://npmjs.org/package/migrations)
[![License](https://img.shields.io/npm/l/migrations.svg)](https://github.com/MunNaaS/migrations/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g migrations
$ migrations COMMAND
running command...
$ migrations (-v|--version|version)
migrations/1.0.0 linux-x64 node-v10.1.0
$ migrations --help [COMMAND]
USAGE
  $ migrations COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`migrations hello [FILE]`](#migrations-hello-file)
* [`migrations help [COMMAND]`](#migrations-help-command)

## `migrations hello [FILE]`

describe the command here

```
USAGE
  $ migrations hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ migrations hello
  hello world from ./src/hello.ts!
```

_See code: [src/commands/hello.ts](https://github.com/MunNaaS/migrations/blob/v1.0.0/src/commands/hello.ts)_

## `migrations help [COMMAND]`

display help for migrations

```
USAGE
  $ migrations help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v1.2.10/src/commands/help.ts)_
<!-- commandsstop -->
