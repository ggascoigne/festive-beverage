/**
 * @param {import('knex').Knex} knex
 * @returns {Promise<void>}
 */
export async function up(knex) {
  await knex.schema
    .createTable('user', (table) => {
      table.increments().primary()
      table.string('email', 64).notNullable().unique()
    })
    .createTable('role', (table) => {
      table.increments().primary()
      table.string('authority', 40).notNullable().unique()
    })
    .createTable('user_role', (table) => {
      table.integer('role_id').notNullable().references('role.id').unsigned().index()
      table.integer('user_id').notNullable().references('user.id').unsigned().index().onDelete('cascade')
      table.primary([`role_id`, `user_id`])
    })

  await knex.raw(`
      insert into role (authority)
      values ('ROLE_USER'),
             ('ROLE_ADMIN');
  `)
}

/**
 * @param {import('knex').Knex} knex
 * @returns {Promise<void>}
 */
// eslint-disable-next-line no-empty-function
export async function down(knex) {}
