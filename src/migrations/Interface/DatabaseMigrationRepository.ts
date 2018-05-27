export interface DatabaseMigrationRepository {
  /**
   * Get the completed migrations.
   *
   * @returns {Promise<string[]>} list of migtation name.
   * @memberof DatabaseMigrationRepository
   */
  getRan (): Promise<string[]>

  /**
   * Get list of migrations.
   *
   * @param {number} steps is step of rollback
   * @returns {Promise<any[]>} list of migrations to rollback.
   * @memberof DatabaseMigrationRepository
   */
  getMigrations (steps: number): Promise<any[]>

  /**
   * Get the last migration batch.
   *
   * @returns {Promise<any[]>} is a list of last migrations batch.
   * @memberof DatabaseMigrationRepository
   */
  getLast (): Promise<any[]>

  /**
   * Get the completed migrations with their batch numbers.
   *
   * @returns {Promise<any[]>} is a list of migrations.
   * @memberof DatabaseMigrationRepository
   */
  getMigrationBatches (): Promise<any[]>

  /**
   * Log that a migration was run.
   *
   * @param {string} file is a name of migration file.
   * @param {number} batch is a batch number of this migration.
   * @memberof DatabaseMigrationRepository
   */
  log (file: string, batch: number): void

  /**
   * Remove a migration from the log.
   *
   * @param {object} migration is a object of migration.
   * @memberof DatabaseMigrationRepository
   */
  delete (migration: object): void

  /**
   * Get the next migration batch number.
   *
   * @returns {Promise<number>} is a next migration batch number.
   * @memberof DatabaseMigrationRepository
   */
  getNextBatchNumber (): Promise<number>

  /**
   * Create the migration repository data store.
   *
   * @memberof DatabaseMigrationRepository
   */
  createRepository (): void

  /**
   * Determine if the migration repository exists.
   *
   * @returns {Promise<boolean>} has a migrations table or not.
   * @memberof DatabaseMigrationRepository
   */
  repositoryExists (): Promise<boolean>

  /**
   * Set the information source to gather data.
   *
   * @param {string} name is a name of connection
   * @memberof DatabaseMigrationRepository
   */
  setSource (name: string): void
}
