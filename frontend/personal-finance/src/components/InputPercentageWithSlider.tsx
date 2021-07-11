import {ChangeEvent, ChangeEventHandler, FC, FocusEventHandler, KeyboardEventHandler, useState} from "react";
import {Grid, Slider, TextField} from "@material-ui/core";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import NumberFormat from 'react-number-format';

type InputPercentageWithSliderProps = {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiFormControl-root': {
        margin: theme.spacing(1)
      }
    },
    input: {
      width: '4em'
    },
  })
)



interface RawNumberFormatCustomProps {
  value: number
  setValue: (v: number) => void
}

const RawNumberFormatCustom: FC<RawNumberFormatCustomProps> = ({value, setValue}) => {
  const suffix = ' %'

  const onChangeHandler: ChangeEventHandler<HTMLInputElement> = (event) => {
    const newValue = +event.target.value.replace(suffix, '')
    setValue(newValue)
  }

  const onBlurHandler: FocusEventHandler<HTMLInputElement> = (event) => {
    const newValue = +event.target.value.replace(suffix, '')
    if (newValue < 10) {
      setValue(0);
    } else if (newValue > 90) {
      setValue(100);
    }

  }

  const keyPressHandler: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === "ArrowUp") {
      setValue(value + 1)
    }
    if (event.key === "ArrowDown") {
      setValue(value - 1)
    }
  }

  return (
    <NumberFormat
      onChange={onChangeHandler}
      value={value}
      onKeyDown={keyPressHandler}
      onBlur={onBlurHandler}
      customInput={TextField}
      suffix={suffix}
    />
  );
}


export const InputPercentageWithSlider: FC<InputPercentageWithSliderProps> = () => {
  const classes = useStyles()

  const [inputValue, setInputValue] = useState(0)

  function slideChangeHandler(event: ChangeEvent<{}>, newValue: number | number[]) {
    if (!Array.isArray(newValue)) {
      setInputValue(newValue)
    }
  }

  return (
    <div className={classes.root}>
      <Typography>Input with Slider</Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid>
          <RawNumberFormatCustom
            setValue={setInputValue}
            value={inputValue}/>
        </Grid>
        <Grid item xs>
          <Slider value={inputValue} aria-labelledby="input-slider" onChange={slideChangeHandler}/>
        </Grid>
      </Grid>
    </div>
  )
}