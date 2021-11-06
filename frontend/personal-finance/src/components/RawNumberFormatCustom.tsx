import { PropTypes, TextField } from '@material-ui/core'
import { styled } from '@material-ui/core/styles'
import React, { ChangeEventHandler, FC, FocusEventHandler, KeyboardEventHandler } from 'react'
import NumberFormat from 'react-number-format'

const StyledNumberFormat = styled(NumberFormat)({
  width: '3em'
})

interface RawNumberFormatCustomProps {
  value: number
  setValue: (v: number) => void
}

export const RawNumberFormatCustom: FC<RawNumberFormatCustomProps> = ({value, setValue}) => {
  const suffix = ' %'

  const onChangeHandler: ChangeEventHandler<HTMLInputElement> = (event) => {
    const newValue = +event.target.value.replace(suffix, '')
    setValue(newValue)
  }

  const onBlurHandler: FocusEventHandler<HTMLInputElement> = (event) => {
    const newValue = +event.target.value.replace(suffix, '')
    if (newValue < 10) {
      setValue(0)
    } else if (newValue > 90) {
      setValue(100)
    }

  }

  const keyPressHandler: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === 'ArrowUp') {
      setValue(value + 1)
    }
    if (event.key === 'ArrowDown') {
      setValue(value - 1)
    }
  }

  return (
    <StyledNumberFormat
      onChange={onChangeHandler}
      value={value}
      onKeyDown={keyPressHandler}
      onBlur={onBlurHandler}
      customInput={TextField}
      suffix={suffix}
    />
  )
}