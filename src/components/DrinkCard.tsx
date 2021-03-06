import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Fraction from 'fraction.js'
import React from 'react'

import { GetAllDrinksQuery } from '../client'
import { GqlType, notEmpty } from '../utils'
import { makeStyles } from '../utils/makeStyles'

export type Drink = GqlType<GetAllDrinksQuery, ['recipes', 'nodes', number]>

const useStyles = makeStyles()({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  zoomedIngredients: { fontSize: '1.2rem' },
  zoomedInstructions: { fontSize: '1rem' },
})

export const DrinkCard: React.FC<{ drink?: Drink; zoomed?: boolean }> = ({ drink, zoomed = false }) => {
  const { classes, cx } = useStyles()
  if (!drink) {
    return (
      <Card className={classes.root} elevation={3}>
        <CardContent>
          <Typography variant='h5' component='h2' gutterBottom>
            Not Found
          </Typography>
        </CardContent>
      </Card>
    )
  }
  return (
    <Card className={classes.root} elevation={3}>
      <CardContent>
        <Typography variant='h5' component='h2' gutterBottom>
          {drink.name}
        </Typography>
        <ul>
          {drink?.recipeIngredients?.nodes?.filter(notEmpty)?.map((ingredient, i) => (
            <Typography key={i} component='li' className={cx({ [classes.zoomedIngredients]: zoomed })}>
              {ingredient.ingredient?.name} {new Fraction(ingredient.amount).toFraction(true)} {ingredient.unit?.name}
            </Typography>
          ))}
        </ul>
        <Typography className={classes.pos} color='textSecondary'>
          Glass: {drink.glass}
        </Typography>
        {drink.garnish ? (
          <Typography className={classes.pos} color='textSecondary'>
            Garnish: {drink.garnish}
          </Typography>
        ) : null}
        <Typography className={cx(classes.pos, { [classes.zoomedInstructions]: zoomed })} variant='body2' component='p'>
          {drink.instructions}
        </Typography>
        <Typography className={classes.pos} color='textSecondary'>
          Source: {drink.source}
        </Typography>
      </CardContent>
    </Card>
  )
}
