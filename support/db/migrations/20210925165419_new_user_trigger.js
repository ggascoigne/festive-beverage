/**
 * @param {import('knex').Knex} knex
 * @returns {Promise<void>}
 */
export async function up(knex) {
  return knex.raw(`
      CREATE OR REPLACE FUNCTION add_default_role()
        RETURNS TRIGGER 
        LANGUAGE PLPGSQL  
        AS
      $$
      BEGIN
        insert into user_role (role_id, user_id) (select id, NEW.id from "role" where authority = 'ROLE_USER' );
        RETURN NEW;
      END;
      $$;
      
      create trigger default_role after insert on "user" for each row execute procedure add_default_role();
    `)
}

/**
 * @param {import('knex').Knex} _knex
 * @returns {Promise<void>}
 */
// eslint-disable-next-line no-empty-function
export async function down(_knex) {}
