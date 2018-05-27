import * as Knex from 'knex'
export interface Migration {
  [key: string]: any
  connection: string | undefined
  withinTransaction: boolean
  up (): Knex
  down (): Knex
}
