import {
  Box,
  Card,
  CircularProgress,
  Divider,
  FormControl,
  FormHelperText,
  Input,
  InputAdornment,
  InputLabel,
  LinearProgress
} from '@material-ui/core'
import Button from '@material-ui/core/Button'
import {green, red} from '@material-ui/core/colors'
import {createStyles, makeStyles, styled, Theme} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import {DoneOutline, Error} from '@material-ui/icons'
import React, {ChangeEvent, FC, FormEvent, useCallback, useEffect, useState} from 'react'
import {getBudget, saveBudget} from '../api'
import {BowlSetter} from '../components/BowlSetter'
import {Budget} from '../domain/Budget'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiFormControl-root': {
        margin: theme.spacing(1)
      }
    },
    percentageSlider: {
      marginLeft: theme.spacing(20)
    },
    wrapper: {
      margin: theme.spacing(1),
      position: 'relative'
    },
    buttonFeedbackIcon: {
      color: green[500],
      // color: '#FFD49F',
      // color: '#0074FF',
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginTop: -12,
      marginLeft: -12,
    },
    errorIcon: {
      color: red[500]
    },
  })
)

const defaultText = {}
const hideText = {
  'color': 'transparent'
}

const StyledCard = styled(Card)({
  padding: 10,
  // maxWidth: '50%',
  margin: 'auto'
})

const StyledLinearProgress = styled(LinearProgress)({
  marginTop: -10,
  marginLeft: -10,
  marginRight:-10,
})

const StyledDivider = styled(Divider)({
  marginTop: '1em',
  marginBottom: '1em'
})

const StyledBox = styled(Box)({
  marginLeft: '3em',
  marginRight: '3em',
  marginBottom: '1em'
})

export const SetBudgetForm: FC = () => {
  const classes = useStyles()

  const [budget, setBudget] = useState(new Budget(1000, 55, 5, 20, 10, 10))
  const [loading, setLoading] = useState(false)
  const [isGettingBudget, setIsGettingBudget] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    setIsGettingBudget(true)
    getBudget().then(
      (budget) => {
        setBudget(budget)
        setIsGettingBudget(false)
      }
    )
  }, [])

  function changeBudgetAmountHandler(event: ChangeEvent<HTMLInputElement>) {
    setBudget(prevBudget => {
      const newAmount = parseFloat(event.target.value)
      return {
        ...prevBudget,
        amount: newAmount
      }
    })
  }

  function useChangeBudgetBowlHandler(bowlName: keyof Omit<Budget, 'amount'>) {
    return useCallback((newValue: number) => {
      setBudget(prevBudget => {
        return {
          ...prevBudget,
          [bowlName]: newValue
        }
      })
    }, [bowlName])
  }

  function submitHandler(event: FormEvent) {
    event.preventDefault()
    setLoading(true)

    function setFlagAndRemove(setFlag: (b: boolean) => void) {
      setFlag(true)
      setTimeout(() => {
        setFlag(false)
      }, 3000)
    }

    saveBudget(budget).then(() => {
      setFlagAndRemove(setSuccess)
    }, () => {
      setFlagAndRemove(setError)
    }).finally(() => {
      setLoading(false)
    })
  }

  const saveButtonTextVars = success || error ? hideText : defaultText

  return (
    <StyledCard>
      {isGettingBudget &&
      <StyledLinearProgress>
        <LinearProgress color="secondary"/>
      </StyledLinearProgress>}
      <div>
        <Typography style={{marginTop: '10px'}} variant='h5'>Orçamento mensal</Typography>
        <StyledDivider/>
        <form className={classes.root} onSubmit={submitHandler}>
          <FormControl>
            <InputLabel htmlFor="total-amount-input">Valor total</InputLabel>
            <Input
              id="total-amount-input" aria-describedby="total-amount-helper-text" type="number"
              inputProps={{step: '.01'}}
              value={budget.amount} onChange={changeBudgetAmountHandler}
              startAdornment={<InputAdornment position="start">R$</InputAdornment>}
              disabled={isGettingBudget}
            />
            <FormHelperText id="total-amount-helper-text">Valor base para o orçamento</FormHelperText>
          </FormControl>
          <StyledDivider/>
          <StyledBox>
            <BowlSetter
              title={'Essenciais'} budget={budget} bowlName={'essentials'}
              valueChangeHandler={useChangeBudgetBowlHandler('essentials')}/>
          </StyledBox>
          <StyledBox>
            <BowlSetter
              title={'Educação'} budget={budget} bowlName={'education'}
              valueChangeHandler={useChangeBudgetBowlHandler('education')}/>
          </StyledBox>
          <StyledBox>
            <BowlSetter
              title={'Metas'} budget={budget} bowlName={'goals'}
              valueChangeHandler={useChangeBudgetBowlHandler('goals')}/>
          </StyledBox>
          <StyledBox>
            <BowlSetter
              title={'Aposentadoria'} budget={budget} bowlName={'retirement'}
              valueChangeHandler={useChangeBudgetBowlHandler('retirement')}/>
          </StyledBox>
          <StyledBox>
            <BowlSetter
              title={'Livre'} budget={budget} bowlName={'loose'}
              valueChangeHandler={useChangeBudgetBowlHandler('loose')}/>
          </StyledBox>
          <StyledDivider/>
          <div className={classes.wrapper}>
            <Button variant="contained" color="primary" type="submit" disabled={loading || success || error}>
              <div style={saveButtonTextVars}>Salvar</div>
            </Button>
            {success && <DoneOutline className={classes.buttonFeedbackIcon}/>}
            {error && <Error className={`${classes.buttonFeedbackIcon} ${classes.errorIcon}`}/>}
            {loading && <CircularProgress size={24} className={classes.buttonFeedbackIcon}/>}
          </div>
        </form>
      </div>
    </StyledCard>
  )
}