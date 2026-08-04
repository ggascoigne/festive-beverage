import type { RouterOutputs } from './api'

export type DrinkQueryResult = RouterOutputs['drinks']['getAllDrinks']
export type Drink = DrinkQueryResult[number]
export type IngredientQueryResult = RouterOutputs['drinks']['getAllIngredients']
export type Ingredient = IngredientQueryResult[number]
export type UnitQueryResult = RouterOutputs['drinks']['getAllUnits']
export type Unit = UnitQueryResult[number]

export type ConfigQueryResult = RouterOutputs['config']['getConfig']
export type Config = ConfigQueryResult
