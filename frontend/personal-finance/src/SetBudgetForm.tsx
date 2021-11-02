import {ChangeEvent, FC, FormEvent, useCallback, useEffect, useState} from "react";
import {
    Box,
    Card,
    Divider,
    FormControl,
    FormHelperText,
    Input,
    InputAdornment,
    InputLabel
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import axios from "axios";
import {createStyles, makeStyles, styled, Theme} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import {Budget, BudgetBowls} from "./domain/Budget";
import {BowlSetter} from "./components/BowlSetter";

const apiClient = axios.create({
    baseURL: 'http://localhost:8000/',
    headers: {'Content-Type': 'application/json'}
});

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& .MuiFormControl-root': {
                margin: theme.spacing(1)
            }
        },
        percentageSlider: {
            marginLeft: theme.spacing(20)
        }
    })
)

const StyledCard = styled(Card)({
    padding: 10,
    maxWidth: '50%',
    margin: "auto"
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

    useEffect(() => {
        console.log('Budget:', budget)
    }, [budget])

    function changeBudgetAmountHandler(event: ChangeEvent<HTMLInputElement>) {
        setBudget(prevBudget => {
            const newAmount = parseFloat(event.target.value)
            return {
                ...prevBudget,
                amount: newAmount
            }
        })
    }

    function getChangeBudgetBowlHandler(bowlName: BudgetBowls) {
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
        <StyledCard>
            <div>
                <Typography style={{marginTop: '10px'}} variant='h5'>Orçamento mensal</Typography>
                <StyledDivider/>
                <form className={classes.root} onSubmit={submitHandler}>
                    <FormControl>
                        <InputLabel htmlFor="total-amount-input">Valor total</InputLabel>
                        <Input id="total-amount-input" aria-describedby="total-amount-helper-text" type="number"
                               inputProps={{step: ".01"}}
                               value={budget.amount} onChange={changeBudgetAmountHandler}
                               startAdornment={<InputAdornment position="start">R$</InputAdornment>}/>
                        <FormHelperText id="total-amount-helper-text">Valor base para o orçamento</FormHelperText>
                    </FormControl>
                    <StyledDivider/>
                    <StyledBox>
                        <BowlSetter title={'Essenciais'} budget={budget} bowlName={'essentials'}
                                    valueChangeHandler={useChangeBudgetBowlHandler('essentials')}/>
                    </StyledBox>
                    <StyledBox>
                        <BowlSetter title={'Educação'} budget={budget} bowlName={'education'}
                                    valueChangeHandler={useChangeBudgetBowlHandler('education')}/>
                    </StyledBox>
                    <StyledBox>
                        <BowlSetter title={'Metas'} budget={budget} bowlName={'goals'}
                                    valueChangeHandler={useChangeBudgetBowlHandler('goals')}/>
                    </StyledBox>
                    <StyledBox>
                        <BowlSetter title={'Aposentadoria'} budget={budget} bowlName={'retirement'}
                                    valueChangeHandler={useChangeBudgetBowlHandler('retirement')}/>
                    </StyledBox>
                    <StyledBox>
                        <BowlSetter title={'Livre'} budget={budget} bowlName={'loose'}
                                    valueChangeHandler={useChangeBudgetBowlHandler('loose')}/>
                    </StyledBox>

                    <StyledDivider/>

                    <div>
                        <Button variant="contained" color="primary" type="submit">
                            Salvar
                        </Button>
                    </div>
                </form>
            </div>
        </StyledCard>
    )
}