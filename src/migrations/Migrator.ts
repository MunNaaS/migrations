import { join, extname } from 'path'
import * as Knex from 'knex'
import * as globby from 'globby'
import { sortBy, reject } from 'lodash'
import { DatabaseMigrationRepository as Repository } from './Interface/DatabaseMigrationRepository'
import { ConnectionResolver as Resolver } from './Interface/ConnectionResolver'
import { Migration } from './Interface/Migration'

export default class Migrator {
  protected _repository: Repository
  protected _resolver: Resolver
  protected _ext: string = '.ts'
  protected _connection?: string

  constructor (repository: Repository, resolver: Resolver) {
    this._resolver = resolver
    this._repository = repository
  }

  public get ext (): string {
    return this._ext
  }

  public set ext (v: string) {
    this._ext = v
  }

  public async run (directories: string[] = [], options: object = {}) {
    let files = await this.getMigrationFile(directories)
    let ran = await this._repository.getRan()
    let migrations = await this.pendingMigrations(files, ran)
    this.runPending(migrations, options)
  }

  public async getMigrationFile (directories: string[]): Promise<string[]> {
    let files: string[] = []
    for (const directory of directories) {
      files.concat(await globby(directory))
    }
    files = sortBy(files, (file: string) => {
      return this.getMigrationName(file)
    })
    return files
  }

  public getMigrationName (path: string) {
    return path.replace(this._ext, '')
  }

  public async runPending (migrations: string[], options: any) {
    let batch = await this._repository.getNextBatchNumber()
    let pretend = options.pretend || false
    let step = options.step || false

    migrations.forEach((path: string) => {
      this.runUp(path, batch, pretend)
      if (step) {
        batch++
      }
    })
  }

  public resolve (path: string): Migration {
    const Class = require(path)
    return new Class()
  }

  public resolveConnection (connection?: string): Knex {
    return this._resolver.connection(connection || this._connection)
  }

  protected runUp (path: string, batch: number, pretend: boolean) {
    let name = this.getMigrationName(path)
    let migration = this.resolve(name)

    if (pretend) {
      // return this.pretendToRun(migration, 'up')
    }
    this.runMigration(migration, 'up')
    this._repository.log(name, batch)
  }

  protected runMigration (migration: Migration, method: string) {
    let connection = this.resolveConnection(migration.connection)
    let callback = () => {
      if (typeof migration[method] === 'function') {
        migration[method](connection)
      }
    }
    migration.withinTransaction ? connection.transaction(callback) : callback()
  }

  protected async pendingMigrations (files: string[], ran: string[]): Promise<string[]> {
    return reject(files, (file) => {
      return ran.includes(this.getMigrationName(file))
    })
  }

}
