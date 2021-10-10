import {FC} from "react";
import {Grid} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {PercentageSlider} from "./PercentageSlider";
import {Budget, BudgetBowls, centsToBRL, getBudgetBowlAmount} from "../domain/Budget";

interface bowlSetterProps {
    title: string
    budget: Budget
    bowlName: BudgetBowls
    valueChangeHandler: (v: number) => void
}

export const BowlSetter: FC<bowlSetterProps> = ({title, bowlName, budget, valueChangeHandler}) => {
    return <>
        <Grid container spacing={2} alignItems="flex-end" justify="space-around">
            <Grid item xs={8}>
                <PercentageSlider title={title} value={budget[bowlName]}
                                  valueChangeHandler={valueChangeHandler}/>
            </Grid>
            <Grid item xs={4}>
                <Typography variant={'body1'}>{centsToBRL(getBudgetBowlAmount(budget, bowlName))}</Typography>
            </Grid>
        </Grid>
    </>

}