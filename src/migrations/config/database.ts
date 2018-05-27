import { resolve, join } from 'path'
export default {

  default: process.env.DB_CONNECTION || 'sqlite',

  connections: {
    sqlite: {
      client: 'sqlite3',
      database: process.env.DB_DATABASE || 'database.db',
      useNullAsDefault: true,
      prefix: '',
    },
    mysql: {
      client: 'mysql',
      host: process.env.DB_HOST || '127.0.0.1',
      port: process.env.DB_PORT || '3306',
      database: process.env.DB_DATABASE || 'devlopment',
      username: process.env.DB_USERNAME || 'devloper',
      password: process.env.DB_PASSWORD || 'secret',
      charset: 'utf8mb4',
      collation: 'utf8mb4_unicode_ci',
      prefix: '',
    },
    postgresql: {
      client: 'pg',
      host: process.env.DB_HOST || '127.0.0.1',
      port: process.env.DB_PORT || '5432',
      database: process.env.DB_DATABASE || 'devlopment',
      username: process.env.DB_USERNAME || 'devloper',
      password: process.env.DB_PASSWORD || 'secret',
      charset: 'utf8',
      prefix: '',
      schema: '',
    },
    mssql: {
      client: 'mssql',
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || '1433',
      database: process.env.DB_DATABASE || 'devlopment',
      username: process.env.DB_USERNAME || 'devloper',
      password: process.env.DB_PASSWORD || 'secret',
      charset: 'utf8',
      prefix: '',
    },
  },

  migrations: {
    table: 'knex_migrations',
    extension: 'ts',
    directory: join(process.cwd(), 'database/migrations'),
    stub: resolve(process.cwd(), join(__dirname, '../../../stubs/migrations')),
    withinTransaction: true,
  },
  seeds: {
    directory: join(process.cwd(), './database/seeds'),
    stub: '',
  },
}
