export async function up(knex) {
  return knex.raw(`
    comment on table knex_migrations is E'@omit';
  `)
}

// eslint-disable-next-line no-empty-function
export async function down(knex) {}
