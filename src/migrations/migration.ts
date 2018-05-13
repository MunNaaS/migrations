import { MigrationConfig as Config } from './configuration'

export abstract class Migration {
  /**
   * Enables, if supported, wrapping the migration within a transaction.
   *
   * @var bool
   */
  public withinTransaction: boolean = true

  /**
   * The name of the database connection to use.
   *
   * @var string
   */
  protected _connection: string | undefined

  /**
   * Get the migration connection name.
   *
   * @return string
   */
  public get connection (): string | undefined {
    return this._connection
  }

  public get config (): object {
    return {
      transaction: this.withinTransaction,
    }
  }

}
