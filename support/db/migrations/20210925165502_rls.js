// protect the user column from causing syntax errors
export const q = (name) => (name === 'user' ? '"user"' : name)

// no access if not logged in
// const anyUserUpdatePolicy = (table) => `
//   create policy ${table}_sel_policy on ${q(table)}
//     for select
//     using (current_user_id()::boolean);
//   create policy ${table}_mod_policy on ${q(table)}
//     using (current_user_id()::boolean);
//   `
//
// const adminUpdatePolicy = (table) => `
//   create policy ${table}_sel_policy on ${q(table)}
//     for select
//     using (current_user_id()::boolean);
//   create policy ${table}_mod_policy on ${q(table)}
//     using (current_user_is_admin());
//   `

// read only if not logged on
const anyUserUpdatePolicy = (table) => `
  create policy ${table}_sel_policy on ${q(table)}
    for select
    using (true);
  create policy ${table}_mod_policy on ${q(table)}
    using (current_user_id()::boolean);
  `

const adminUpdatePolicy = (table) => `
  create policy ${table}_sel_policy on ${q(table)}
    for select
    using (true);
  create policy ${table}_mod_policy on ${q(table)}
    using (current_user_is_admin());
  `

export const updateRls = async (knex, tables) => {
  await knex.raw(
    tables
      .map(
        (table) =>
          `
              drop policy if exists ${table.name}_sel_policy on ${q(table.name)};
              drop policy if exists ${table.name}_mod_policy on ${q(table.name)};
            `
      )
      .join('\n')
  )

  await knex.raw(
    tables.map((table) => (table.admin ? adminUpdatePolicy(table.name) : anyUserUpdatePolicy(table.name))).join('\n')
  )

  await knex.raw(tables.map((table) => `alter table ${q(table.name)} enable row level security;`).join('\n'))
}

export async function up(knex) {
  const user = process.env.DATABASE_USER
  const password = process.env.DATABASE_USER_PASSWORD ?? ''
  const tables = [
    { name: 'role', admin: true },
    { name: 'user', admin: false },
    { name: 'user_role', admin: true },
  ]

  const res = await knex.raw(`SELECT 1 FROM pg_roles WHERE rolname='${user}'`)
  if (res?.rows?.[0]?.['?column?'] !== 1) {
    // note that users are per database and not per schema
    await knex.raw(`drop role if exists ${user}`)
    await knex.raw(`CREATE ROLE ${user} WITH LOGIN PASSWORD '${password}' NOINHERIT;`)
  }
  await knex.raw(`grant usage on schema public to ${user};`)
  await knex.raw(`grant select, insert, update, delete on all tables in schema public to ${user};`)
  await knex.raw(`grant select, update, usage on all sequences in schema public to ${user};`)
  await knex.raw(`grant execute on all routines in schema public to ${user};`)

  await updateRls(knex, tables)
}

// eslint-disable-next-line no-empty-function
export async function down(knex) {}
