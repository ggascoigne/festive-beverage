exports.up = async function (knex) {
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

exports.down = async function (knex) {}
