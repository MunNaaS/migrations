import { Command, flags } from '@oclif/command'
import * as moment from 'moment'
import { snakeCase } from 'change-case'

export default class Make extends Command {
  static description = 'describe the command here'

  static examples = [
    `$ migrations make create_users_table --create users
Created Migration: ${ moment().utc().format('YYYY_MM_DD_HHMMSS') }_create_users_table
`,
  ]

  static flags = {
    help: flags.help({ char: 'h' }),
    create: flags.string({ description: 'The table to be created.' }),
    table: flags.string({ description: 'The table to migrate.' }),
    path: flags.string({ description: 'The location where the migration file should be created.' }),
    stub: flags.string({ description: 'The location where the stub file.' }),
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

  private filename?: string
  async run () {
    const { args, flags } = this.parse(Make)

    this.setFileName(args.name)
    if (this.filename !== undefined) {
      this.log(`Created Migration: ${ this.filename }`)
    }
  }

  private setFileName (name: string) {
    this.filename = `${ moment().utc().format('YYYY_MM_DD_HHMMSS') }_${name}`
  }
}
