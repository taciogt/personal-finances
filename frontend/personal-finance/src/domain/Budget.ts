export class Budget {
  constructor(
    public readonly amount: number,
    public readonly essentials: number,
    public readonly education: number,
    public readonly goals: number,
    public readonly retirement: number,
    public readonly loose: number,
  ) {
  }
}

export type BudgetBowls = keyof Pick<Budget, 'essentials' | 'education' | 'goals' | 'retirement' | 'loose'>

export function centsToBRL(v: number): string {
  return `R$ ${(v / 100).toLocaleString('pt-Br', {minimumFractionDigits: 2})}`
}

export function getBudgetBowlAmount(budget: Budget, bowlName: BudgetBowls): number {
  return budget[bowlName] * budget.amount
}
