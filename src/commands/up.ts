import { ConnectionResolver } from '../migrations/ConnectionResolver'
import { Connections } from '../migrations/Interface/Configuration'
import { Command, flags } from '@oclif/command'
import { resolve } from 'path'
import Migrator from '../migrations/Migrator'
import DatabaseMigrationRepository from '../migrations/DatabaseMigrationRepository'
import config from '../migrations/config/database'
import * as Knex from 'knex'

export default class Up extends Command {
  static description = 'describe the command here'

  static flags = {
    help: flags.help({ char: 'h' }),
    // flag with a value (-n, --name=VALUE)
    path: flags.string({
      description: 'The path to the migrations files to be executed.',
      parse: (input) => resolve(input),
    }),
    // flag with no value (-f, --force)
    force: flags.boolean({ char: 'f' }),
  }

  static args = [{ name: 'file' }]

  async run () {
    const { args, flags } = this.parse(Up)
    let connections: Connections = config.connections
    const resolver = new ConnectionResolver(connections)
    resolver.setDefaultConnection(config.default)
    const repository = new DatabaseMigrationRepository(resolver, config.migrations.table)
    const migrator = new Migrator(repository, resolver)

    let directories = [flags.path || config.migrations.directory]
    try {
      await migrator.run(directories)
    } catch (error) {
      this.error(error)
    }
  }
}
