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
$ npm install -g @munnaas/migrations
$ migrations COMMAND
running command...
$ migrations (-v|--version|version)
@munnaas/migrations/0.0.0 linux-x64 node-v10.1.0
$ migrations --help [COMMAND]
USAGE
  $ migrations COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`migrations help [COMMAND]`](#migrations-help-command)
* [`migrations make NAME`](#migrations-make-name)
* [`migrations up [FILE]`](#migrations-up-file)

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

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v1.2.11/src/commands/help.ts)_

## `migrations make NAME`

describe the command here

```
USAGE
  $ migrations make NAME

ARGUMENTS
  NAME  The name of the migration.

OPTIONS
  -f, --force
  -h, --help       show CLI help
  --create=create  The table to be created.
  --path=path      The location where the migration file should be created.
  --stub=stub      The location where the stub file.
  --table=table    The table to migrate.
  --transaction    Enables, migration within a transaction.

EXAMPLE
  $ migrations make create_users_table --create users
  Created Migration: 2018_05_26_190517_create_users_table
```

_See code: [src/commands/make.ts](https://github.com/MunNaaS/migrations/blob/v0.0.0/src/commands/make.ts)_

## `migrations up [FILE]`

describe the command here

```
USAGE
  $ migrations up [FILE]

OPTIONS
  -f, --force
  -h, --help   show CLI help
  --path=path  The path to the migrations files to be executed.
```

_See code: [src/commands/up.ts](https://github.com/MunNaaS/migrations/blob/v0.0.0/src/commands/up.ts)_
<!-- commandsstop -->
