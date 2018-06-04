import * as Knex from 'knex'
import { ConnectionResolver as Resolver } from './Interface/ConnectionResolver'
// import { Connections } from './Interface/Connections'
import {
  Connections,
  ConnectionConfig,
  MariaSqlConnectionConfig,
  MySqlConnectionConfig,
  MsSqlConnectionConfig,
  Sqlite3ConnectionConfig,
  SocketConnectionConfig,
 } from './Interface/Configuration'
export class ConnectionResolver implements Resolver {

  /**
   * All of the registered connections.
   *
   * @protected
   * @type {object}
   * @memberof ConnectionResolver
   */
  protected _connections: Connections

  /**
   * The default connection name.
   *
   * @protected
   * @type {string}
   * @memberof ConnectionResolver
   */
  protected _default?: string

  constructor (connections: Connections) {
    this._connections = connections
  }

  public set connections (connections: Connections) {
    this._connections = Object.assign(this._connections, connections)
  }

  /**
   * Add a connection to the resolver.
   *
   * @param {string} name is a name of connection.
   * @param {object} connection is a object of connection.
   * @memberof ConnectionResolver
   */
  public addConnection (name: string, connection: Connections) {
    this._connections[name] = connection
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
  public connection (name?: string): Knex {
    if (name === undefined) {
      name = this._default
    }

    if (name === undefined) {
      throw new Error('Conection default is undefined.')
    }
    // console.log(name)
    // console.log(this._connections[name])
    let knexfile = this.parseConfig(this._connections[name])
    return Knex(knexfile)
  }

  /**
   * Get the default connection name.
   *
   * @returns {string} is a name of connection.
   * @memberof ConnectionResolver
   */
  public getDefaultConnection (): string | undefined {
    return this._default
  }

  /**
   * Set the default connection name.
   *
   * @param {string} name is a name of connection.
   * @memberof ConnectionResolver
   */
  public setDefaultConnection (name: string): void {
    this._default = name
  }

  public parseConfig (connection: ConnectionConfig | MariaSqlConnectionConfig | MySqlConnectionConfig | MsSqlConnectionConfig | Sqlite3ConnectionConfig | SocketConnectionConfig): Knex.Config {
    let client = connection.driver
    let connect: Knex.ConnectionConfig | Knex.MariaSqlConnectionConfig | Knex.MySqlConnectionConfig | Knex.MsSqlConnectionConfig | Knex.Sqlite3ConnectionConfig | Knex.SocketConnectionConfig = connection

    return {
      client: client,
      connection: connect,
      useNullAsDefault: true,
    }
  }
}
