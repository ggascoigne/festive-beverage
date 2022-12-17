import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Fraction from 'fraction.js'
import React from 'react'

import { Grid, IconButton } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import configureMeasurements from 'convert-units'
import volume, { VolumeUnits } from './convert-units/volume'
import { GetAllDrinksQuery } from '@/client'
import { GqlType, notEmpty } from '@/utils'

/*
  `configureMeasurements` is a closure that accepts a directory
  of measures and returns a factory function (`convert`) that uses
  only those measures.
*/
const convert = configureMeasurements({ volume })
export type Drink = GqlType<GetAllDrinksQuery, ['recipes', 'nodes', number]>

const getAmount = (amount: number, unit: string) => {
  if (['tbsp', 'tsp'].includes(unit)) {
    const full = convert(amount)
      .from(unit as VolumeUnits)
      .toBest({ system: 'imperial', exclude: ['in3'] })
    if (full && full?.val === Math.trunc(full.val)) {
      return `${full.val} ${full.unit}`
    }
  }
  return `${new Fraction(amount).toFraction(true)} ${unit}`
}

export const DrinkCard: React.FC<{ drink?: Drink; zoomed?: boolean }> = ({ drink, zoomed = false }) => {
  const [quantity, setQuantity] = React.useState(1)

  if (!drink) {
    return (
      <Card sx={{ minWidth: 275 }} elevation={3}>
        <CardContent>
          <Typography variant='h5' component='h2' gutterBottom>
            Not Found
          </Typography>
        </CardContent>
      </Card>
    )
  }
  return (
    <Card sx={{ minWidth: 275 }} elevation={3}>
      <CardContent>
        {zoomed ? (
          <Grid container alignItems='center' justifyContent='space-between'>
            <Grid item>
              <Typography variant='h5' component='h2' gutterBottom sx={{ mb: 0 }}>
                {drink.name}
              </Typography>
            </Grid>
            <Grid item>
              <Grid container alignItems='center'>
                <Typography variant='h6' component='h2' gutterBottom sx={{ mb: 0, pr: 1 }}>
                  {quantity}
                </Typography>
                <IconButton aria-label='plus' onClick={() => setQuantity((old) => Math.min(old + 1, 10))}>
                  <AddIcon fontSize='inherit' />
                </IconButton>
                <IconButton aria-label='minus' onClick={() => setQuantity((old) => Math.max(old - 1, 1))}>
                  <RemoveIcon fontSize='inherit' />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        ) : (
          <Typography variant='h5' component='h2' gutterBottom>
            {drink.name}
          </Typography>
        )}
        <ul>
          {drink?.recipeIngredients?.nodes?.filter(notEmpty)?.map((ingredient, i) => {
            const amount = getAmount(ingredient.amount * quantity, ingredient.unit?.name ?? '')
            return (
              <Typography key={i} component='li' sx={[zoomed && { fontSize: '1.2rem' }]}>
                {`${ingredient.ingredient?.name} ${amount}`}
              </Typography>
            )
          })}
        </ul>
        {drink.glass && (
          <Typography sx={{ marginBottom: 1.5 }} color='textSecondary'>
            Glass: {drink.glass}
          </Typography>
        )}
        {drink.garnish ? (
          <Typography sx={{ marginBottom: 1.5 }} color='textSecondary'>
            Garnish: {drink.garnish}
          </Typography>
        ) : null}
        {drink.instructions && (
          <Typography sx={[{ marginBottom: 1.5 }, zoomed && { fontSize: '1rem' }]} variant='body2' component='p'>
            {drink.instructions}
          </Typography>
        )}
        {drink.source && (
          <Typography sx={{ marginBottom: 1.5 }} color='textSecondary'>
            Source: {drink.source}
          </Typography>
        )}
      </CardContent>
    </Card>
  )
}
