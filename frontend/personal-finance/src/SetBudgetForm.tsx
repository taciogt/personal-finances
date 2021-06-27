import {FC, FormEvent} from "react";
import {FormControl, FormHelperText, Input, InputLabel} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import axios from "axios";

const apiClient = axios.create({
  baseURL: 'http://localhost:8000/',
  headers: {'Content-Type' : 'application/json'}
});

export const SetBudgetForm: FC = () => {
  function submitHandler(event: FormEvent) {
    event.preventDefault()
    console.log(event)

    const data = {
      budget: {
        amount: 1000,
        essentials: 0.55,
        "education": 0.05,
        "goals": 0.2,
        "retirement": 0.1,
        "loose": 0.1
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
          <Input id="total-amount-input" aria-describedby="total-amount-helper-text"/>
          <FormHelperText id="total-amount-helper-text">Valor base para o orçamento</FormHelperText>
        </FormControl>
        <Button variant="contained" color="primary" type="submit">
          Primary
        </Button>
      </form>
    </div>
  )
}