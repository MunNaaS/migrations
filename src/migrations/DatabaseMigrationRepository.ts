import * as Knex from 'knex'
import { mapValues, mapKeys, Dictionary } from 'lodash'
import { DatabaseMigrationRepository as Repository } from './Interface/DatabaseMigrationRepository'
import { ConnectionResolver as Resolver } from './Interface/ConnectionResolver'

export default class DatabaseMigrationRepository implements Repository {

  /**
   * The database connection resolver instance.
   *
   * @protected
   * @type {Resolver}
   * @memberof DatabaseMigrationRepository
   */
  protected _resolver: Resolver

  /**
   * The name of the migration table.
   *
   * @protected
   * @type {string}
   * @memberof DatabaseMigrationRepository
   */
  protected _table: string

  /**
   * The name of the database connection to use.
   *
   * @protected
   * @type {string}
   * @memberof DatabaseMigrationRepository
   */
  protected _connection?: string

  /**
   * Creates an instance of DatabaseMigrationRepository.
   * @param {Resolver} resolver is a database connection resolver instance.
   * @param {string} table is a name of the migration table.
   * @memberof DatabaseMigrationRepository
   */
  constructor (resolver: Resolver, table: string) {
    this._resolver = resolver
    this._table = table
  }

  /**
   * Getter of property resolver.
   *
   * @readonly
   * @type {Resolver}
   * @memberof DatabaseMigrationRepository
   */
  get resolver (): Resolver {
    return this._resolver
  }

  /**
   * Resolve the database connection instance.
   *
   * @returns {Knex} is a connection instance.
   * @memberof DatabaseMigrationRepository
   */
  public getConnection (): Knex {
    return this.resolver.connection(this._connection)
  }

  /**
   * Get the completed migrations.
   *
   * @returns {Promise<string[]>} list of migtation name.
   * @memberof DatabaseMigrationRepository
   */
  public async getRan (): Promise<string[]> {
    let migrations = await this.table()
      .orderBy('batch', 'asc')
      .orderBy('migration', 'asc')
      .pluck('migration')
    return migrations
  }

  /**
   * Get list of migrations.
   *
   * @param {number} steps is step of rollback
   * @returns {Promise<any[]>} list of migrations to rollback.
   * @memberof DatabaseMigrationRepository
   */
  public async getMigrations (steps: number): Promise<any[]> {
    let migrations = await this.table().where('batch', '>=', '1')
      .orderBy('batch', 'desc')
      .orderBy('migration', 'desc')
      .limit(steps)
    return migrations
  }

  /**
   * Get the last migration batch.
   *
   * @returns {Promise<any[]>} is a list of last migrations batch.
   * @memberof DatabaseMigrationRepository
   */
  public async getLast (): Promise<any[]> {
    let last = await this.getLastBatchNumber()
    let migrations = await this.table().where('batch', last)
      .orderBy('migration', 'desc')
    return migrations
  }

  /**
   * Get the completed migrations with their batch numbers.
   *
   * @returns {Promise<any[]>} is a list of migrations.
   * @memberof DatabaseMigrationRepository
   */
  public async getMigrationBatches (): Promise<any> {
    let migrations = await this.table()
      .orderBy('batch', 'asc')
      .orderBy('migration', 'asc')
    return mapValues(mapKeys(migrations, (item, index) => item['migration']), 'batch')
  }

  /**
   * Log that a migration was run.
   *
   * @param {string} file is a name of migration file.
   * @param {number} batch is a batch number of this migration.
   * @memberof DatabaseMigrationRepository
   */
  public async log (file: string, batch: number): Promise<void> {
    await this.table().insert({
      migration: file,
      batch: batch,
    })
  }

  /**
   * Remove a migration from the log.
   *
   * @param {any} migration is a object of migration.
   * @memberof DatabaseMigrationRepository
   */
  public async delete (migration: any): Promise<void> {
    await this.table().where('migration', migration.migration).delete()
  }

  /**
   * Get the next migration batch number.
   *
   * @returns {Promise<number>} is a next migration batch number.
   * @memberof DatabaseMigrationRepository
   */
  public async getNextBatchNumber (): Promise<number> {
    let last = await this.getLastBatchNumber()
    return last + 1
  }

  /**
   * Get the last migration batch number.
   *
   * @returns {Promise<number>}
   * @memberof DatabaseMigrationRepository
   */
  public async getLastBatchNumber (): Promise<number> {
    let batch = await this.table().max('batch as last')
    return Number(batch[0]['last'])
  }

  /**
   * Create the migration repository data store.
   *
   * @memberof DatabaseMigrationRepository
   */
  public async createRepository (): Promise<void> {
    let r = await this.getConnection()
    .schema.createTableIfNotExists(this._table, (table) => {
      // The migrations table is responsible for keeping track of which of the
      // migrations have actually run for the application. We'll create the
      // table to hold the migration file's path as well as the batch ID.
      table.increments('id')
      table.string('migration')
      table.integer('batch')
    })
  }

  /**
   * Determine if the migration repository exists.
   *
   * @returns {Promise<boolean>} has a migrations table or not.
   * @memberof DatabaseMigrationRepository
   */
  public async repositoryExists (): Promise<boolean> {
    try {
      return this.getConnection().schema.hasTable(this._table)
    } catch (error) {
      throw error
    }
  }

  /**
   * Set the information source to gather data.
   *
   * @param {string} name is a name of connection
   * @memberof DatabaseMigrationRepository
   */
  public setSource (name: string): void {
    this._connection = name
  }

  protected table () {
    return this.getConnection().table(this._table)
  }

}
