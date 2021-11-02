import {ChangeEvent, FC, useEffect, useState} from "react";
import {Grid, Slider} from "@material-ui/core";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import {RawNumberFormatCustom} from "./RawNumberFormatCustom";
import {PercentageSlider} from "./PercentageSlider";
import {Budget, BudgetBowls, centsToBRL} from "../domain/Budget";

interface bowlSetterProps {
  title: string
  budget: Budget
  value: number
  bowlName: BudgetBowls,
  valueChangeHandler: (v: number) => void

}


export const BowlSetter: FC<bowlSetterProps> = ({title, budget, value, valueChangeHandler}) => {
  // const [inputValue, setInputValue] = useState(value)
  //
  // useEffect(() => {
  //   valueChangeHandler(inputValue)
  // }, [inputValue, valueChangeHandler])

  // function slideChangeHandler(event: ChangeEvent<{}>, newValue: number | number[]) {
  //   if (!Array.isArray(newValue)) {
  //     setInputValue(newValue)
  //   }
  // }

  return <>
    <Grid container spacing={2} alignItems="flex-end" justify="space-around">
      <Grid item xs={8}>
        <PercentageSlider title="Essenciais" value={value}
                          valueChangeHandler={valueChangeHandler}/>
      </Grid>
      <Grid item xs={4}>
        <Typography variant={'body1'}>{centsToBRL(value * budget.amount)}</Typography>
      </Grid>
    </Grid>
  </>

}