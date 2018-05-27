import { Command, flags } from '@oclif/command'
import { snakeCase } from 'change-case'
import { utc } from 'moment'
import { resolve } from 'path'
import { plural } from 'pluralize'
import { MigrationCreator } from '../migrations/MigrationCreator'
import config from '../migrations/config/database'
import prompt from '../prompts/make'

export default class Make extends Command {
  static description = 'describe the command here'

  static examples = [
    `$ migrations make create_users_table --create users
Created Migration: ${ utc().format('YYYY_MM_DD_HHMMSS') }_create_users_table
`,
  ]

  static flags = {
    help: flags.help({ char: 'h' }),
    create: flags.string({
      description: 'The table to be created.',
      parse: (input) => plural(input),
    }),
    table: flags.string({
      description: 'The table to migrate.',
      parse: (input) => plural(input),
    }),
    path: flags.string({
      description: 'The location where the migration file should be created.',
    }),
    stub: flags.string({
      description: 'The location where the stub file.',
    }),
    transaction: flags.boolean({
      description: 'Enables, migration within a transaction.',
    }),
    force: flags.boolean({ char: 'f' }),
  }

  static args = [
    {
      name: 'name',
      required: true,
      description: 'The name of the migration.',
      parse: (input: string): string => snakeCase(input),
    },
  ]

  async run () {
    const { args, flags } = this.parse(Make)

    let { table, create, path, stub, transaction } = flags
    // let ans = await prompt
    const creator = new MigrationCreator(config.migrations)
    let migrationfile = await creator.create(args.name, create, table, path, stub, transaction)
    this.log(migrationfile)
  }

}
