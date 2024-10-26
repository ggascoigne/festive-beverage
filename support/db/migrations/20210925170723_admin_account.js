/**
 * @param {import('knex').Knex} knex
 * @returns {Promise<void>}
 */
export async function up(knex) {
  const user = process.env.DEFAULT_ADMIN_ACCOUNT

  const res = await knex.raw(`
      insert into "user" (email)
      values ('${user}')
      returning *;
  `)
  const userId = res?.rows?.[0]?.id
  await knex.raw(
    `insert into user_role (role_id, user_id) (select id, ${userId} from "role" where authority = 'ROLE_ADMIN' );`
  )
}

/**
 * @param {import('knex').Knex} _knex
 * @returns {Promise<void>}
 */
// eslint-disable-next-line no-empty-function
export async function down(_knex) {}
