/* eslint-disable no-await-in-loop */
import { Command } from '@oclif/core'
import Fraction from 'fraction.js'
import { PoolClient } from 'pg'
import { readFile, utils, WorkSheet } from 'xlsx'

import { getPool, PoolType } from '@/shared/config'

interface IngredientInfo {
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

interface Quantity {
  amount?: number
  unit?: string
  modifier?: string
}

const query = async (client: PoolClient, q: string) =>
  // console.log(`query = ${JSON.stringify(query?.replace(/\s+/g, ' '), null, 2)}`)
  client.query(q)

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
  const quantities: Record<string, string> = {
    oz: 'oz',
    tbsp: 'tbs',
    tbs: 'tbs',
    tsp: 'tsp',
    bsp: 'tsp',
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
    cup: 'cup',
    twist: 'twist',
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

  const re = `(\\d+\\s+\\d+/\\d+|\\d+/\\d+|\\d+)?\\s*(${Object.keys(quantities).join('|')})\\s*(.*)`
  const amount = new RegExp(re).exec(s)
  if (!amount) {
    throw new Error(`failed to parse ${s}`)
  }
  return {
    amount: new Fraction(amount[1]).valueOf(),
    unit: quantities[amount[2]],
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
  const recipeId = insert?.rows?.[0]?.id

  // console.log(drink)
  //  const result = await query( client,query)
  // eslint-disable-next-line guard-for-in
  for (const ingredient in drink.ingredients) {
    const ingredientInfo = drink.ingredients[ingredient]
    const ingredientId = await getIngredient(client, ingredientInfo)
    const quantity = parseQuantity(ingredientInfo.quantity)
    const unitId = quantity?.unit ? await getUnit(client, quantity.unit) : undefined

    if (quantity) {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const _insertIngredient = await query(
        client,
        `
            insert into recipe_ingredient (recipe_id, ingredient_id, unit_id, amount, modifier)
            values (${recipeId}, ${ingredientId}, ${unitId || null}, ${quantity?.amount ?? null}, '${
              quantity?.modifier ?? ''
            }')
            returning *`
      )
    } else {
      console.log(`skipping ${ingredient}: ${JSON.stringify(drink.ingredients[ingredient], null, 2)}`)
    }
  }
  // process.exit(1)
}

const getDrinks = (sheet: WorkSheet) => {
  const range = utils.decode_range(sheet['!ref']!)

  const getVal = (r: number, c: number) => sheet[utils.encode_cell({ c, r })]?.v
  const findGarnish = () => {
    for (let { r } = range.s; r <= range.e.r; r++) {
      if (getVal(r, 0) === 'Garnish') {
        return r
      }
    }
    return -1
  }
  const drinks: Array<Drink> = []

  const ingredients = { s: 2, e: findGarnish() - 1 }
  const presentation = { s: ingredients.e + 1, e: 200 }

  const isIngredient = (r: number) => r >= ingredients.s && r <= ingredients.e
  const isPresentation = (r: number) => r >= presentation.s && r <= presentation.e

  for (let c = 2; c <= range.e.c; c++) {
    const drink: any = { name: '', source: '', ingredients: {}, presentation: {}, ingredientText: '', tags: [] }
    for (let { r } = range.s; r <= range.e.r; r++) {
      const val = getVal(r, c)
      if (val) {
        const key = getVal(r, 0)
        const tags = getVal(r, 1)
        if (isIngredient(r)) {
          drink.ingredients[key] = { name: key, quantity: val, tags }
          tags && drink.tags.push(tags)
        } else if (isPresentation(r)) {
          drink.presentation[key] = val
        } else if (key === 'Drink') {
          drink.name = val
        } else if (key === 'Origin') {
          drink.source = val
        } else {
          drink[getVal(r, 0)] = val
        }
      }
    }
    if (drink.name) {
      drink.ingredientText = `${Object.keys(drink.ingredients).join(' ')} ${drink.tags.join(' ')}`
      drinks.push(drink)
    }
  }
  return drinks
}

export default class Import extends Command {
  static description = 'Import data from shared Excel spreadsheet.'

  // eslint-disable-next-line class-methods-use-this
  async run() {
    const workbook = readFile('/Users/ggp/Dropbox (Maestral)/Drinks Shared Folder/Drinks Excel Data.xlsx')
    const drinks = getDrinks(workbook.Sheets.Ingredients)

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
