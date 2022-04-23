import {Grid, Slider} from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import React, {ChangeEvent, FC, useEffect, useState} from 'react'
import {RawNumberFormatCustom} from './RawNumberFormatCustom'

interface PercentageSliderProps {
  title: string
  value: number
  valueChangeHandler: (v: number) => void
}

export const PercentageSlider: FC<PercentageSliderProps> =
  ({title, value, valueChangeHandler}: PercentageSliderProps) => {

    const [inputValue, setInputValue] = useState(value)
    useEffect(() => {
      valueChangeHandler(inputValue)
    }, [inputValue, valueChangeHandler])

    function slideChangeHandler(event: ChangeEvent<unknown>, newValue: number | number[]) {
      if (!Array.isArray(newValue)) {
        setInputValue(newValue)
      }
    }

    return (
      // <div className={classes.root}>
      <div>
        <Typography variant='subtitle2' align='left' display='block'>{title}</Typography>
        <Grid container spacing={2} alignItems="flex-end" justify="space-around">
          <Grid>
            <RawNumberFormatCustom
              setValue={setInputValue}
              value={inputValue}
            />
          </Grid>
          <Grid item xs={8}>
            <Slider value={value} aria-labelledby="input-slider" onChange={slideChangeHandler}/>
          </Grid>
        </Grid>
      </div>
    )
  }