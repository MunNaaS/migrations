import * as Knex from 'knex'
export interface ConnectionResolver {

  /**
   * Get a database connection instance.
   *
   * @param {string} [name] is a name of connection.
   * @returns {object} is a object of connection.
   * @memberof ConnectionResolver
   */
  connection (name?: string): Knex

  /**
   * Get the default connection name.
   *
   * @returns {string} is a name of connection.
   * @memberof ConnectionResolver
   */
  getDefaultConnection (): string | undefined

  /**
   * Set the default connection name.
   *
   * @param {string} name is a name of connection.
   * @memberof ConnectionResolver
   */
  setDefaultConnection (name: string): void
}
