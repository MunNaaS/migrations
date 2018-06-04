import { resolve, join } from 'path'
export default {

  default: process.env.DB_CONNECTION || 'sqlite',

  connections: {
    sqlite: {
      driver: 'sqlite3',
      filename: process.env.DB_DATABASE || 'database.sqlite',
    },
    mysql: {
      driver: 'mysql',
      host: process.env.DB_HOST || '127.0.0.1',
      port: process.env.DB_PORT || '3306',
      database: process.env.DB_DATABASE || 'devlopment',
      user: process.env.DB_USERNAME || 'devloper',
      password: process.env.DB_PASSWORD || 'secret',
      charset: 'utf8mb4',
    },
    postgresql: {
      driver: 'pg',
      host: process.env.DB_HOST || '127.0.0.1',
      port: process.env.DB_PORT || '5432',
      database: process.env.DB_DATABASE || 'devlopment',
      user: process.env.DB_USERNAME || 'devloper',
      password: process.env.DB_PASSWORD || 'secret',
      charset: 'utf8',
    },
    mssql: {
      driver: 'mssql',
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || '1433',
      database: process.env.DB_DATABASE || 'devlopment',
      user: process.env.DB_USERNAME || 'devloper',
      password: process.env.DB_PASSWORD || 'secret',
      charset: 'utf8',
    },
  },

  useNullAsDefault: true,

  migrations: {
    table: 'knex_migrations',
    extension: 'ts',
    directory: join(process.cwd(), 'database/migrations'),
    stub: resolve(process.cwd(), join(__dirname, '../../../stubs/migrations')),
    withinTransaction: true,
  },
  seeds: {
    directory: join(process.cwd(), './database/seeds'),
  },
}
