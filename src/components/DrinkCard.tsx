import { makeStyles } from '@material-ui/core'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Fraction from 'fraction.js'
import React from 'react'
import { Link } from 'react-router-dom'

import { GetAllDrinksQuery } from '../client'
import { GqlType, notEmpty } from '../utils'

export type Drink = GqlType<GetAllDrinksQuery, ['recipes', 'nodes', number]>

const useStyles = makeStyles({
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
})

export const DrinkCard: React.FC<{ drink: Drink }> = ({ drink }) => {
  const classes = useStyles()
  return (
    <Link to={(location: any) => `${location.pathname}?drink=${drink.id}`}>
      <Card className={classes.root} elevation={3}>
        <CardContent>
          <Typography variant='h5' component='h2' gutterBottom>
            {drink.name}
          </Typography>
          <ul>
            {drink?.recipeIngredients?.nodes?.filter(notEmpty)?.map((ingredient, i) => (
              <Typography key={i} component='li'>
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
          <Typography variant='body2' component='p'>
            {drink.instructions}
          </Typography>
          <Typography className={classes.pos} color='textSecondary'>
            Source: {drink.source}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  )
}
