import {ChangeEvent, FC, FormEvent, useState} from "react";
import {FormControl, FormHelperText, Input, InputAdornment, InputLabel, TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import axios from "axios";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

const apiClient = axios.create({
  baseURL: 'http://localhost:8000/',
  headers: {'Content-Type': 'application/json'}
});

class Budget {
  constructor(
    public readonly amount?: number,
    public readonly essentials?: number,
    public readonly education?: number
  ) {
  }
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiFormControl-root': {
        margin: theme.spacing(1)
      }
    }
  })
)

export const SetBudgetForm: FC = () => {
  const classes = useStyles()

  const [budget, setBudget] = useState(new Budget())

  function changeBudgetAmountHandler(event: ChangeEvent<HTMLInputElement>) {
    setBudget(prevBudget => {
      const newAmount = parseInt(event.target.value)
      return {
        ...prevBudget,
        amount: newAmount
      }
    })
  }

  function changeBudgetEssentialsHandler(event: ChangeEvent<HTMLInputElement>) {
    setBudget(prevBudget => {
      const newEssentials = parseInt(event.target.value)
      return {
        ...prevBudget,
        essentials: newEssentials
      }
    })
  }

  function changeBudgetEducationHandler(event: ChangeEvent<HTMLInputElement>) {
    setBudget(prevBudget => {
      const newEducation = parseInt(event.target.value)
      return {
        ...prevBudget,
        education: newEducation
      }
    })
  }

  function submitHandler(event: FormEvent) {
    event.preventDefault()

    const data = {
      budget: {
        essentials: 0.55,
        "education": 0.05,
        "goals": 0.2,
        "retirement": 0.1,
        "loose": 0.1,
        ...budget
      }
    }

    apiClient.put('/budgets', data).then((response) => {
      console.log('api client')
      console.log(response.status)
      console.log(response.data)
    })
  }

  return (
    <div>
      <p>Set budget form component</p>
      <form className={classes.root} onSubmit={submitHandler}>
        <FormControl>
          <InputLabel htmlFor="total-amount-input">Valor total</InputLabel>
          <Input id="total-amount-input" aria-describedby="total-amount-helper-text" type="number"
                 value={budget.amount} onChange={changeBudgetAmountHandler}
                 startAdornment={<InputAdornment position="start">R$</InputAdornment>}/>
          <FormHelperText id="total-amount-helper-text">Valor base para o orçamento</FormHelperText>
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="essentials-input">Gastos Essenciais</InputLabel>
          <Input id="essentials-input" aria-describedby="essentials-helper-text" type="number"
                 value={budget.essentials} onChange={changeBudgetEssentialsHandler}
                 endAdornment={<InputAdornment position="end">%</InputAdornment>}/>
          <FormHelperText id="essentials-helper-text">Percentual previsto para gastos essenciais</FormHelperText>
        </FormControl>
        <TextField label="Gastos com Educação" defaultValue={budget.education} margin="normal"
                   helperText="Percentual previsto para gastos com educação"
                   InputProps={
                     {endAdornment: <InputAdornment position="end">%</InputAdornment>}}/>
        <div>
          <Button variant="contained" color="primary" type="submit">
            Primary
          </Button>
        </div>
      </form>
    </div>
  )
}