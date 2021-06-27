import {ChangeEvent, FC, FormEvent, useState} from "react";
import {FormControl, FormHelperText, Input, InputLabel} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import axios from "axios";

const apiClient = axios.create({
  baseURL: 'http://localhost:8000/',
  headers: {'Content-Type' : 'application/json'}
});

class Budget {
  constructor(public readonly amount?: number) {}
}

export const SetBudgetForm: FC = () => {
  const [budget, setBudget] = useState(new Budget())

  function changeBudgetAmountHandler(event: ChangeEvent<HTMLInputElement>){
    setBudget(prevBudget => {
      const newAmount = parseInt(event.target.value)
      return {
        ...prevBudget,
        amount: newAmount
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
      <form onSubmit={submitHandler}>
        <FormControl>
          <InputLabel htmlFor="total-amount-input">Valor total</InputLabel>
          <Input id="total-amount-input" aria-describedby="total-amount-helper-text"
          value={budget.amount} onChange={changeBudgetAmountHandler} />
          <FormHelperText id="total-amount-helper-text">Valor base para o orçamento</FormHelperText>
        </FormControl>
        <Button variant="contained" color="primary" type="submit">
          Primary
        </Button>
      </form>
    </div>
  )
}