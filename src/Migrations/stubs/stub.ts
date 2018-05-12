export function up (knex) {
  return knex.schema.createTable('users', function (table) {
    table.increments()
    table.timestamps()
  })
}

export function down (knex) {
  return knex.schema.dropTableIfExists('users')
}
