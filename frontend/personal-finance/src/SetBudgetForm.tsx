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
                    {/*<StyledBox>*/}
                    {/*  <Grid container spacing={2} alignItems="flex-end" justify="space-around">*/}
                    {/*    <Grid item xs={8}>*/}
                    {/*      <PercentageSlider title="Essenciais" value={budget.essentials}*/}
                    {/*                        valueChangeHandler={useChangeBudgetBowlHandler('essentials')}/>*/}
                    {/*    </Grid>*/}
                    {/*    <Grid item xs={4}>*/}
                    {/*      <Typography variant={'body1'}>{centsToBRL(getBudgetBowlAmount(budget, 'essentials'))}</Typography>*/}
                    {/*    </Grid>*/}
                    {/*  </Grid>*/}
                    {/*</StyledBox>*/}
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
                    <FormControl>
                        <InputLabel htmlFor="essentials-input">Gastos Essenciais</InputLabel>
                        <Input id="essentials-input" aria-describedby="essentials-helper-text" type="number"
                               inputProps={{step: "1"}}
                               value={budget.essentials} onChange={getChangeBudgetBowlHandler('essentials')}
                               endAdornment={<InputAdornment position="end">%</InputAdornment>}/>
                        <FormHelperText id="essentials-helper-text">Percentual previsto para gastos
                            essenciais</FormHelperText>
                    </FormControl>
                    <FormControl>
                        <InputLabel htmlFor="education-input">Gastos com Educação</InputLabel>
                        <Input id="essentials-input" aria-describedby="essentials-helper-text" type="number"
                               inputProps={{step: "1"}}
                               value={budget.education} onChange={getChangeBudgetBowlHandler('education')}
                               endAdornment={<InputAdornment position="end">%</InputAdornment>}/>
                        <FormHelperText id="essentials-helper-text">Percentual previsto para gastos com
                            educação</FormHelperText>
                    </FormControl>
                    <FormControl>
                        <InputLabel htmlFor="goals-input">Investimentos para Metas</InputLabel>
                        <Input id="goals-input" aria-describedby="goals-helper-text" type="number"
                               inputProps={{step: "1"}}
                               value={budget.goals} onChange={getChangeBudgetBowlHandler('goals')}
                               endAdornment={<InputAdornment position="end">%</InputAdornment>}/>
                        <FormHelperText id="essentials-helper-text">Percentual previsto de investimento para
                            metas</FormHelperText>
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
                        <FormHelperText id="essentials-helper-text">Percentual previsto para gastos
                            livres</FormHelperText>
                    </FormControl>

                    <div>
                        <Button variant="contained" color="primary" type="submit">
                            Primary
                        </Button>
                    </div>
                </form>
            </div>
        </StyledCard>
    )
}