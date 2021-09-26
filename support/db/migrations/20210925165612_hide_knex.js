exports.up = async function (knex) {
  return knex.raw(`
    comment on table knex_migrations is E'@omit';
  `)
}

exports.down = async function (knex) {}
