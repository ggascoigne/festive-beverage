import { RouterOutputs } from './api'

export type DrinkQueryResult = RouterOutputs['drinks']['getAllDrinks']
export type Drink = DrinkQueryResult[number]

export type ConfigQueryResult = RouterOutputs['config']['getConfig']
export type Config = ConfigQueryResult
