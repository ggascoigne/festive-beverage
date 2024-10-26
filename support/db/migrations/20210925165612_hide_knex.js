/**
 * @param {import('knex').Knex} knex
 * @returns {Promise<void>}
 */
export async function up(knex) {
  return knex.raw(`
    comment on table knex_migrations is E'@omit';
  `)
}

/**
 * @param {import('knex').Knex} _knex
 * @returns {Promise<void>}
 */
// eslint-disable-next-line no-empty-function
export async function down(_knex) {}
