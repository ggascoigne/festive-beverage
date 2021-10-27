import { Command } from '@oclif/command'
import Fraction from 'fraction.js'
import { PoolClient } from 'pg'
import { WorkSheet, readFile, utils } from 'xlsx'

import { PoolType, getPool } from '../config'

const ingredients = { s: 2, e: 142 }
const presentation = { s: ingredients.e + 1, e: 156 }

const isIngredient = (r: number) => r >= ingredients.s && r <= ingredients.e
const isPresentation = (r: number) => r >= presentation.s && r <= presentation.e

type IngredientInfo = {
  name: string
  quantity: string
  tags?: string
}

type Drink = {
  name: string
  source?: string
  ingredients: Record<string, IngredientInfo>
  presentation: Record<string, string>
  ingredientText: string
} & Record<string, string>

type Quantity = {
  amount?: number
  unit?: string
  modifier?: string
}

const query = async (client: PoolClient, query: string) => {
  console.log(`query = ${JSON.stringify(query?.replace(/\s+/g, ' '), null, 2)}`)
  return client.query(query)
}

const esc = (q: string) => q?.replace(/'/g, "''")

const q = (s: string | null | undefined) => (s ? `'${esc(s)}'` : null)

const ingredientCache: Record<string, number> = {}

const getIngredient = async (client: PoolClient, ingredient: IngredientInfo) => {
  if (ingredientCache[ingredient.name]) {
    return ingredientCache[ingredient.name]
  }
  const id = await (async () => {
    const lookup = await query(client, `select id from ingredient i where i.name = '${esc(ingredient.name)}'`)
    if (lookup?.rows?.length) {
      return lookup.rows[0]?.id
    }
    const insert = await query(
      client,
      `insert into ingredient (name, tags) values ('${esc(ingredient.name)}', ${q(ingredient.tags)}) returning *`
    )
    return insert?.rows?.[0]?.id
  })()
  ingredientCache[ingredient.name] = id
  return id
}

const unitCache: Record<string, number> = {}

const getUnit = async (client: PoolClient, unit: string) => {
  if (unitCache[unit]) {
    return unitCache[unit]
  }
  const id = await (async () => {
    const lookup = await query(client, `select id from unit i where i.name = '${unit}'`)
    if (lookup?.rows?.length) {
      return lookup.rows[0]?.id
    }
    const insert = await query(client, `insert into unit (name, as_ml, sort) values ('${unit}', 0, 0) returning *`)
    return insert?.rows?.[0]?.id
  })()
  unitCache[unit] = id
  return id
}

const parseQuantity = (s: string): Quantity | undefined => {
  const q: Record<string, string> = {
    oz: 'oz',
    tbsp: 'tbsp',
    tsp: 'tsp',
    bsp: 'bsp',
    dashes: 'dash',
    dash: 'dash',
    drops: 'drop',
    drop: 'drop',
    rinse: 'rinse',
    pinch: 'pinch',
    whole: 'whole',
    slice: 'slice',
    slices: 'slice',
    wedge: 'wedge',
    wedges: 'wedge',
    sprig: 'sprig',
    leaf: 'leaf',
    leaves: 'leaf',
    quartered: 'quarter',
    quarters: 'quarter',
    quarter: 'quarter',
    grated: 'grated',
  }

  switch (s) {
    case '1 egg white':
    case '1 whole egg':
      return {
        amount: 1,
        unit: 'whole',
      }
    case 'lemon twist (not garnish)':
      return undefined
  }

  const re = `(\\d+\\s+\\d+/\\d+|\\d+/\\d+|\\d+)?\\s*(${Object.keys(q).join('|')})\\s*(.*)`
  const amount = new RegExp(re).exec(s)
  if (!amount) {
    throw new Error(`failed to parse ${s}`)
  }
  return {
    amount: new Fraction(amount[1]).valueOf(),
    unit: q[amount[2]],
    modifier: amount[3],
  }
}

const create = async (client: PoolClient, drink: Drink) => {
  const insert = await query(
    client,
    `
        insert into recipe (name,instructions,glass,garnish, ingredient_text, source) 
        values (${q(drink.name)},${q(drink.presentation?.Instructions)},${q(drink.presentation?.Glass)},${q(
      drink.presentation?.Garnish
    )},${q(drink.ingredientText)},${q(drink.source ?? null)}
    ) 
        returning *`
  )
  const recipe_id = insert?.rows?.[0]?.id

  console.log(drink)
  //  const result = await query( client,query)
  for (const ingredient in drink.ingredients) {
    const ingredientInfo = drink.ingredients[ingredient]
    const ingredient_id = await getIngredient(client, ingredientInfo)
    const q = parseQuantity(ingredientInfo.quantity)
    const unit_id = q?.unit ? await getUnit(client, q.unit) : undefined

    if (q) {
      const insertIngredient = await query(
        client,
        `
            insert into recipe_ingredient (recipe_id, ingredient_id, unit_id, amount, modifier)
            values (${recipe_id}, ${ingredient_id}, ${unit_id || null}, ${q?.amount ?? null}, '${q?.modifier ?? ''}')
            returning *`
      )
    } else {
      console.log(`skipping ${ingredient}: ${drink.ingredients[ingredient]}`)
    }
  }
  // process.exit(1)
}

const getDrinks = (sheet: WorkSheet) => {
  const getVal = (r: number, c: number) => sheet[utils.encode_cell({ c, r })]?.v

  const range = utils.decode_range(sheet['!ref']!)
  const drinks: Array<Drink> = []

  for (let c = 2; c <= range.e.c; c++) {
    const drink: any = { name: '', source: '', ingredients: {}, presentation: {}, ingredientText: '', tags: [] }
    for (let r = range.s.r; r <= range.e.r; r++) {
      const val = getVal(r, c)
      if (val) {
        const key = getVal(r, 0)
        const tags = getVal(r, 1)
        if (isIngredient(r)) {
          drink.ingredients[key] = { name: key, quantity: val, tags }
          tags && drink.tags.push(tags)
        } else if (isPresentation(r)) {
          drink.presentation[key] = val
        } else {
          if (key === 'Drink') {
            drink.name = val
          } else if (key === 'Origin') {
            drink.source = val
          } else {
            drink[getVal(r, 0)] = val
          }
        }
      }
    }
    if (drink.name) {
      drink.ingredientText = Object.keys(drink.ingredients).join(' ') + ' ' + drink.tags.join(' ')
      drinks.push(drink)
    }
  }
  return drinks
}

export default class Import extends Command {
  async run() {
    const workbook = readFile('/Users/ggp/Dropbox/Drinks Shared Folder/Drinks Excel Data.xlsx')
    const drinks = getDrinks(workbook.Sheets['Ingredients'])

    const pool = getPool(PoolType.ADMIN, `${__dirname}/../../shared/`)
    const client: PoolClient = await pool.connect()

    for (const drink of drinks) {
      await create(client, drink)
    }

    client.release()
    console.log('Done')
    process.exit(0)
  }
}
