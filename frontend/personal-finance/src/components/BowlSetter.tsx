import React, { FC } from 'react'
import { Budget, BudgetBowls, centsToBRL, getBudgetBowlAmount } from '../domain/Budget'
import { PercentageSlider } from './PercentageSlider'
import {Grid, Typography} from "@mui/material";

interface bowlSetterProps {
    title: string
    budget: Budget
    bowlName: BudgetBowls
    valueChangeHandler: (v: number) => void
}

export const BowlSetter: FC<bowlSetterProps> = ({title, bowlName, budget, valueChangeHandler}) => {
  return <>
    <Grid container spacing={2} alignItems="flex-end" justify="space-around">
      <Grid item xs={8}>
        <PercentageSlider title={title} value={budget[bowlName]}
          valueChangeHandler={valueChangeHandler}/>
      </Grid>
      <Grid item xs={4}>
        <Typography variant={'body1'}>{centsToBRL(getBudgetBowlAmount(budget, bowlName))}</Typography>
      </Grid>
    </Grid>
  </>

}