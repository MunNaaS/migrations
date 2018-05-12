import { MigrationConfig as Config } from './Configuration'

export default abstract class Migration {
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
  protected _connection: string = ''

  /**
   * Get the migration connection name.
   *
   * @return string
   */
  public get connection (): string {
    return this._connection
  }

  public get config (): Config {
    return {
      transaction: this.withinTransaction,
    }
  }

}
