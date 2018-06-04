import { join, extname, basename } from 'path'
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
    let exists = await this._repository.repositoryExists()

    if (!exists) {
      await this._repository.createRepository()
    }

    let ran = await this._repository.getRan()
    let migrations = await this.pendingMigrations(files, ran)
    this.runPending(migrations, options)
  }

  public async getMigrationFile (directories: string[]): Promise<string[]> {
    let files: string[] = []
    for (const directory of directories) {
      files = files.concat(await globby(directory + '/*_*' + this._ext))
    }
    files = sortBy(files, (file: string) => {
      return this.getMigrationName(file)
    })
    return files
  }

  public getMigrationName (path: string) {
    return basename(path, this._ext)
  }

  public async runPending (migrations: string[], options: any) {
    let batch = await this._repository.getNextBatchNumber()
    let pretend = options.pretend || false
    let step = options.step || false

    for (const path of migrations) {
      await this.runUp(path, batch, pretend)
      if (step) {
        batch++
      }
    }
  }

  public async resolve (path: string): Promise<Migration> {
    const Class = await import(path)
    return new Class.default()
  }

  public async resolveConnection (connection?: string): Promise<Knex> {
    return this._resolver.connection(connection || this._connection)
  }

  protected async runUp (path: string, batch: number, pretend: boolean) {
    let name = this.getMigrationName(path)
    let migration = await this.resolve(path.replace(this._ext, ''))
    if (pretend) {
      // return this.pretendToRun(migration, 'up')
    }
    this.runMigration(migration, 'up').then(() => {
      this._repository.log(name, batch)
    }).catch((error) => {
      throw error
    })
  }

  protected async runMigration (migration: Migration, method: string) {
    let connection = await this.resolveConnection(migration.connection)

    migration.withinTransaction ||
    true ? connection.transaction(migration[method]) : migration[method](connection)
  }

  protected async pendingMigrations (files: string[], ran: string[]): Promise<string[]> {
    return reject(files, (file) => {
      return ran.includes(this.getMigrationName(file))
    })
  }

}
