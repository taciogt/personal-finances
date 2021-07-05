import {ChangeEvent, FC, FormEvent, useState} from "react";
import {Card, FormControl, FormHelperText, Input, InputAdornment, InputLabel} from "@material-ui/core";
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
    public readonly education?: number,
    public readonly goals?: number,
    public readonly retirement?: number,
    public readonly loose?: number,
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

  const [budget, setBudget] = useState(new Budget(1000, 55, 5, 20, 10, 10))

  function changeBudgetAmountHandler(event: ChangeEvent<HTMLInputElement>) {
    setBudget(prevBudget => {
      const newAmount = parseFloat(event.target.value)
      return {
        ...prevBudget,
        amount: newAmount
      }
    })
  }


  function getChangeBudgetBowlHandler(bowlName: keyof Omit<Budget, 'amount'>) {
    return (event: ChangeEvent<HTMLInputElement>) => {
      setBudget(prevBudget => {
        const newBowlValue = parseInt(event.target.value)
        const newBudget = {
          ...prevBudget,
        }
        newBudget[bowlName] = newBowlValue
        return newBudget
      })
    }

  }

  function submitHandler(event: FormEvent) {
    event.preventDefault()

    const data = {
      budget: {
        ...budget
      }
    }

    console.log("request body", data)
    apiClient.put('/budgets', data).then((response) => {
      console.log('api client')
      console.log(response.status)
      console.log(response.data)
    })
  }

  return (
    <Card>
      <div>
        <p>Set budget form component</p>
        <form className={classes.root} onSubmit={submitHandler}>
          <FormControl>
            <InputLabel htmlFor="total-amount-input">Valor total</InputLabel>
            <Input id="total-amount-input" aria-describedby="total-amount-helper-text" type="number"
                   inputProps={{step: ".01"}}
                   value={budget.amount} onChange={changeBudgetAmountHandler}
                   startAdornment={<InputAdornment position="start">R$</InputAdornment>}/>
            <FormHelperText id="total-amount-helper-text">Valor base para o orçamento</FormHelperText>
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="essentials-input">Gastos Essenciais</InputLabel>
            <Input id="essentials-input" aria-describedby="essentials-helper-text" type="number"
                   inputProps={{step: "1"}}
                   value={budget.essentials} onChange={getChangeBudgetBowlHandler('essentials')}
                   endAdornment={<InputAdornment position="end">%</InputAdornment>}/>
            <FormHelperText id="essentials-helper-text">Percentual previsto para gastos essenciais</FormHelperText>
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="education-input">Gastos com Educação</InputLabel>
            <Input id="essentials-input" aria-describedby="essentials-helper-text" type="number"
                   inputProps={{step: "1"}}
                   value={budget.education} onChange={getChangeBudgetBowlHandler('education')}
                   endAdornment={<InputAdornment position="end">%</InputAdornment>}/>
            <FormHelperText id="essentials-helper-text">Percentual previsto para gastos com educação</FormHelperText>
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="goals-input">Investimentos para Metas</InputLabel>
            <Input id="goals-input" aria-describedby="goals-helper-text" type="number"
                   inputProps={{step: "1"}}
                   value={budget.goals} onChange={getChangeBudgetBowlHandler('goals')}
                   endAdornment={<InputAdornment position="end">%</InputAdornment>}/>
            <FormHelperText id="essentials-helper-text">Percentual previsto de investimento para metas</FormHelperText>
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="retirement-input">Investimentos para Aposentadoria</InputLabel>
            <Input id="retirement-input" aria-describedby="retirement-helper-text" type="number"
                   inputProps={{step: "1"}}
                   value={budget.retirement} onChange={getChangeBudgetBowlHandler('retirement')}
                   endAdornment={<InputAdornment position="end">%</InputAdornment>}/>
            <FormHelperText id="essentials-helper-text">Percentual previsto de investimentos para
              aposentadoria</FormHelperText>
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="loose-input">Gastos Livres</InputLabel>
            <Input id="loose-input" aria-describedby="loose-helper-text" type="number"
                   inputProps={{step: "1"}}
                   value={budget.loose} onChange={getChangeBudgetBowlHandler('loose')}
                   endAdornment={<InputAdornment position="end">%</InputAdornment>}/>
            <FormHelperText id="essentials-helper-text">Percentual previsto para gastos livres</FormHelperText>
          </FormControl>
          <div>
            <Button variant="contained" color="primary" type="submit">
              Primary
            </Button>
          </div>
        </form>
      </div>
    </Card>
  )
}