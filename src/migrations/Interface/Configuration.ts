import {
  ConnectionConfig as KnexConnectionConfig,
  MariaSqlConnectionConfig as KnexMariaSqlConnectionConfig,
  MySqlConnectionConfig as KnexMySqlConnectionConfig,
  MsSqlConnectionConfig as KnexMsSqlConnectionConfig,
  Sqlite3ConnectionConfig as KnexSqlite3ConnectionConfig,
  SocketConnectionConfig as KnexSocketConnectionConfig,
} from 'knex'
export interface MigrationConfig {
  table?: string
  extension?: string
  directory?: string
  stub?: string
  withinTransaction?: boolean
}

export interface SeedConfig {
  directory?: string
  stub?: string
}

export interface ConnectionConfig extends KnexConnectionConfig {
  driver?: string
  username?: string
}
export interface MariaSqlConnectionConfig extends KnexMariaSqlConnectionConfig {
  driver?: string
}
export interface MySqlConnectionConfig extends KnexMySqlConnectionConfig {
  driver?: string
}
export interface MsSqlConnectionConfig extends KnexMsSqlConnectionConfig {
  driver?: string
}
export interface Sqlite3ConnectionConfig extends KnexSqlite3ConnectionConfig {
  driver?: string
}
export interface SocketConnectionConfig extends KnexSocketConnectionConfig {
  driver?: string
}

export interface Connections {
  [key: string]: ConnectionConfig | MariaSqlConnectionConfig | MySqlConnectionConfig | MsSqlConnectionConfig | Sqlite3ConnectionConfig | SocketConnectionConfig
}

export interface DatabaseConfig {
  default?: string
  connections?: Connections
  useNullAsDefault?: boolean
  migrations?: MigrationConfig
  seeds?: SeedConfig
}
