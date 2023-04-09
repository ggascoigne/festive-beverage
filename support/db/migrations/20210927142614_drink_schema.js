/* eslint-disable no-empty-function */
const { updateRls } = require('./20210925165502_rls')

exports.up = async function (knex) {
  await knex.schema
    .createTable('recipe', (table) => {
      table.increments().primary()
      table.string('name', 128).notNullable()
      table.text('description')
      table.text('instructions')
      table.text('ingredient_text').notNullable()
      table.string('glass', 65)
      table.string('garnish', 65)
      table.string('source', 128)
    })
    .createTable('ingredient', (table) => {
      table.increments().primary()
      table.string('name', 128).notNullable()
      table.string('tags', 128)
      table.integer('sort').defaultTo(0)
      table.text('description')
    })
    .createTable('unit', (table) => {
      table.increments().primary()
      table.string('name', 32).notNullable()
      table.decimal('as_ml', 10, 6)
      table.integer('sort').defaultTo(0)
    })
    .createTable('recipe_ingredient', (table) => {
      table.increments().primary()
      table.integer('recipe_id').notNullable().references('recipe.id').unsigned().index()
      table.integer('ingredient_id').notNullable().references('ingredient.id').unsigned().index()
      table.integer('unit_id').notNullable().references('unit.id').unsigned().index()
      table.decimal('amount', 20, 8)
      table.string('modifier', 32)
    })

  await knex.raw(`ALTER TABLE recipe ADD COLUMN ts tsvector 
      GENERATED ALWAYS AS (
        setweight(to_tsvector('english', name), 'A') ||
        setweight(to_tsvector('english', ingredient_text), 'B') ||
        setweight(to_tsvector('english', coalesce(description,'')), 'C') ||
        setweight(to_tsvector('english', coalesce(instructions,'')), 'C') ||
        setweight(to_tsvector('english', coalesce(glass,'')), 'D')
      ) STORED`)

  await knex.raw(`CREATE INDEX ts_idx ON recipe USING GIN (ts)`)

  const user = process.env.DATABASE_USER
  await knex.raw(`grant usage on schema public to ${user};`)
  await knex.raw(`grant select, insert, update, delete on all tables in schema public to ${user};`)
  await knex.raw(`grant select, update, usage on all sequences in schema public to ${user};`)
  await knex.raw(`grant execute on all routines in schema public to ${user};`)

  const tables = [
    { name: 'recipe', admin: false },
    { name: 'ingredient', admin: false },
    { name: 'unit', admin: false },
    { name: 'recipe_ingredient', admin: false },
  ]

  await updateRls(knex, tables)

  // 1oz = 29.5735296ml actually
  await knex.raw(`
    insert into unit (name,  as_ml, sort)
    values ('oz',  29.5735, -1),
           ('tbsp', 14.78675, 0),
           ('tsp', 4.9289, 0),
           ('rinse', 1, 0),
           ('dash', 0.3125, 0),
           ('drop', 0.026, 0),
           ('pinch', 1, 0),
           ('ml', 1, 0);
    `)
}

exports.down = async function (knex) {}
