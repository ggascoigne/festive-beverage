export async function up(knex) {
  // create a stored procedure that can be used to quickly drop all data - used for a fast cleanup in tests
  await knex.schema.raw(`
    CREATE OR REPLACE FUNCTION f_truncate_tables(_username TEXT)
      RETURNS VOID AS
      $func$
        BEGIN
           EXECUTE
          (SELECT 'TRUNCATE TABLE '
               || string_agg(format('%I.%I', schemaname, tablename), ', ')
               || ' CASCADE'
           FROM   pg_tables
           WHERE  tableowner = _username
           AND    schemaname = 'public'
           );
        END
        $func$ LANGUAGE plpgsql;`)

  await knex.raw(`
    create function current_user_id() returns integer as $$
      select nullif(current_setting('user.id', true), '')::integer;
    $$ language sql stable;
    create function current_user_is_admin() returns boolean as $$
      select nullif(current_setting('user.admin', true), '')::boolean;
    $$ language sql stable;
  `)
}

// eslint-disable-next-line no-empty-function
export async function down(knex) {}
