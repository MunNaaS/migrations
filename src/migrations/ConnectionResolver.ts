import * as Knex from 'knex'
import { ConnectionResolver as Resolver } from './Interface/ConnectionResolver'
import { Connections } from './Interface/Connections'
export class ConnectionResolver implements Resolver {

  /**
   * All of the registered connections.
   *
   * @protected
   * @type {object}
   * @memberof ConnectionResolver
   */
  protected connections: Connections

  /**
   * The default connection name.
   *
   * @protected
   * @type {string}
   * @memberof ConnectionResolver
   */
  protected default?: string

  constructor (connections: Connections) {
    this.connections = connections
  }

  /**
   * Add a connection to the resolver.
   *
   * @param {string} name is a name of connection.
   * @param {object} connection is a object of connection.
   * @memberof ConnectionResolver
   */
  public addConnection (name: string, connection: Knex) {
    this.connections[name] = connection
  }

  /**
   * Check if a connection has been registered.
   *
   * @param {string} name is a name of connection.
   * @returns {boolean}
   * @memberof ConnectionResolver
   */
  public hasConnection (name: string): boolean {
    return !!this.connections[name]
  }

  /**
   * Get a database connection instance.
   *
   * @param {string} [name] is a name of connection.
   * @returns {object} is a object of connection.
   * @memberof ConnectionResolver
   */
  connection (name?: string): Knex {
    if (this.default === undefined) {
      throw new Error('Conection default is undefined.')
    }

    return this.connections[name || this.default]
  }

  /**
   * Get the default connection name.
   *
   * @returns {string} is a name of connection.
   * @memberof ConnectionResolver
   */
  getDefaultConnection (): string | undefined {
    return this.default
  }

  /**
   * Set the default connection name.
   *
   * @param {string} name is a name of connection.
   * @memberof ConnectionResolver
   */
  setDefaultConnection (name: string): void {
    this.default = name
  }
}
